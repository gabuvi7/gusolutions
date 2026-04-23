/* ============================================================
   GU Solutions — Redesign
   i18n + tweaks + interactions
   ============================================================ */

/* ---------- TWEAK DEFAULTS (persisted by host) ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  theme: "dark",
  accent: "forest",
  type: "geometric",
  density: "normal",
  hero: "editorial",
}; /*EDITMODE-END*/

const STORE_KEY = "gu_tweaks_v1";
function loadTweaks() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { ...TWEAK_DEFAULTS };
    return { ...TWEAK_DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...TWEAK_DEFAULTS };
  }
}
function saveTweaks(t) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(t));
  } catch {}
}

const state = loadTweaks();

function applyTweaks() {
  const root = document.documentElement;
  root.setAttribute("data-theme", state.theme);
  root.setAttribute("data-accent", state.accent);
  root.setAttribute("data-type", state.type);
  root.setAttribute("data-density", state.density);
  root.setAttribute("data-hero", state.hero);
}
applyTweaks();

/* ---------- i18n ---------- */
let currentLang = localStorage.getItem("gu_lang") || "es";

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  try {
    localStorage.setItem("gu_lang", lang);
  } catch {}
  document
    .querySelectorAll("#btn-es, #btn-en")
    .forEach((b) => b.classList.remove("active"));
  const btn = document.getElementById("btn-" + lang);
  if (btn) btn.classList.add("active");
  document.querySelectorAll("[data-es]").forEach((el) => {
    const txt = el.getAttribute("data-" + lang);
    if (txt !== null) el.innerHTML = txt;
  });
}
window.setLang = setLang;

/* ---------- init after DOM ---------- */
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
  initFadeIn();
  initProjTabs();
  initLightbox();
  initFaq();
  initTweaks();
  initThemeToggle();
  initContactForm();
  announceEditMode();
});

/* ---------- fade in ---------- */
function initFadeIn() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 60);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".fade-in").forEach((el) => io.observe(el));
}

/* ---------- project tabs ---------- */
function initProjTabs() {
  const tabs = document.querySelectorAll(".proj-tab");
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      document.querySelectorAll("[data-proj-cat]").forEach((row) => {
        const cat = row.dataset.projCat;
        row.style.display = filter === "all" || cat === filter ? "" : "none";
      });
    });
  });
}

/* ---------- lightbox ---------- */
function initLightbox() {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const close = document.getElementById("lightbox-close");
  if (!lb) return;
  document.querySelectorAll(".project-shot").forEach((shot) => {
    shot.addEventListener("click", () => {
      const src = shot.querySelector("img")?.src;
      if (!src) return;
      img.src = src;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  const closeFn = () => {
    lb.classList.remove("open");
    img.removeAttribute("src");
    document.body.style.overflow = "";
  };
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeFn();
  });
  close?.addEventListener("click", closeFn);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) closeFn();
  });
}

/* ---------- FAQ ---------- */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    q?.addEventListener("click", () => {
      const open = item.dataset.open === "true";
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => (i.dataset.open = "false"));
      item.dataset.open = open ? "false" : "true";
    });
  });
}

/* ---------- theme toggle ---------- */
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  btn?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTweaks();
    saveTweaks(state);
    persistKeys({ theme: state.theme });
    refreshTweaksUI();
  });
}

/* ---------- Tweaks ---------- */
const TWEAK_SCHEMA = [
  {
    key: "theme",
    label: "Tema",
    options: [
      { v: "dark", label: "Oscuro" },
      { v: "light", label: "Claro" },
    ],
  },
  {
    key: "accent",
    label: "Acento",
    options: [
      { v: "ember", label: "Ember", color: "oklch(0.70 0.17 45)" },
      { v: "ink", label: "Ink", color: "oklch(0.65 0.16 245)" },
      { v: "forest", label: "Forest", color: "oklch(0.62 0.13 155)" },
      { v: "olive", label: "Olive", color: "oklch(0.80 0.13 115)" },
      { v: "rose", label: "Rose", color: "oklch(0.72 0.16 15)" },
      { v: "mono", label: "Mono", color: "oklch(0.7 0 0)" },
    ],
  },
  {
    key: "type",
    label: "Tipografía",
    options: [
      { v: "editorial", label: "Editorial" },
      { v: "geometric", label: "Geometric" },
      { v: "humanist", label: "Humanist" },
      { v: "brutal", label: "Brutal" },
    ],
  },
  {
    key: "density",
    label: "Densidad",
    options: [
      { v: "compact", label: "Compacta" },
      { v: "normal", label: "Normal" },
      { v: "spacious", label: "Amplia" },
    ],
  },
  {
    key: "hero",
    label: "Hero",
    options: [
      { v: "editorial", label: "Editorial" },
      { v: "brutal", label: "Brutal" },
      { v: "minimal", label: "Minimal" },
    ],
  },
];

function initTweaks() {
  const panel = document.getElementById("tweaks-panel");
  const fab = document.getElementById("tweaks-fab");
  const close = document.getElementById("tweaks-close");
  if (!panel) return;

  const body = panel.querySelector(".tweaks-body");
  body.innerHTML = TWEAK_SCHEMA.map(
    (row) => `
    <div class="tweak-row">
      <div class="tweak-label">${row.label}</div>
      <div class="tweak-options" data-tweak-key="${row.key}">
        ${row.options
          .map(
            (o) => `
          <button class="tweak-opt ${state[row.key] === o.v ? "active" : ""}" data-val="${o.v}">
            ${o.color ? `<span class="swatch" style="background:${o.color}"></span>` : ""}
            ${o.label}
          </button>`,
          )
          .join("")}
      </div>
    </div>
  `,
  ).join("");

  body.querySelectorAll(".tweak-options").forEach((group) => {
    const key = group.dataset.tweakKey;
    group.addEventListener("click", (e) => {
      const btn = e.target.closest(".tweak-opt");
      if (!btn) return;
      state[key] = btn.dataset.val;
      applyTweaks();
      saveTweaks(state);
      persistKeys({ [key]: state[key] });
      refreshTweaksUI();
    });
  });

  fab?.addEventListener("click", () => panel.classList.toggle("open"));
  close?.addEventListener("click", () => panel.classList.remove("open"));
}

function refreshTweaksUI() {
  document.querySelectorAll(".tweaks-body .tweak-options").forEach((group) => {
    const key = group.dataset.tweakKey;
    group.querySelectorAll(".tweak-opt").forEach((b) => {
      b.classList.toggle("active", b.dataset.val === state[key]);
    });
  });
}

/* ---------- persist keys via parent host ---------- */
function persistKeys(edits) {
  try {
    window.parent?.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
  } catch {}
}

/* ---------- edit mode announce ---------- */
function announceEditMode() {
  window.addEventListener("message", (e) => {
    if (!e.data) return;
    if (e.data.type === "__activate_edit_mode") {
      document.getElementById("tweaks-panel")?.classList.add("open");
    } else if (e.data.type === "__deactivate_edit_mode") {
      document.getElementById("tweaks-panel")?.classList.remove("open");
    }
  });
  try {
    window.parent?.postMessage({ type: "__edit_mode_available" }, "*");
  } catch {}
}

/* ---------- contact form ---------- */
function contactIsValidEmail(email) {
  const s = String(email).trim();
  if (s.length < 5 || s.length > 254) return false;
  const at = s.lastIndexOf("@");
  if (at < 1 || at === s.length - 1) return false;
  const local = s.slice(0, at);
  const domain = s.slice(at + 1);
  if (local.length > 64 || domain.length > 253) return false;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes(".."))
    return false;
  const labels = domain.split(".");
  if (labels.length < 2) return false;
  for (const label of labels) {
    if (label.length < 1 || label.length > 63) return false;
    if (!/^[a-zA-Z0-9-]+$/.test(label)) return false;
    if (label.startsWith("-") || label.endsWith("-")) return false;
  }
  return true;
}

const CONTACT_ERR = {
  invalid_name: {
    es: "Indicá tu nombre (hasta 200 caracteres).",
    en: "Please enter your name (up to 200 characters).",
  },
  invalid_email: {
    es: "El email no parece válido. Revisá el formato.",
    en: "That email does not look valid. Check the format.",
  },
  invalid_message: {
    es: "Escribí un mensaje (máx. 8000 caracteres).",
    en: "Please write a message (max 8000 characters).",
  },
  turnstile_missing: {
    es: "Completá la verificación anti‑bots arriba del botón.",
    en: "Complete the anti‑bot check above the button.",
  },
  turnstile_failed: {
    es: "La verificación anti‑bots falló. Recargá la página e intentá de nuevo.",
    en: "Anti‑bot verification failed. Reload and try again.",
  },
  not_configured: {
    es: "El envío no está configurado en el servidor. Escribime por email o LinkedIn.",
    en: "Sending is not configured on the server. Reach me by email or LinkedIn.",
  },
  send_failed: {
    es: "No se pudo enviar ahora. Probá de nuevo más tarde.",
    en: "Could not send right now. Please try again later.",
  },
  network: {
    es: "Sin conexión o error de red. Probá de nuevo.",
    en: "Network error. Please try again.",
  },
  generic: {
    es: "Algo salió mal. Probá de nuevo.",
    en: "Something went wrong. Please try again.",
  },
  form_unavailable: {
    es: "El formulario de envío no está disponible en este momento.",
    en: "The contact form is not available right now.",
  },
};

function contactErrorText(code) {
  const row = CONTACT_ERR[code] || CONTACT_ERR.generic;
  return row[currentLang] || row.es;
}

/** Misma URL que exige Cloudflare; no proxy ni cache del script. */
const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = TURNSTILE_SCRIPT;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile_script"));
    document.head.appendChild(s);
  });
}

function mountTurnstileExplicit(mountEl, sitekey, onReady) {
  if (!mountEl || !sitekey) return;
  const render = () => {
    if (!window.turnstile) return;
    const id = window.turnstile.render(mountEl, {
      sitekey,
      theme: "auto",
    });
    if (typeof onReady === "function") onReady(id);
  };

  if (window.turnstile) {
    render();
    return;
  }

  loadTurnstileScript()
    .then(render)
    .catch(() => {});
}

function initContactForm() {
  const chips = document.querySelectorAll(".budget-chips .chip");
  chips.forEach((c) => {
    c.addEventListener("click", () => {
      chips.forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
    });
  });

  const form = document.getElementById("contact-form");
  const errEl = document.getElementById("form-error");
  const okEl = document.getElementById("form-success");
  const submitBtn = document.getElementById("contact-submit");
  const turnstileMount = document.getElementById("turnstile-widget");
  const metaKey = document
    .querySelector('meta[name="turnstile-site-key"]')
    ?.getAttribute("content")
    ?.trim();

  let turnstileWidgetId = null;
  if (metaKey && turnstileMount) {
    mountTurnstileExplicit(turnstileMount, metaKey, (id) => {
      turnstileWidgetId = id;
    });
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form) return;

    if (!metaKey) {
      if (errEl) {
        errEl.textContent = contactErrorText("form_unavailable");
        errEl.style.display = "block";
      }
      return;
    }

    const nameEl = form.querySelector("#name");
    const emailEl = form.querySelector("#email");
    const msgEl = form.querySelector("#message");
    nameEl?.classList.remove("field-invalid");
    emailEl?.classList.remove("field-invalid");
    msgEl?.classList.remove("field-invalid");
    if (errEl) {
      errEl.style.display = "none";
      errEl.textContent = "";
    }
    if (okEl) okEl.style.display = "none";

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const hp = String(data.get("company") || "").trim();
    const budget =
      document.querySelector(".budget-chips .chip.active")?.dataset.value || "";

    let clientCode = null;
    if (!name || name.length > 200) clientCode = "invalid_name";
    else if (!contactIsValidEmail(email)) clientCode = "invalid_email";
    else if (!message || message.length > 8000) clientCode = "invalid_message";

    if (clientCode) {
      if (errEl) {
        errEl.textContent = contactErrorText(clientCode);
        errEl.style.display = "block";
      }
      if (clientCode === "invalid_name") nameEl?.classList.add("field-invalid");
      if (clientCode === "invalid_email")
        emailEl?.classList.add("field-invalid");
      if (clientCode === "invalid_message")
        msgEl?.classList.add("field-invalid");
      return;
    }

    let token = "";
    if (turnstileWidgetId != null && window.turnstile) {
      token = window.turnstile.getResponse(turnstileWidgetId) || "";
    }
    if (metaKey && !token) {
      if (errEl) {
        errEl.textContent = contactErrorText("turnstile_missing");
        errEl.style.display = "block";
      }
      return;
    }

    submitBtn?.setAttribute("disabled", "disabled");
    submitBtn?.setAttribute("aria-busy", "true");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          budget,
          hp,
          turnstileToken: token,
        }),
      });
      let body = {};
      try {
        body = await res.json();
      } catch {
        body = {};
      }

      if (res.ok && body.ok) {
        form.reset();
        chips.forEach((x) => x.classList.remove("active"));
        document
          .querySelector('.budget-chips .chip[data-value="3-10k"]')
          ?.classList.add("active");
        if (okEl) {
          const t = okEl.getAttribute("data-" + currentLang);
          if (t) okEl.textContent = t;
          okEl.style.display = "block";
        }
        if (turnstileWidgetId != null && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId);
        }
      } else {
        const code =
          body.error === "invalid_email" || body.error === "invalid_name"
            ? body.error
            : body.error === "invalid_message"
              ? "invalid_message"
              : body.error === "turnstile_failed"
                ? "turnstile_failed"
                : body.error === "not_configured"
                  ? "not_configured"
                  : body.error === "send_failed"
                    ? "send_failed"
                    : "generic";
        if (errEl) {
          errEl.textContent = contactErrorText(code);
          errEl.style.display = "block";
        }
        if (code === "invalid_email") emailEl?.classList.add("field-invalid");
        if (code === "invalid_name") nameEl?.classList.add("field-invalid");
        if (code === "invalid_message") msgEl?.classList.add("field-invalid");
        if (turnstileWidgetId != null && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId);
        }
      }
    } catch {
      if (errEl) {
        errEl.textContent = contactErrorText("network");
        errEl.style.display = "block";
      }
    } finally {
      submitBtn?.removeAttribute("disabled");
      submitBtn?.removeAttribute("aria-busy");
    }
  });
}
