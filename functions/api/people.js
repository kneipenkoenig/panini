import { createPerson, deletePerson, ensureSchema, listPeople, resolvePerson, updatePerson } from "./_lib/db.js";
import { json } from "./_lib/http.js";

export async function onRequestOptions() {
  return json({ ok: true });
}

async function requireAdmin(request, env) {
  const person = await resolvePerson(env, request.headers.get("X-Person-Pin") || "");
  if (!person || !person.isAdmin) {
    return null;
  }
  return person;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  await ensureSchema(env);

  const admin = await requireAdmin(request, env);
  if (!admin) {
    return json({ error: "Nur für Admin." }, 401);
  }

  const people = await listPeople(env);
  return json({ people });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  await ensureSchema(env);

  const admin = await requireAdmin(request, env);
  if (!admin) {
    return json({ error: "Nur für Admin." }, 401);
  }

  const body = await request.json().catch(() => null);
  const name = (body?.name || "").trim();
  const pin = (body?.pin || "").trim();
  if (!name || !pin) {
    return json({ error: "Name und PIN erforderlich." }, 400);
  }

  try {
    const person = await createPerson(env, name, pin);
    return json({ person });
  } catch (error) {
    if (error.message?.includes("Maximal")) {
      return json({ error: error.message }, 400);
    }
    return json({ error: "PIN wird bereits verwendet." }, 409);
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  await ensureSchema(env);

  const admin = await requireAdmin(request, env);
  if (!admin) {
    return json({ error: "Nur für Admin." }, 401);
  }

  const body = await request.json().catch(() => null);
  const id = (body?.id || "").trim();
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const pin = typeof body?.pin === "string" ? body.pin.trim() : "";

  if (!id) {
    return json({ error: "Ungültige Anfrage." }, 400);
  }
  if (id === "admin" && pin) {
    return json({ error: "Die Admin-PIN wird über die Umgebungsvariable ADMIN_PIN gesetzt." }, 400);
  }
  if (!name && !pin) {
    return json({ error: "Bitte Name oder PIN zum Ändern angeben." }, 400);
  }

  try {
    const person = await updatePerson(env, id, { name, pin });
    return json({ person });
  } catch (error) {
    if (error.message === "Person nicht gefunden.") {
      return json({ error: error.message }, 404);
    }
    return json({ error: "PIN wird bereits verwendet." }, 409);
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  await ensureSchema(env);

  const admin = await requireAdmin(request, env);
  if (!admin) {
    return json({ error: "Nur für Admin." }, 401);
  }

  const url = new URL(request.url);
  const id = (url.searchParams.get("id") || "").trim();
  if (!id || id === "admin") {
    return json({ error: "Ungültige Anfrage." }, 400);
  }

  await deletePerson(env, id);
  return json({ ok: true });
}
