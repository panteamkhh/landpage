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

  /* ---------------- ماکاپ نمونه‌ها ---------------- */
  function frame(inner, label) {
    return (
      '<svg class="pc-svg" viewBox="0 0 640 400" role="img" aria-label="' + label +
      '" preserveAspectRatio="xMidYMid slice"><rect width="640" height="400" fill="#0e1114"/>' +
      inner + "</svg>"
    );
  }
  function rect(x, y, w, h, r, cls) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" class="' + cls + '"/>';
  }
  function txt(x, y, s, cls, anchor, size) {
    return '<text x="' + x + '" y="' + y + '" class="' + (cls || "") + '"' +
      (anchor ? ' text-anchor="' + anchor + '"' : "") +
      (size ? ' font-size="' + size + '"' : "") + ">" + s + "</text>";
  }
  function bars(x0, baseline, count, w, gap, heights, hiFrom, hiTo) {
    let out = "";
    for (let i = 0; i < count; i++) {
      const h = heights[i % heights.length];
      const hi = i >= hiFrom && i <= hiTo;
      out += rect(x0 + i * (w + gap), baseline - h, w, h, 3, hi ? "sv-bar-hi" : "sv-bar");
    }
    return out;
  }

  function visualGym() {
    const kpis = [
      { x: 44, l: "تمدید این ماه", v: "۵۸٪", c: "sv-accent" },
      { x: 232, l: "عضو در خطر", v: "۱۲۷", c: "sv-ink" },
      { x: 420, l: "حضور امروز", v: "۵۴", c: "sv-ink" },
    ].map(function (k) {
      return rect(k.x, 96, 176, 66, 9, "sv-surface") +
        txt(k.x + 14, 120, k.l, "sv-mut", "start", 10.5) +
        txt(k.x + 14, 148, k.v, "sv-bold " + k.c, "start", 20);
    }).join("");

    const heights = [38, 52, 44, 68, 58, 82, 62, 74];

    return frame(
      rect(24, 24, 592, 352, 12, "sv-panel") +
        txt(592, 54, "باشگاه پالس", "sv-ink sv-bold", "end", 15) +
        txt(592, 73, "۶۴۰ عضو · این ماه", "sv-mut", "end", 10) +
        kpis +
        '<circle cx="150" cy="238" r="46" fill="none" stroke="#2a323a" stroke-width="13"/>' +
        '<circle cx="150" cy="238" r="46" fill="none" stroke="#e0b173" stroke-width="13" stroke-linecap="round" stroke-dasharray="168 289" transform="rotate(-90 150 238)"/>' +
        txt(150, 242, "۵۸٪", "sv-ink sv-bold", "middle", 20) +
        txt(150, 262, "نرخ تمدید", "sv-mut", "middle", 9.5) +
        txt(150, 316, "۱۲۷ عضو در خطر", "sv-mut", "middle", 10) +
        bars(280, 300, 8, 22, 16, heights, 5, 7) +
        txt(280, 316, "حضور هفته", "sv-mut", "start", 10) +
        txt(596, 316, "شنبه تا جمعه", "sv-mut", "end", 10),
      "داشبورد ریزش باشگاه"
    );
  }

  function visualChat() {
    const b = (x, y, w, h, cls) => rect(x, y, w, h, 12, cls);

    return frame(
      rect(38, 150, 116, 62, 10, "sv-surface") +
        txt(146, 172, "نوبت ثبت شد", "sv-ink sv-bold", "end", 10.5) +
        txt(146, 190, "پنجشنبه ۱۶:۳۰", "sv-mut", "end", 10) +
        rect(38, 228, 116, 62, 10, "sv-surface") +
        txt(146, 250, "زمان پاسخ", "sv-mut", "end", 10) +
        txt(146, 270, "۱۱ ثانیه", "sv-accent sv-bold", "end", 12) +

      rect(176, 24, 288, 352, 16, "sv-panel") +
        '<path d="M192 24h256a16 16 0 0 1 16 16v32H176V40a16 16 0 0 1 16-16z" fill="#171c21"/>' +
        '<circle cx="432" cy="48" r="13" fill="#222a31"/>' +
        txt(432, 52, "آ", "sv-ink sv-bold", "middle", 10) +
        txt(408, 45, "کلینیک آرنیکا", "sv-ink sv-bold", "end", 11.5) +
        txt(408, 61, "پاسخ خودکار", "sv-mut", "end", 9) +
        '<circle cx="416" cy="57" r="2.5" class="sv-ok"/>' +

        b(298, 88, 146, 30, "sv-bubble-in") +
        txt(432, 107, "قیمت لیزر چنده؟", "sv-ink", "end", 10) +
        b(200, 130, 244, 48, "sv-bubble-out") +
        txt(432, 150, "برای ناحیه صورت، هر جلسه", "sv-ink", "end", 10) +
        txt(432, 166, "۲٫۸ میلیون تومان است.", "sv-ink", "end", 10) +
        b(286, 190, 158, 30, "sv-bubble-in") +
        txt(432, 209, "نوبت دارید؟", "sv-ink", "end", 10) +
        b(200, 232, 244, 48, "sv-bubble-out") +
        txt(432, 252, "پنجشنبه ۱۶:۳۰ یا", "sv-ink", "end", 10) +
        txt(432, 268, "شنبه ۱۱:۰۰ آزاد است.", "sv-ink", "end", 10) +
        b(224, 292, 220, 48, "sv-bubble-in") +
        txt(432, 312, "نام و شماره‌ات را بنویس", "sv-ink", "end", 10) +
        txt(432, 328, "تا ثبت کنم.", "sv-ink", "end", 10) +
        b(212, 348, 54, 14, "sv-surface") +
        '<circle cx="230" cy="355" r="2" class="sv-mut"/><circle cx="240" cy="355" r="2" class="sv-mut"/><circle cx="250" cy="355" r="2" class="sv-mut"/>',
      "چت‌بات کلینیک زیبایی"
    );
  }

  function visualAgent() {
    const steps = [
      { y: 168, t: "ثبت سفارش", s: "۰۹:۱۲" },
      { y: 216, t: "تحویل به پست", s: "دیروز" },
      { y: 264, t: "در مسیر", s: "امروز" },
    ].map(function (s, i) {
      return '<circle cx="76" cy="' + s.y + '" r="6" fill="' + (i < 2 ? "#e0b173" : "#2a323a") + '"/>' +
        txt(96, s.y + 4, s.t, i < 2 ? "sv-ink" : "sv-mut", "start", 11) +
        txt(314, s.y + 4, s.s, "sv-mut", "end", 9.5) +
        (i < 2 ? '<path d="M76 ' + (s.y + 8) + 'v32" stroke="#2a323a" stroke-width="1.5" stroke-dasharray="3 3"/>' : "");
    }).join("");

    return frame(
      rect(24, 24, 300, 352, 12, "sv-panel") +
        txt(304, 56, "سفارش ۱۴۰۴۲۲۸", "sv-ink sv-bold", "end", 13) +
        txt(304, 76, "مشتری: سارا م.", "sv-mut", "end", 10) +
        rect(44, 96, 260, 34, 8, "sv-surface") +
        txt(60, 118, "وضعیت", "sv-mut", "start", 10) +
        txt(288, 118, "در مسیر", "sv-accent sv-bold", "end", 11) +
        steps +
        rect(44, 320, 260, 36, 8, "sv-surface") +
        txt(288, 343, "کد رهگیری ارسال شد", "sv-mut", "end", 10) +

        rect(348, 24, 268, 352, 12, "sv-panel") +
        txt(596, 52, "پاسخ ایجنت", "sv-ink sv-bold", "end", 12) +
        rect(366, 74, 232, 30, 10, "sv-bubble-in") +
        txt(586, 93, "سفارشم کجاست؟", "sv-ink", "end", 10) +
        rect(366, 114, 232, 62, 10, "sv-bubble-out") +
        txt(586, 136, "سفارشت دیروز تحویل پست", "sv-ink", "end", 10) +
        txt(586, 152, "شده و امروز در مسیر است.", "sv-ink", "end", 10) +
        txt(586, 168, "کد رهگیری: ۲۴۱۸", "sv-ink", "end", 10) +
        rect(366, 188, 232, 30, 10, "sv-bubble-in") +
        txt(586, 207, "مرجوعی چطور؟", "sv-ink", "end", 10) +
        rect(366, 230, 232, 46, 10, "sv-bubble-out") +
        txt(586, 250, "تا ۷ روز، از پروفایل", "sv-ink", "end", 10) +
        txt(586, 266, "خودت ثبت کن.", "sv-ink", "end", 10) +
        txt(596, 330, "۶۲٪ بدون پشتیبان", "sv-mut", "end", 10) +
        txt(368, 330, "پاسخ زیر ۱ دقیقه", "sv-accent", "start", 10),
      "ایجنت پیگیری سفارش"
    );
  }

  function visualRestaurant() {
    const heights = [22, 30, 40, 28, 54, 76, 62, 82, 58, 66, 40, 26];
    return frame(
      rect(24, 24, 592, 352, 12, "sv-panel") +
        txt(592, 54, "رستوران ونک", "sv-ink sv-bold", "end", 15) +
        txt(592, 73, "۹۰ روز گذشته", "sv-mut", "end", 10) +
        '<circle cx="150" cy="188" r="48" fill="none" stroke="#2a323a" stroke-width="13"/>' +
        '<circle cx="150" cy="188" r="48" fill="none" stroke="#e0b173" stroke-width="13" stroke-linecap="round" stroke-dasharray="174 302" transform="rotate(-90 150 188)"/>' +
        txt(150, 192, "۶۲٪", "sv-ink sv-bold", "middle", 20) +
        txt(150, 212, "غذای اصلی", "sv-mut", "middle", 9.5) +
        txt(150, 266, "سهم درآمد هر دسته", "sv-mut", "middle", 10) +
        txt(280, 110, "ساعات شلوغی", "sv-mut", "start", 10) +
        bars(280, 250, 12, 20, 12, heights, 5, 8) +
        txt(280, 275, "۱۲", "sv-mut", "start", 9) +
        txt(596, 275, "۲۳", "sv-mut", "end", 9) +
        rect(280, 300, 316, 40, 8, "sv-surface") +
        txt(296, 325, "پیشنهاد: حذف ۵ آیتم کم‌فروش", "sv-accent", "start", 10) +
        txt(580, 325, "۲۳٪ دورریز کمتر", "sv-mut", "end", 10),
      "داشبورد رستوران"
    );
  }

  function visualFor(p) {
    switch (p.visual) {
      case "chat": return visualChat();
      case "agent": return visualAgent();
      case "restaurant": return visualRestaurant();
      default: return visualGym();
    }
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
          '<span class="case-media">' + visualFor(p) +
            '<span class="case-badge">دمو</span>' +
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
    if (v) v.innerHTML = visualFor(p);

    if (body) {
      body.innerHTML =
        '<div class="modal-block"><h3>مسئله</h3><p>' + p.problem + "</p></div>" +
        '<div class="modal-block"><h3>راهکار</h3><ul class="checks">' +
          p.solution.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
        "</ul></div>" +
        '<div class="modal-metrics">' +
          p.metrics.map(function (m) {
            return '<div class="metric"><b>' + m.value + "</b><span>" + m.label + "</span></div>";
          }).join("") +
        "</div>" +
        '<div class="modal-block"><h3>چه چیزی تغییر می‌کند</h3><ul class="checks">' +
          p.benefits.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
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
        '<p class="chooser-kicker">پیشنهاد</p>' +
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
