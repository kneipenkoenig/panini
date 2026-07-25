-- Reference schema for the multi-person collections + trade matching feature.
-- Not executed automatically; functions/api/_lib/db.js ensureSchema() applies
-- this shape idempotently on every request (including migrating a pre-existing
-- single-collection `stickers` table into the person-scoped shape below).

CREATE TABLE IF NOT EXISTS people (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  pin TEXT NOT NULL UNIQUE,
  is_admin INTEGER NOT NULL DEFAULT 0,
  share_slug TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stickers (
  person_id TEXT NOT NULL,
  team_id TEXT NOT NULL,
  number TEXT NOT NULL,
  status TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (person_id, team_id, number)
);

CREATE INDEX IF NOT EXISTS stickers_status_idx ON stickers (status);
CREATE INDEX IF NOT EXISTS stickers_person_idx ON stickers (person_id);
