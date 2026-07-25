import { generatePersonId } from "./http.js";

const MAX_PEOPLE = 10;

export async function ensureSchema(env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS app_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS people (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      pin TEXT NOT NULL UNIQUE,
      is_admin INTEGER NOT NULL DEFAULT 0,
      share_slug TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await migrateStickersTable(env);
  await syncAdminPerson(env);
}

async function migrateStickersTable(env) {
  const columns = (await env.DB.prepare("PRAGMA table_info(stickers)").all()).results || [];
  const hasPersonId = columns.some(column => column.name === "person_id");

  if (columns.length === 0) {
    await env.DB.prepare(`
      CREATE TABLE stickers (
        person_id TEXT NOT NULL,
        team_id TEXT NOT NULL,
        number TEXT NOT NULL,
        status TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (person_id, team_id, number)
      )
    `).run();
  } else if (!hasPersonId) {
    await env.DB.batch([
      env.DB.prepare(`
        CREATE TABLE stickers_new (
          person_id TEXT NOT NULL,
          team_id TEXT NOT NULL,
          number TEXT NOT NULL,
          status TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (person_id, team_id, number)
        )
      `),
      env.DB.prepare(`
        INSERT INTO stickers_new (person_id, team_id, number, status, quantity, updated_at)
        SELECT 'admin', team_id, number, status, quantity, updated_at FROM stickers
      `),
      env.DB.prepare("DROP TABLE stickers"),
      env.DB.prepare("ALTER TABLE stickers_new RENAME TO stickers")
    ]);
  }

  await env.DB.prepare("CREATE INDEX IF NOT EXISTS stickers_status_idx ON stickers (status)").run();
  await env.DB.prepare("CREATE INDEX IF NOT EXISTS stickers_person_idx ON stickers (person_id)").run();
}

async function syncAdminPerson(env) {
  if (!env.ADMIN_PIN) {
    return;
  }

  const legacyShare = await env.DB.prepare("SELECT value FROM app_config WHERE key = 'share_slug'").first();

  await env.DB.prepare(`
    INSERT INTO people (id, name, pin, is_admin, share_slug)
    VALUES ('admin', 'Admin', ?, 1, ?)
    ON CONFLICT(id) DO UPDATE SET pin = excluded.pin
  `).bind(env.ADMIN_PIN, legacyShare?.value || null).run();
}

export async function resolvePerson(env, pin) {
  if (!pin) {
    return null;
  }
  const row = await env.DB.prepare(
    "SELECT id, name, is_admin, share_slug FROM people WHERE pin = ?"
  ).bind(pin).first();
  if (!row) {
    return null;
  }
  return {
    id: row.id,
    name: row.name,
    isAdmin: Boolean(row.is_admin),
    shareSlug: row.share_slug || ""
  };
}

export async function loadStickers(env, personId, publicOnly = false) {
  const statement = publicOnly
    ? env.DB.prepare(
        "SELECT team_id, number, status, quantity FROM stickers WHERE person_id = ? AND status IN ('wanted', 'duplicate') ORDER BY team_id, CAST(number AS INTEGER)"
      ).bind(personId)
    : env.DB.prepare(
        "SELECT team_id, number, status, quantity FROM stickers WHERE person_id = ? ORDER BY team_id, CAST(number AS INTEGER)"
      ).bind(personId);
  const result = await statement.all();
  return rowsToState(result.results || []);
}

export async function replaceStickers(env, personId, stickers) {
  const entries = flattenStickers(stickers);
  const deletes = env.DB.prepare("DELETE FROM stickers WHERE person_id = ?").bind(personId);
  const inserts = entries.map(entry =>
    env.DB.prepare(
      "INSERT INTO stickers (person_id, team_id, number, status, quantity, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)"
    ).bind(personId, entry.teamId, entry.number, entry.status, entry.quantity)
  );
  await env.DB.batch([deletes, ...inserts]);
}

export async function setPersonShareSlug(env, personId, shareSlug) {
  await env.DB.prepare("UPDATE people SET share_slug = ? WHERE id = ?").bind(shareSlug, personId).run();
}

export async function getPersonByShareSlug(env, shareSlug) {
  const row = await env.DB.prepare("SELECT id, name FROM people WHERE share_slug = ?").bind(shareSlug).first();
  if (!row) {
    return null;
  }
  return { id: row.id, name: row.name };
}

export async function listPeople(env) {
  const result = await env.DB.prepare(
    "SELECT id, name, pin, is_admin, created_at FROM people ORDER BY is_admin DESC, created_at ASC"
  ).all();
  return (result.results || []).map(row => ({
    id: row.id,
    name: row.name,
    pin: row.pin,
    isAdmin: Boolean(row.is_admin),
    createdAt: row.created_at
  }));
}

export async function createPerson(env, name, pin) {
  const countRow = await env.DB.prepare("SELECT COUNT(*) AS total FROM people").first();
  if ((countRow?.total || 0) >= MAX_PEOPLE) {
    throw new Error(`Maximal ${MAX_PEOPLE} Personen erlaubt.`);
  }

  const id = generatePersonId();
  await env.DB.prepare(
    "INSERT INTO people (id, name, pin, is_admin) VALUES (?, ?, ?, 0)"
  ).bind(id, name, pin).run();
  return { id, name, pin, isAdmin: false };
}

export async function updatePerson(env, personId, { name, pin } = {}) {
  const existing = await env.DB.prepare("SELECT id FROM people WHERE id = ?").bind(personId).first();
  if (!existing) {
    throw new Error("Person nicht gefunden.");
  }

  const fields = [];
  const values = [];
  if (name) {
    fields.push("name = ?");
    values.push(name);
  }
  if (pin) {
    fields.push("pin = ?");
    values.push(pin);
  }
  if (!fields.length) {
    throw new Error("Nichts zu aktualisieren.");
  }

  values.push(personId);
  await env.DB.prepare(`UPDATE people SET ${fields.join(", ")} WHERE id = ?`).bind(...values).run();

  const updated = await env.DB.prepare(
    "SELECT id, name, pin, is_admin FROM people WHERE id = ?"
  ).bind(personId).first();
  return { id: updated.id, name: updated.name, pin: updated.pin, isAdmin: Boolean(updated.is_admin) };
}

export async function deletePerson(env, personId) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM stickers WHERE person_id = ?").bind(personId),
    env.DB.prepare("DELETE FROM people WHERE id = ?").bind(personId)
  ]);
}

export async function computeMatches(env, personId) {
  const peopleRows = (await env.DB.prepare("SELECT id, name FROM people").all()).results || [];
  const nameById = new Map(peopleRows.map(person => [person.id, person.name]));
  const otherIds = peopleRows.map(person => person.id).filter(id => id !== personId);

  const allRows = (await env.DB.prepare(
    "SELECT person_id, team_id, number, status, quantity FROM stickers"
  ).all()).results || [];

  const possession = new Map();
  allRows.forEach(row => {
    if (!possession.has(row.person_id)) {
      possession.set(row.person_id, new Set());
    }
    possession.get(row.person_id).add(`${row.team_id}|${row.number}`);
  });

  const myPossession = possession.get(personId) || new Set();

  const canGet = [];
  const canGive = [];

  allRows.forEach(row => {
    if (row.status !== "duplicate") {
      return;
    }
    const key = `${row.team_id}|${row.number}`;

    if (row.person_id !== personId) {
      if (!myPossession.has(key)) {
        canGet.push({
          teamId: row.team_id,
          number: row.number,
          quantity: row.quantity,
          fromPersonId: row.person_id,
          fromName: nameById.get(row.person_id) || row.person_id
        });
      }
      return;
    }

    const wantedBy = otherIds
      .filter(id => !(possession.get(id) || new Set()).has(key))
      .map(id => ({ id, name: nameById.get(id) || id }));

    if (wantedBy.length) {
      canGive.push({
        teamId: row.team_id,
        number: row.number,
        quantity: row.quantity,
        wantedBy
      });
    }
  });

  const byTeamAndNumber = (a, b) => {
    if (a.teamId !== b.teamId) {
      return a.teamId.localeCompare(b.teamId);
    }
    return Number.parseInt(a.number, 10) - Number.parseInt(b.number, 10);
  };

  canGet.sort(byTeamAndNumber);
  canGive.sort(byTeamAndNumber);

  return { canGet, canGive };
}

export function rowsToState(rows) {
  const stickers = {};
  rows.forEach(row => {
    stickers[row.team_id] ||= {};
    stickers[row.team_id][row.number] = {
      teamId: row.team_id,
      number: row.number,
      status: row.status,
      quantity: row.quantity
    };
  });
  return stickers;
}

function flattenStickers(stickers) {
  return Object.entries(stickers || {}).flatMap(([teamId, values]) =>
    Object.values(values).map(entry => ({
      teamId,
      number: String(entry.number),
      status: entry.status,
      quantity: entry.status === "duplicate" ? Math.max(1, Number.parseInt(entry.quantity || "1", 10)) : 1
    }))
  );
}
