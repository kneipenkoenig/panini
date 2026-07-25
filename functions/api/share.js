import { ensureSchema, resolvePerson, setPersonShareSlug } from "./_lib/db.js";
import { generateShareSlug, json } from "./_lib/http.js";

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  await ensureSchema(env);

  const person = await resolvePerson(env, request.headers.get("X-Person-Pin") || "");
  if (!person) {
    return json({ error: "PIN ungültig." }, 401);
  }

  let shareSlug = person.shareSlug;
  if (!shareSlug) {
    shareSlug = generateShareSlug();
    await setPersonShareSlug(env, person.id, shareSlug);
  }

  return json({ shareSlug });
}
