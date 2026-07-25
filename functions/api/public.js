import { ensureSchema, getPersonByShareSlug, loadStickers } from "./_lib/db.js";
import { json } from "./_lib/http.js";

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const requestedShare = (url.searchParams.get("share") || "").trim();

  await ensureSchema(env);

  if (!requestedShare) {
    return json({ error: "Freigabe nicht gefunden." }, 404);
  }

  const person = await getPersonByShareSlug(env, requestedShare);
  if (!person) {
    return json({ error: "Freigabe nicht gefunden." }, 404);
  }

  const stickers = await loadStickers(env, person.id, true);
  return json({ stickers, ownerName: person.name });
}
