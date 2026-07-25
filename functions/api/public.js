import { ensureSchema, getShareSlug, loadStickers } from "./_lib/db.js";
import { json } from "./_lib/http.js";

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const requestedShare = (url.searchParams.get("share") || "").trim();

  await ensureSchema(env);
  const shareSlug = await getShareSlug(env);

  if (!requestedShare || !shareSlug || requestedShare !== shareSlug) {
    return json({ error: "Freigabe nicht gefunden." }, 404);
  }

  const stickers = await loadStickers(env, true);
  return json({ stickers });
}
