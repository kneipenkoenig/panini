export async function ensureSchema(env) {
  await env.DB.batch([
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS app_config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),
    env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS stickers (
        team_id TEXT NOT NULL,
        number TEXT NOT NULL,
        status TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (team_id, number)
      )
    `),
    env.DB.prepare(`
      CREATE INDEX IF NOT EXISTS stickers_status_idx
      ON stickers (status)
    `)
  ]);
}

export async function loadStickers(env, publicOnly = false) {
  const statement = publicOnly
    ? env.DB.prepare("SELECT team_id, number, status, quantity FROM stickers WHERE status IN ('wanted', 'duplicate') ORDER BY team_id, CAST(number AS INTEGER)")
    : env.DB.prepare("SELECT team_id, number, status, quantity FROM stickers ORDER BY team_id, CAST(number AS INTEGER)");
  const result = await statement.all();
  return rowsToState(result.results || []);
}

export async function replaceStickers(env, stickers) {
  const entries = flattenStickers(stickers);
  const deletes = env.DB.prepare("DELETE FROM stickers");
  const inserts = entries.map(entry =>
    env.DB.prepare(
      "INSERT INTO stickers (team_id, number, status, quantity, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)"
    ).bind(entry.teamId, entry.number, entry.status, entry.quantity)
  );
  await env.DB.batch([deletes, ...inserts]);
}

export async function getShareSlug(env) {
  const result = await env.DB.prepare("SELECT value FROM app_config WHERE key = 'share_slug'").first();
  return result?.value || "";
}

export async function setShareSlug(env, shareSlug) {
  await env.DB.prepare(
    "INSERT INTO app_config (key, value, updated_at) VALUES ('share_slug', ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP"
  ).bind(shareSlug).run();
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
