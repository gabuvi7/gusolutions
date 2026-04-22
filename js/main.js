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
function initContactForm() {
  const chips = document.querySelectorAll(".budget-chips .chip");
  chips.forEach((c) => {
    c.addEventListener("click", () => {
      chips.forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
    });
  });
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const msg = data.get("message") || "";
    const budget =
      document.querySelector(".budget-chips .chip.active")?.dataset.value || "";
    const body = `Nombre: ${name}%0D%0AEmail: ${email}%0D%0APresupuesto: ${budget}%0D%0A%0D%0A${msg}`;
    window.location.href = `mailto:uviedo_gabriel@hotmail.com?subject=Proyecto%20%E2%80%94%20GU%20Solutions&body=${body}`;
    const s = document.getElementById("form-success");
    if (s) s.style.display = "block";
  });
}
