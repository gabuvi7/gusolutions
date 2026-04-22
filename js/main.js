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
