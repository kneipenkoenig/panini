export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Pin",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS"
    }
  });
}

export function validatePin(request, env) {
  const pin = request.headers.get("X-Admin-Pin") || "";
  return Boolean(env.ADMIN_PIN) && pin === env.ADMIN_PIN;
}

export function generateShareSlug() {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  let value = "";
  for (let index = 0; index < 10; index += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return value;
}
