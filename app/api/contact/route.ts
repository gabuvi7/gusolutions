import { createServerSupabaseClient } from "@/lib/supabase/server";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  projectType?: unknown;
  message?: unknown;
  hp?: unknown;
  turnstileToken?: unknown;
};

type ContactLead = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  projectType: string | null;
  message: string;
};

function json(data: Record<string, unknown>, init: ResponseInit = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      "cache-control": "no-store",
      ...init.headers,
    },
  });
}

function readEnv(name: string) {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function toText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(value: unknown) {
  const text = toText(value);
  return text.length > 0 ? text : null;
}

function isValidEmail(email: string) {
  if (email.length < 5 || email.length > 254) return false;

  const at = email.lastIndexOf("@");
  if (at < 1 || at === email.length - 1) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64 || domain.length > 253) return false;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) return false;

  const labels = domain.split(".");
  if (labels.length < 2) return false;

  return labels.every(
    (label) =>
      label.length >= 1 &&
      label.length <= 63 &&
      /^[a-zA-Z0-9-]+$/.test(label) &&
      !label.startsWith("-") &&
      !label.endsWith("-"),
  );
}

function parseLead(payload: ContactPayload): { lead?: ContactLead; error?: string } {
  const lead: ContactLead = {
    name: toText(payload.name),
    email: toText(payload.email).toLowerCase(),
    phone: nullableText(payload.phone),
    company: nullableText(payload.company),
    projectType: nullableText(payload.projectType),
    message: toText(payload.message),
  };

  if (lead.name.length < 2 || lead.name.length > 200) return { error: "invalid_name" };
  if (!isValidEmail(lead.email)) return { error: "invalid_email" };
  if (lead.phone && lead.phone.length > 80) return { error: "invalid_phone" };
  if (lead.company && lead.company.length > 160) return { error: "invalid_company" };
  if (lead.projectType && lead.projectType.length > 120) return { error: "invalid_project_type" };
  if (lead.message.length < 10 || lead.message.length > 8000) return { error: "invalid_message" };

  return { lead };
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "";
  return request.headers.get("x-real-ip")?.trim() ?? "";
}

async function verifyTurnstile(token: string, request: Request) {
  const secret = readEnv("TURNSTILE_SECRET");
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  const remoteip = clientIp(request);
  if (remoteip) body.set("remoteip", remoteip);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    const data = (await response.json()) as { success?: boolean };
    return response.ok && data.success === true;
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return false;
  }
}

async function saveLead(lead: ContactLead, request: Request) {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { configured: false, ok: false };

  const { error } = await supabase.from("website_contact_leads").insert([{
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    project_type: lead.projectType,
    message: lead.message,
    source: "website",
    user_agent: request.headers.get("user-agent"),
  }]);

  if (error) {
    console.error("Supabase contact lead insert failed", error.message);
    return { configured: true, ok: false };
  }

  return { configured: true, ok: true };
}

async function sendEmail(lead: ContactLead) {
  const apiKey = readEnv("RESEND_API_KEY");
  const contactTo = readEnv("CONTACT_TO");
  const mailFrom = readEnv("MAIL_FROM");

  if (!apiKey || !contactTo || !mailFrom) return { configured: false, ok: false };

  const text = [
    "Nuevo mensaje desde el sitio GU Solutions",
    "",
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    `Teléfono: ${lead.phone ?? "(no indicado)"}`,
    `Empresa: ${lead.company ?? "(no indicada)"}`,
    `Tipo de proyecto: ${lead.projectType ?? "(no indicado)"}`,
    "",
    "Mensaje:",
    lead.message,
  ].join("\n");

  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: mailFrom,
      to: [contactTo],
      reply_to: lead.email,
      subject: `Contacto — ${lead.name} — GU Solutions`,
      text,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend contact email failed", response.status, body.slice(0, 500));
    return { configured: true, ok: false };
  }

  return { configured: true, ok: true };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ ok: false, error: "invalid_json" }, { status: 400 });
    }
    payload = body as ContactPayload;
  } catch {
    return json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (toText(payload.hp).length > 0) {
    return json({ ok: true });
  }

  const { lead, error } = parseLead(payload);
  if (!lead) return json({ ok: false, error }, { status: 400 });

  const turnstileOk = await verifyTurnstile(toText(payload.turnstileToken), request);
  if (!turnstileOk) return json({ ok: false, error: "turnstile_failed" }, { status: 400 });

  const [saved, sent] = await Promise.all([saveLead(lead, request), sendEmail(lead)]);
  const isConfigured = saved.configured || sent.configured;
  const succeeded = saved.ok || sent.ok;

  if (!isConfigured) {
    return json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  if (!succeeded) {
    return json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return json({ ok: true });
}
