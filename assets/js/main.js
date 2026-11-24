/* =========================================================
   هوش‌یار — تعاملات
   ========================================================= */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const PROJECTS = window.PROJECTS || [];
  const FILTERS = window.PROJECT_FILTERS || [{ id: "all", label: "همه" }];
  const META = window.SERVICE_META || {};
  const SCENARIOS = window.SCENARIOS || [];
  const FAQ = window.FAQ || [];
  const CH = SITE.channels || {};

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  function toFa(n) {
    return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

  /* ---------------- کانال‌ها ---------------- */
  function waUrl(msg) {
    const num = String((CH.whatsapp && CH.whatsapp.handle) || "").replace(/[^\d]/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg || "");
  }
  function tgUrl() {
    return "https://t.me/" + String((CH.telegram && CH.telegram.handle) || "");
  }
  function baleUrl() {
    return "https://ble.ir/" + String((CH.bale && CH.bale.handle) || "");
  }
  function channelHref(ch, msg) {
    if (ch === "whatsapp") return waUrl(msg);
    if (ch === "telegram") return tgUrl();
    if (ch === "bale") return baleUrl();
    return "#contact";
  }
  function generalMsg() {
    return (SITE.messages && SITE.messages.general) || "";
  }

  function hydrateChannelLinks(root) {
    $$("[data-ch]", root || document).forEach((a) => {
      const ch = a.getAttribute("data-ch");
      a.setAttribute("href", channelHref(ch, generalMsg()));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ---------------- دیالوگ تماس ---------------- */
  const cd = $("#contactDialog");
  const cdMsg = $("#cdMsg");
  const cdCopy = $("#cdCopy");
  let currentMsg = generalMsg();
  let lastTrigger = null;

  function openContact(key) {
    if (!cd) return;
    const msg = (SITE.messages && SITE.messages[key]) || generalMsg();
    currentMsg = msg;
    if (cdMsg) cdMsg.textContent = msg;

    const links = {
      whatsapp: channelHref("whatsapp", msg),
      telegram: tgUrl(),
      bale: baleUrl(),
    };
    $$("[data-open-ch]", cd).forEach((a) => {
      const ch = a.getAttribute("data-open-ch");
      a.setAttribute("href", links[ch] || "#");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });

    lastTrigger = document.activeElement;
    if (typeof cd.showModal === "function") {
      if (!cd.open) cd.showModal();
    } else {
      cd.setAttribute("open", "");
    }
    document.documentElement.classList.add("no-scroll");
  }

  function closeContact() {
    if (!cd) return;
    if (typeof cd.close === "function" && cd.open) cd.close();
    else cd.removeAttribute("open");
    document.documentElement.classList.remove("no-scroll");
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /* ---------------- تصاویر نمونه‌ها ---------------- */
  const IMGS = {
    gym: "assets/img/work-gym.jpg",
    chat: "assets/img/work-chat.jpg",
    agent: "assets/img/work-agent.jpg",
    restaurant: "assets/img/work-restaurant.jpg",
  };

  function imageFor(p) {
    return IMGS[p.visual] || IMGS.gym;
  }

  function mediaFor(p) {
    return '<img class="case-img" src="' + imageFor(p) + '" alt="نمونه تصویری: ' + p.title +
      '" width="1280" height="800" loading="lazy" decoding="async">';
  }

  /* ---------------- نمونه‌ها ---------------- */
  const grid = $("#portfolioGrid");
  const filterBar = $("#portfolioFilters");
  const countEl = $("#portfolioCount");

  function projectCard(p, i) {
    const n = toFa(i + 1);
    const num = n.length < 2 ? "۰" + n : n;
    const lead = i === 0 ? " case--lead" : "";
    return (
      '<article class="case' + lead + '" data-category="' + p.category + '">' +
        '<button type="button" class="case-btn" data-open="' + p.id + '" aria-haspopup="dialog">' +
          '<span class="case-media">' + mediaFor(p) +
            '<span class="case-badge">نمونه نمایشی</span>' +
          "</span>" +
          '<span class="case-body">' +
            '<span class="case-kicker"><span class="case-num">' + num + "</span>" +
              ((META[p.category] && META[p.category].short) || "") +
            "</span>" +
            '<span class="case-title">' + p.title + "</span>" +
            '<span class="case-summary">' + p.summary + "</span>" +
            '<span class="case-foot">' +
              '<span class="case-cta">مشاهده <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg></span>' +
              '<span class="case-biz">' + p.business + "</span>" +
            "</span>" +
          "</span>" +
        "</button>" +
      "</article>"
    );
  }

  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = FILTERS.map(function (f) {
      const on = f.id === "all";
      return '<button type="button" class="chip' + (on ? " is-active" : "") +
        '" data-filter="' + f.id + '" aria-pressed="' + on + '">' + f.label + "</button>";
    }).join("");
  }

  function applyFilter(id) {
    if (!filterBar || !grid) return;
    $$(".chip", filterBar).forEach(function (c) {
      const on = c.getAttribute("data-filter") === id;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", String(on));
    });
    let shown = 0;
    $$(".case", grid).forEach(function (card) {
      const match = id === "all" || card.getAttribute("data-category") === id;
      card.hidden = !match;
      if (match) shown += 1;
    });
    if (countEl) {
      countEl.textContent = shown ? toFa(shown) + " پروژه" : "موردی نیست";
    }
  }

  function renderWork() {
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(projectCard).join("");
    renderFilters();
    applyFilter("all");
  }

  /* ---------------- مودال ---------------- */
  const modal = $("#projectModal");
  let lastFocus = null;

  function openProject(id) {
    const p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p || !modal) return;

    const t = $("#modalTitle"), b = $("#modalBiz"), v = $("#modalVisual"), body = $("#modalBody"), cta = $("#modalCta");
    if (t) t.textContent = p.title;
    if (b) b.textContent = p.business;
    if (v) v.innerHTML = mediaFor(p);

    if (body) {
      body.innerHTML =
        '<div class="modal-block"><h3>مسئله</h3><p>' + p.problem + "</p></div>" +
        '<div class="modal-block"><h3>راهکار</h3><ul class="checks">' +
          p.solution.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
        "</ul></div>" +
        '<div class="modal-block"><h3>چه کاری انجام می‌دهد</h3><ul class="checks">' +
          p.outputs.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
        "</ul></div>" +
        '<div class="modal-block"><h3>ارزش عملی</h3><ul class="checks">' +
          p.value.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
        "</ul></div>" +
        '<p class="modal-note">این پروژه دمو است. نام کسب‌وکار و اعداد ساختگی‌اند و ادعای نتیجه واقعی نیستند.</p>';
    }

    if (cta) {
      cta.setAttribute("data-contact", p.category);
      cta.setAttribute("href", "#contact");
    }

    lastFocus = document.activeElement;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    document.documentElement.classList.add("no-scroll");
  }

  function closeProject(skipFocus) {
    if (!modal) return;
    if (typeof modal.close === "function" && modal.open) modal.close();
    else modal.removeAttribute("open");
    document.documentElement.classList.remove("no-scroll");
    if (!skipFocus && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------------- انتخاب راهکار ---------------- */
  const chooserList = $("#chooserOptions");
  const chooserOut = $("#chooserResult");

  function renderChooser() {
    if (!chooserList || !chooserOut) return;
    chooserList.innerHTML = SCENARIOS.map(function (s, i) {
      return '<button type="button" class="scenario" data-scenario="' + i + '" aria-pressed="false">' +
        '<svg class="ico scenario-icon" aria-hidden="true"><use href="#' + s.icon + '"/></svg>' +
        '<span class="scenario-text">' + s.text + "</span>" +
        '<span class="scenario-check"><svg class="ico" aria-hidden="true"><use href="#i-check"/></svg></span>' +
      "</button>";
    }).join("");
    chooserOut.innerHTML = '<div class="chooser-empty">یکی از گزینه‌ها را انتخاب کن تا راهکار مناسب را اینجا ببینی.</div>';
  }

  function selectScenario(i) {
    const s = SCENARIOS[i];
    if (!s || !chooserOut) return;

    $$(".scenario", chooserList).forEach(function (b) {
      const on = b.getAttribute("data-scenario") === String(i);
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });

    const meta = META[s.service] || { title: "راهکار" };
    chooserOut.innerHTML =
      '<div class="chooser-card">' +
        '<p class="chooser-kicker">راهکار پیشنهادی</p>' +
        "<h3>" + meta.title + "</h3>" +
        "<p>" + s.why + "</p>" +
        '<ul class="checks">' + s.points.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>" +
        '<div class="chooser-actions">' +
          '<button type="button" class="btn btn-sm btn-solid" data-contact="' + s.service + '">شروع گفت‌وگو</button>' +
          '<button type="button" class="btn btn-sm btn-ghost" data-goto="' + s.service + '">دیدن نمونه</button>' +
        "</div>" +
      "</div>";
  }

  /* ---------------- پرسش‌ها ---------------- */
  function renderFaq() {
    const list = $("#faqList");
    if (!list) return;
    list.innerHTML = FAQ.map(function (f, i) {
      return '<details class="faq-item"' + (i === 0 ? " open" : "") + ">" +
        "<summary><span>" + f.q + "</span>" +
          '<svg class="ico faq-chev" aria-hidden="true"><use href="#i-chevron"/></svg>' +
        "</summary>" +
        '<div class="faq-answer">' + f.a + "</div>" +
      "</details>";
    }).join("");
  }

  /* ---------------- منو و هدر ---------------- */
  function initMenu() {
    const toggle = $("#menuToggle");
    const nav = $("#mainNav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "بستن منو" : "باز کردن منو");
      document.documentElement.classList.toggle("menu-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && nav.classList.contains("is-open")) setOpen(false);
    });
  }

  function initHeader() {
    const header = $("#siteHeader");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- رویدادها ---------------- */
  function bindEvents() {
    if (grid) {
      grid.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-open]");
        if (btn) openProject(btn.getAttribute("data-open"));
      });
    }

    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        const chip = e.target.closest("[data-filter]");
        if (chip) applyFilter(chip.getAttribute("data-filter"));
      });
    }

    if (chooserList) {
      chooserList.addEventListener("click", function (e) {
        const b = e.target.closest("[data-scenario]");
        if (b) selectScenario(Number(b.getAttribute("data-scenario")));
      });
    }

    if (chooserOut) {
      chooserOut.addEventListener("click", function (e) {
        const go = e.target.closest("[data-goto]");
        if (go) {
          applyFilter(go.getAttribute("data-goto"));
          const work = $("#work");
          if (work) work.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    $$("[data-view-project]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        const p = PROJECTS.filter(function (x) { return x.id === a.getAttribute("data-view-project"); })[0];
        if (p) applyFilter(p.category);
        const work = $("#work");
        if (work) work.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    /* هر دکمه‌ی تماس → دیالوگ */
    document.addEventListener("click", function (e) {
      const trigger = e.target.closest("[data-contact]");
      if (!trigger) return;
      e.preventDefault();
      const key = trigger.getAttribute("data-contact") || "general";
      if (trigger.id === "modalCta") {
        closeProject(true);
        window.setTimeout(function () { openContact(key); }, 80);
      } else {
        openContact(key);
      }
    });

    if (cd) {
      const closeBtn = $("#cdClose");
      if (closeBtn) closeBtn.addEventListener("click", closeContact);
      cd.addEventListener("close", function () {
        document.documentElement.classList.remove("no-scroll");
      });
      cd.addEventListener("click", function (e) {
        if (e.target === cd) closeContact();
      });
    }

    if (cdCopy) {
      cdCopy.addEventListener("click", function () {
        const original = cdCopy.innerHTML;
        copyText(currentMsg).then(function () {
          cdCopy.innerHTML = '<svg class="ico" aria-hidden="true"><use href="#i-check"/></svg> کپی شد';
          window.setTimeout(function () { cdCopy.innerHTML = original; }, 1800);
        }).catch(function () {
          cdCopy.textContent = "کپی نشد؛ دستی انتخاب کن";
        });
      });
    }

    if (modal) {
      const closeBtn = $("#modalClose");
      const dismissBtn = $("#modalDismiss");
      if (closeBtn) closeBtn.addEventListener("click", function () { closeProject(); });
      if (dismissBtn) dismissBtn.addEventListener("click", function () { closeProject(); });
      modal.addEventListener("close", function () {
        document.documentElement.classList.remove("no-scroll");
      });
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeProject();
      });
    }
  }

  function initYear() {
    const el = $("#year");
    if (!el) return;
    try {
      el.textContent = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" }).format(new Date());
    } catch (e) {
      /* همان مقدار پیش‌فرض */
    }
  }

  function init() {
    renderWork();
    renderChooser();
    renderFaq();
    hydrateChannelLinks();
    initMenu();
    initHeader();
    initYear();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
