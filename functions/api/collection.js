import { ensureSchema, loadStickers, replaceStickers, resolvePerson } from "./_lib/db.js";
import { json } from "./_lib/http.js";

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  await ensureSchema(env);

  const person = await resolvePerson(env, request.headers.get("X-Person-Pin") || "");
  if (!person) {
    return json({ error: "PIN ungültig." }, 401);
  }

  const stickers = await loadStickers(env, person.id, false);
  return json({
    stickers,
    shareSlug: person.shareSlug,
    me: { id: person.id, name: person.name, isAdmin: person.isAdmin }
  });
}

export async function onRequestPut(context) {
  const { request, env } = context;
  await ensureSchema(env);

  const person = await resolvePerson(env, request.headers.get("X-Person-Pin") || "");
  if (!person) {
    return json({ error: "PIN ungültig." }, 401);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !body.stickers) {
    return json({ error: "Ungültige Daten." }, 400);
  }

  await replaceStickers(env, person.id, body.stickers);
  return json({ ok: true, shareSlug: person.shareSlug });
}
