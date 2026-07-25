import { computeMatches, ensureSchema, resolvePerson } from "./_lib/db.js";
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

  const { canGet, canGive } = await computeMatches(env, person.id);
  return json({
    me: { id: person.id, name: person.name, isAdmin: person.isAdmin },
    canGet,
    canGive
  });
}
