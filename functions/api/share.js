import { ensureSchema, getShareSlug, setShareSlug } from "./_lib/db.js";
import { generateShareSlug, json, validatePin } from "./_lib/http.js";

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!validatePin(request, env)) {
    return json({ error: "PIN ungültig." }, 401);
  }

  await ensureSchema(env);
  let shareSlug = await getShareSlug(env);
  if (!shareSlug) {
    shareSlug = generateShareSlug();
    await setShareSlug(env, shareSlug);
  }

  return json({ shareSlug });
}
