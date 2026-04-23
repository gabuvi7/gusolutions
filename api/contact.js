/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY    — https://resend.com
 *   TURNSTILE_SECRET  — https://dash.cloudflare.com → Turnstile (funciona en cualquier host)
 *   CONTACT_TO        — casilla que recibe los mensajes
 *   MAIL_FROM         — remitente verificado en Resend, ej. "GU Solutions <onboarding@resend.dev>"
 */

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_API = "https://api.resend.com/emails";

function isValidEmail(email) {
  const s = String(email).trim();
  if (s.length < 5 || s.length > 254) return false;
  const at = s.lastIndexOf("@");
  if (at < 1 || at === s.length - 1) return false;
  const local = s.slice(0, at);
  const domain = s.slice(at + 1);
  if (local.length > 64 || domain.length > 253) return false;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) return false;
  const labels = domain.split(".");
  if (labels.length < 2) return false;
  for (const label of labels) {
    if (label.length < 1 || label.length > 63) return false;
    if (!/^[a-zA-Z0-9-]+$/.test(label)) return false;
    if (label.startsWith("-") || label.endsWith("-")) return false;
  }
  return true;
}

async function verifyTurnstile(token, secret, remoteip) {
  if (!token || !secret) return false;
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteip) body.set("remoteip", remoteip);
  const res = await fetch(TURNSTILE_VERIFY, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await res.json();
  return data.success === true;
}

function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length) return xff.split(",")[0].trim();
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string") return realIp.trim();
  return "";
}

async function readJsonBody(req) {
  if (req.body != null) {
    if (Buffer.isBuffer(req.body)) {
      try {
        return JSON.parse(req.body.toString("utf8"));
      } catch {
        return null;
      }
    }
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return null;
      }
    }
    if (typeof req.body === "object") {
      return req.body;
    }
  }
  const chunks = [];
  try {
    for await (const chunk of req) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
  } catch {
    return null;
  }
  if (chunks.length === 0) return null;
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  res.setHeader("cache-control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const turnstileSecret = process.env.TURNSTILE_SECRET;
  const contactTo = process.env.CONTACT_TO;
  const mailFrom = process.env.MAIL_FROM;

  if (!apiKey || !turnstileSecret || !contactTo || !mailFrom) {
    return res.status(503).json({ ok: false, error: "not_configured" });
  }

  const payload = await readJsonBody(req);
  if (payload == null || typeof payload !== "object") {
    return res.status(400).json({ ok: false, error: "invalid_json" });
  }

  const hp = typeof payload.hp === "string" ? payload.hp.trim() : "";
  if (hp.length > 0) {
    return res.status(200).json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const budget = typeof payload.budget === "string" ? payload.budget.trim() : "";
  const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";

  if (!name || name.length > 200) {
    return res.status(400).json({ ok: false, error: "invalid_name" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }
  if (!message || message.length > 8000) {
    return res.status(400).json({ ok: false, error: "invalid_message" });
  }
  if (budget.length > 80) {
    return res.status(400).json({ ok: false, error: "invalid_budget" });
  }

  const okTs = await verifyTurnstile(token, turnstileSecret, clientIp(req));
  if (!okTs) {
    return res.status(400).json({ ok: false, error: "turnstile_failed" });
  }

  const text = [
    "Nuevo mensaje desde el sitio GU Solutions",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Presupuesto: ${budget || "(no indicado)"}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  const r = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: mailFrom,
      to: [contactTo],
      reply_to: email,
      subject: `Contacto — ${name} — GU Solutions`,
      text,
    }),
  });

  if (!r.ok) {
    const errText = await r.text();
    console.error("Resend error", r.status, errText);
    return res.status(502).json({ ok: false, error: "send_failed" });
  }

  return res.status(200).json({ ok: true });
};
