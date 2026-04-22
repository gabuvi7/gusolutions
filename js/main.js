/* GU Solutions landing — language toggle + scroll fade-in */
let currentLang = "en";

function setLang(lang) {
  currentLang = lang;
  document.getElementById("btn-es").classList.toggle("active", lang === "es");
  document.getElementById("btn-en").classList.toggle("active", lang === "en");
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-es]").forEach((el) => {
    const txt = el.getAttribute("data-" + lang);
    if (txt !== null) el.innerHTML = txt;
  });
}

window.setLang = setLang;

setLang("en");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 80);
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

/* Lightbox: enlarge project gallery screenshots */
(function initImageLightbox() {
  const wrap = document.createElement("div");
  wrap.id = "image-lightbox";
  wrap.className = "image-lightbox";
  wrap.setAttribute("role", "dialog");
  wrap.setAttribute("aria-modal", "true");
  wrap.setAttribute("aria-label", "Enlarged screenshot");
  wrap.hidden = true;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "image-lightbox-close";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "×";

  const lbImg = document.createElement("img");
  lbImg.className = "image-lightbox-img";
  lbImg.alt = "";

  wrap.append(closeBtn, lbImg);
  document.body.appendChild(wrap);

  let lastFocus = null;

  function openLightbox(src, alt) {
    const source = src || "";
    if (!source) return;
    lastFocus = document.activeElement;
    lbImg.src = source;
    lbImg.alt = alt || "";
    wrap.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    wrap.hidden = true;
    lbImg.removeAttribute("src");
    lbImg.alt = "";
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
    lastFocus = null;
  }

  wrap.addEventListener("click", (e) => {
    if (e.target === wrap) closeLightbox();
  });
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });
  lbImg.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !wrap.hidden) {
      e.preventDefault();
      closeLightbox();
    }
  });

  document.querySelectorAll(".project-gallery .project-shot").forEach((shot) => {
    shot.addEventListener("click", () => {
      const im = shot.querySelector("img");
      if (!im) return;
      openLightbox(im.currentSrc || im.getAttribute("src"), im.getAttribute("alt") || "");
    });
  });
})();
