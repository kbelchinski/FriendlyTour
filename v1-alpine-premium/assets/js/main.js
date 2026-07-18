/* FriendlyTour - shared front-end behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var I18N = window.FT_I18N || {};
  var LANGS = window.FT_LANGS || [];
  var LS_LANG = "ft_lang";
  var LS_THEME = "ft_theme";

  /* ======================================================================
     Internationalisation (auto-detect + manual switch)
     ====================================================================== */
  function supported(code) { return code && Object.prototype.hasOwnProperty.call(I18N, code); }

  function detectLang() {
    var saved;
    try { saved = localStorage.getItem(LS_LANG); } catch (e) {}
    if (supported(saved)) return saved;
    var navs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "en"];
    for (var i = 0; i < navs.length; i++) {
      var code = String(navs[i] || "").toLowerCase().split("-")[0];
      if (supported(code)) return code;
    }
    return "en";
  }

  function setText(el, val) {
    /* Replace the element's last non-empty text node so sibling <svg> icons survive. */
    var nodes = el.childNodes, tn = null;
    for (var i = nodes.length - 1; i >= 0; i--) {
      if (nodes[i].nodeType === 3 && nodes[i].nodeValue.trim().length) { tn = nodes[i]; break; }
    }
    if (tn) tn.nodeValue = val;
    else el.textContent = val;
  }

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.en || {};
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (val == null) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = val;
      else setText(el, val);
    });

    document.querySelectorAll("[data-i18n-attrs]").forEach(function (el) {
      el.getAttribute("data-i18n-attrs").split(";").forEach(function (pair) {
        var idx = pair.indexOf(":");
        if (idx === -1) return;
        var attr = pair.slice(0, idx).trim();
        var key = pair.slice(idx + 1).trim();
        if (dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });

    if (dict.metaTitle) document.title = dict.metaTitle;
    var md = document.querySelector('meta[name="description"]');
    if (md && dict.metaDesc) md.setAttribute("content", dict.metaDesc);

    setYear();
    updateThemeLabel();

    var sel = document.querySelector(".lang-select");
    if (sel) sel.value = lang;
    try { localStorage.setItem(LS_LANG, lang); } catch (e) {}
  }

  function buildLangSelect() {
    var sel = document.querySelector(".lang-select");
    if (!sel || !LANGS.length) return;
    sel.innerHTML = "";
    LANGS.forEach(function (l) {
      var o = document.createElement("option");
      o.value = l.code;
      o.textContent = l.label;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () { applyLang(sel.value); });
  }

  /* ======================================================================
     Theme toggle (light / dark) with persistence
     ====================================================================== */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }
  function updateThemeLabel() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    var lang = document.documentElement.getAttribute("lang") || "en";
    var dict = I18N[lang] || I18N.en || {};
    var next = currentTheme() === "dark" ? dict.themeLight : dict.themeDark;
    if (next) { btn.setAttribute("aria-label", next); btn.setAttribute("title", next); }
  }
  function initTheme() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(LS_THEME, next); } catch (e) {}
      updateThemeLabel();
    });
    updateThemeLabel();
  }

  function setYear() {
    document.querySelectorAll("#year").forEach(function (y) {
      y.textContent = new Date().getFullYear();
    });
  }

  /* ======================================================================
     Existing interactive behaviour
     ====================================================================== */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  var body = document.body;
  var navToggle = document.querySelector(".nav-toggle");
  var backdrop = document.querySelector(".nav-backdrop");
  function closeNav() { body.classList.remove("nav-open"); }
  if (navToggle) {
    navToggle.addEventListener("click", function () { body.classList.toggle("nav-open"); });
  }
  if (backdrop) backdrop.addEventListener("click", closeNav);
  document.querySelectorAll(".main-nav a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var start = null;
        var dur = 1600;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = Math.floor(p * target);
          el.textContent = val.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString() + suffix;
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  var weatherEl = document.getElementById("weather");
  if (weatherEl) {
    var url = "https://api.open-meteo.com/v1/forecast?latitude=42.28&longitude=23.27&current=temperature_2m,weather_code";
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.current && typeof d.current.temperature_2m === "number") {
          weatherEl.textContent = Math.round(d.current.temperature_2m) + "\u00B0C";
        }
      })
      .catch(function () {});
  }

  /* ---- boot ---- */
  onScroll();
  buildLangSelect();
  initTheme();
  applyLang(detectLang());
})();
