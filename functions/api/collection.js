import { ensureSchema, getShareSlug, loadStickers, replaceStickers } from "./_lib/db.js";
import { json, validatePin } from "./_lib/http.js";

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!validatePin(request, env)) {
    return json({ error: "PIN ungültig." }, 401);
  }

  await ensureSchema(env);
  const stickers = await loadStickers(env, false);
  const shareSlug = await getShareSlug(env);
  return json({ stickers, shareSlug });
}

export async function onRequestPut(context) {
  const { request, env } = context;
  if (!validatePin(request, env)) {
    return json({ error: "PIN ungültig." }, 401);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !body.stickers) {
    return json({ error: "Ungültige Daten." }, 400);
  }

  await ensureSchema(env);
  await replaceStickers(env, body.stickers);
  const shareSlug = await getShareSlug(env);
  return json({ ok: true, shareSlug });
}
