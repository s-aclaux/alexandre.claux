// 1) Langue : on retient le choix, sinon on prend la langue du navigateur
const root = document.documentElement;
let lang = "fr";
try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("fr") ? "fr" : "en"); } catch (e) {}

function setLang(l) {
  lang = l;
  root.lang = l;                                   // le CSS cache l'autre langue
  try { localStorage.setItem("lang", l); } catch (e) {}
  // Les liens de CV changent selon la langue
  document.querySelectorAll("a[data-cv]").forEach(a => {
    a.href = "assets/CV_AlexandreClaux_" + l.toUpperCase() + ".pdf";
  });
}
setLang(lang);
document.getElementById("lang-btn").addEventListener("click", () => setLang(lang === "fr" ? "en" : "fr"));

// 2) Apparition douce des blocs
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
