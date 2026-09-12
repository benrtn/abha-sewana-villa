/* ==========================================================================
   Abha Sewana Villa, main.js
   Everything the site needs: header, footer, translations, gallery, menu.
   No build step, no npm. Just this one file.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. SITE DETAILS. Change a phone number or the Booking link here
                         and it updates on all three pages.
     ------------------------------------------------------------------ */
  var SITE = {
    name: 'Abha Sewana Villa',
    nameSinhala: 'අඹ සෙවණ',
    booking: 'https://www.booking.com/Share-Vk42eL',
    email: 'wgsdgamage@gmail.com',
    phones: [
      { label: '+94 71 288 0371', tel: '+94712880371' },
      { label: '+94 77 140 5266', tel: '+94771405266' }
    ],
    address: 'No. 3323, Stage 3, Anuradhapura, Sri Lanka',
    // Leave empty ('') to grey the buttons out again.
    instagram: 'https://www.instagram.com/abhasewanavilla',
    tiktok: 'https://www.tiktok.com/@abha.sewana.villa'
  };

  /* ------------------------------------------------------------------
     2. LANGUAGES. Native names, shown in the header selector.
     ------------------------------------------------------------------ */
  var LANGS = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'si', name: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'zh', name: '中文' },
    { code: 'ru', name: 'Русский' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];
  var CODES = LANGS.map(function (l) { return l.code; });
  var STORAGE_KEY = 'asv-lang';

  // Extra webfonts, loaded only when that script is actually needed.
  var SCRIPT_FONTS = {
    si: 'Noto+Sans+Sinhala:wght@400;500;600',
    ta: 'Noto+Sans+Tamil:wght@400;500;600',
    hi: 'Noto+Sans+Devanagari:wght@400;500;600'
  };

  var defaults = null;   // the original English text, kept so we can switch back
  var current = 'en';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); }
    catch (e) { return null; }
  }

  function page() {
    var f = location.pathname.split('/').pop() || 'index.html';
    return f.replace(/\.html$/, '') || 'index';
  }

  /* ==================================================================
     HEADER
     ================================================================== */
  function headerHTML() {
    var here = page();
    var link = function (href, key, label) {
      var active = (here === href.replace('.html', ''));
      return '<a href="' + href + '" data-i18n="' + key + '"' +
        (active ? ' aria-current="page"' : '') +
        ' class="nav-link' + (active ? ' nav-link-active' : '') + '">' + label + '</a>';
    };

    return '' +
    '<a href="#main" class="skip-link" data-i18n="nav.skip">Skip to content</a>' +
    '<div class="mx-auto max-w-6xl px-5 sm:px-8">' +
      '<div class="flex items-center justify-between gap-4 py-4">' +

        '<a href="index.html" class="group flex items-baseline gap-2.5 shrink-0">' +
          '<span class="font-serif text-lg sm:text-xl leading-none text-forest group-hover:text-clay transition-colors">' + SITE.name + '</span>' +
          '<span class="hidden sm:inline text-sm text-clay/70 font-sinhala leading-none">' + SITE.nameSinhala + '</span>' +
        '</a>' +

        '<div class="flex items-center gap-2 sm:gap-4">' +
          '<nav class="nav-desktop items-center gap-6" aria-label="Main">' +
            link('index.html', 'nav.home', 'Home') +
            link('experiences.html', 'nav.experiences', 'Experiences') +
            link('contact.html', 'nav.contact', 'Contact') +
          '</nav>' +

          langPickerHTML() +

          '<a href="' + SITE.booking + '" target="_blank" rel="noopener"' +
            ' class="book-desktop btn btn-clay text-sm" data-i18n="nav.book">Book on Booking.com</a>' +

          '<button type="button" id="menu-btn" class="icon-btn" aria-expanded="false" aria-controls="mobile-nav">' +
            '<span class="sr-only" data-i18n="nav.menu">Menu</span>' +
            '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">' +
              '<path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +

      '<nav id="mobile-nav" class="hidden pb-4" aria-label="Main">' +
        '<div class="flex flex-col gap-1 border-t border-clay/15 pt-3">' +
          '<a href="index.html" class="mob-link" data-i18n="nav.home">Home</a>' +
          '<a href="experiences.html" class="mob-link" data-i18n="nav.experiences">Experiences</a>' +
          '<a href="contact.html" class="mob-link" data-i18n="nav.contact">Contact</a>' +
        '</div>' +
      '</nav>' +
    '</div>';
  }

  function langPickerHTML() {
    var opts = LANGS.map(function (l) {
      return '<li role="none"><button type="button" role="menuitemradio" data-lang="' + l.code + '"' +
        ' aria-checked="false" class="lang-option' + (l.code === 'si' ? ' font-sinhala' : l.code === 'ta' ? ' font-tamil' : l.code === 'hi' ? ' font-devanagari' : '') + '">' +
        '<span>' + l.name + '</span>' +
        '<svg class="lang-tick" viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg>' +
        '</button></li>';
    }).join('');

    return '' +
    '<div class="relative" id="lang-picker">' +
      '<button type="button" id="lang-btn" class="lang-btn" aria-expanded="false" aria-haspopup="true">' +
        '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
          '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>' +
        '<span class="sr-only" data-i18n="nav.language">Language</span>' +
        '<span id="lang-current" class="hidden sm:inline">English</span>' +
        '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8l5 5 5-5"/></svg>' +
      '</button>' +
      '<ul id="lang-menu" class="lang-menu hidden" role="menu" aria-labelledby="lang-btn">' + opts + '</ul>' +
    '</div>';
  }

  /* ==================================================================
     FOOTER
     ================================================================== */
  function footerHTML() {
    var phones = SITE.phones.map(function (p) {
      return '<a href="tel:' + p.tel + '" class="foot-link">' + p.label + '</a>';
    }).join('');

    var social = function (key, label, url, icon) {
      if (url) {
        return '<a href="' + url + '" target="_blank" rel="noopener" class="social-btn" aria-label="' + label + '">' + icon + '</a>';
      }
      return '<span class="social-btn social-btn-off" title="' + label + '" aria-hidden="true">' + icon + '</span>';
    };

    var ig = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
    var tt = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.4 2.2 1.7 3.6 3.9 3.8v2.5c-1.3.1-2.5-.2-3.8-.9v5.9c0 4.3-3.6 6.9-7 5.6-2.3-.9-3.5-3.2-3.2-5.6.3-2.3 2.3-4.1 4.7-4.2v2.6c-.4.1-.8.2-1.2.4-1.1.5-1.5 1.8-1 2.8.5 1 1.8 1.4 2.8.8.7-.4 1.1-1.1 1.1-2V3h3.7z"/></svg>';

    return '' +
    '<div class="mx-auto max-w-6xl px-5 sm:px-8 py-12 sm:py-16">' +
      '<div class="grid gap-10 sm:gap-12 md:grid-cols-[1.5fr_1fr_1fr]">' +

        '<div>' +
          '<p class="font-serif text-xl text-cream">' + SITE.name + '</p>' +
          '<p class="font-sinhala text-ochre/90 text-sm mt-1">' + SITE.nameSinhala + '</p>' +
          '<p class="mt-4 text-cream/70 text-sm leading-relaxed max-w-xs" data-i18n="footer.blurb">' +
            'A family home in Anuradhapura, open to travellers since 2025. Sriyani cooks every meal herself.' +
          '</p>' +
          '<div class="mt-6">' +
            '<p class="foot-head" data-i18n="footer.follow">Follow us</p>' +
            '<div class="mt-3 flex items-center gap-2.5">' +
              social('instagram', 'Instagram', SITE.instagram, ig) +
              social('tiktok', 'TikTok', SITE.tiktok, tt) +
              (!SITE.instagram && !SITE.tiktok
                ? '<span class="text-cream/45 text-xs" data-i18n="footer.soon">Coming soon</span>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div>' +
          '<p class="foot-head" data-i18n="footer.explore">Explore</p>' +
          '<div class="mt-3 flex flex-col items-start gap-2">' +
            '<a href="index.html" class="foot-link" data-i18n="nav.home">Home</a>' +
            '<a href="experiences.html" class="foot-link" data-i18n="nav.experiences">Experiences</a>' +
            '<a href="contact.html" class="foot-link" data-i18n="nav.contact">Contact</a>' +
          '</div>' +
        '</div>' +

        '<div>' +
          '<p class="foot-head" data-i18n="footer.contact">Contact</p>' +
          '<div class="mt-3 flex flex-col items-start gap-2">' +
            phones +
            '<a href="mailto:' + SITE.email + '" class="foot-link break-all">' + SITE.email + '</a>' +
            '<p class="text-cream/60 text-sm leading-relaxed mt-1">' + SITE.address + '</p>' +
          '</div>' +
          '<a href="' + SITE.booking + '" target="_blank" rel="noopener" class="btn btn-ochre mt-5 text-sm" data-i18n="nav.book">Book on Booking.com</a>' +
          '<p class="mt-3 text-cream/50 text-xs leading-relaxed" data-i18n="footer.bookNote">' +
            'Rooms are booked through Booking.com. Call or email us for questions and to arrange tours.' +
          '</p>' +
        '</div>' +
      '</div>' +

      '<div class="mt-12 pt-6 border-t border-cream/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">' +
        '<p class="text-cream/50 text-xs">© <span id="year"></span> ' + SITE.name + ' · <span data-i18n="footer.rights">All rights reserved.</span></p>' +
        '<p class="text-cream/40 text-xs" data-i18n="footer.made">Anuradhapura, Sri Lanka</p>' +
      '</div>' +
    '</div>';
  }

  /* ==================================================================
     STICKY "BOOK" BAR  (mobile only, all three pages)
     ================================================================== */
  function stickyHTML() {
    return '' +
    '<div class="mx-auto max-w-6xl px-4 py-3">' +
      '<a href="' + SITE.booking + '" target="_blank" rel="noopener" class="btn btn-clay w-full justify-center text-base py-3.5">' +
        '<span data-i18n="nav.book">Book on Booking.com</span>' +
        '<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5"/></svg>' +
      '</a>' +
    '</div>';
  }

  /* ==================================================================
     TRANSLATIONS
     ================================================================== */
  function snapshot() {
    if (defaults) return;
    defaults = {};
    $$('[data-i18n]').forEach(function (el, i) {
      var slot = el.getAttribute('data-i18n-slot');
      if (!slot) { slot = 'n' + i; el.setAttribute('data-i18n-slot', slot); }
      var attr = el.getAttribute('data-i18n-attr');
      defaults[slot] = attr ? el.getAttribute(attr) : el.textContent;
    });
  }

  function applyDict(dict) {
    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      var slot = el.getAttribute('data-i18n-slot');
      var value = dict && Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
      if (value === null || value === '') value = defaults[slot];   // fall back to English
      if (value === undefined) return;
      if (attr) el.setAttribute(attr, value); else el.textContent = value;
    });
  }

  function loadScriptFont(code) {
    var family = SCRIPT_FONTS[code];
    if (!family || document.getElementById('font-' + code)) return;
    var l = document.createElement('link');
    l.id = 'font-' + code;
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + family + '&display=swap';
    document.head.appendChild(l);
  }

  function markPicker(code) {
    var lang = LANGS.filter(function (l) { return l.code === code; })[0] || LANGS[0];
    var label = $('#lang-current');
    if (label) {
      label.textContent = lang.name;
      label.className = 'hidden sm:inline' +
        (code === 'si' ? ' font-sinhala' : code === 'ta' ? ' font-tamil' : code === 'hi' ? ' font-devanagari' : '');
    }
    $$('#lang-menu [data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === code;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.classList.toggle('is-current', on);
    });
  }

  function setLang(code, remember) {
    if (CODES.indexOf(code) === -1) code = 'en';
    current = code;
    document.documentElement.lang = code;
    document.documentElement.setAttribute('data-lang', code);
    if (remember !== false) store(STORAGE_KEY, code);
    markPicker(code);
    loadScriptFont(code);

    if (code === 'en') { applyDict(null); return Promise.resolve(); }

    return fetch('i18n/' + code + '.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (dict) { if (current === code) applyDict(dict); })
      .catch(function () { applyDict(null); });   // any problem: stay in English
  }

  // ?lang=xx  ->  saved choice  ->  browser language  ->  English
  function detectLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && CODES.indexOf(q.toLowerCase()) > -1) return { code: q.toLowerCase(), chosen: true };

    var saved = store(STORAGE_KEY);
    if (saved && CODES.indexOf(saved) > -1) return { code: saved, chosen: true };

    var nav = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
    for (var i = 0; i < nav.length; i++) {
      var base = String(nav[i]).toLowerCase().split('-')[0];
      if (CODES.indexOf(base) > -1) return { code: base, chosen: false };
    }
    return { code: 'en', chosen: false };
  }

  /* ==================================================================
     LIGHTBOX
     ================================================================== */
  var LB = { items: [], index: 0, opener: null, node: null };

  function buildLightbox() {
    var el = document.createElement('div');
    el.id = 'lightbox';
    el.className = 'lb hidden';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.innerHTML = '' +
      '<button type="button" class="lb-close" data-lb="close">' +
        '<span class="sr-only" data-i18n="gallery.close">Close</span>' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '<button type="button" class="lb-nav lb-prev" data-lb="prev">' +
        '<span class="sr-only" data-i18n="gallery.prev">Previous</span>' +
        '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>' +
      '</button>' +
      '<button type="button" class="lb-nav lb-next" data-lb="next">' +
        '<span class="sr-only" data-i18n="gallery.next">Next</span>' +
        '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
      '</button>' +
      '<figure class="lb-figure">' +
        '<img class="lb-img" alt="" />' +
        '<figcaption class="lb-cap"></figcaption>' +
      '</figure>';
    document.body.appendChild(el);
    LB.node = el;

    el.addEventListener('click', function (e) {
      var act = e.target.closest('[data-lb]');
      if (act) {
        var a = act.getAttribute('data-lb');
        if (a === 'close') closeLB();
        if (a === 'prev') step(-1);
        if (a === 'next') step(1);
        return;
      }
      if (!e.target.closest('.lb-figure')) closeLB();
    });

    document.addEventListener('keydown', function (e) {
      if (el.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLB();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') { e.preventDefault(); $('.lb-close', el).focus(); }
    });

    // swipe on touch
    var x0 = null;
    el.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) step(dx > 0 ? -1 : 1);
      x0 = null;
    }, { passive: true });
  }

  // Read the photo straight from the page each time, so a change of
  // language is picked up by the captions too.
  function readItem(trigger) {
    var img = trigger.tagName === 'IMG' ? trigger : $('img', trigger);
    return {
      src: trigger.getAttribute('data-full') || (img && img.getAttribute('src')) || '',
      alt: (img && img.getAttribute('alt')) || '',
      caption: trigger.getAttribute('data-caption') || (img && img.getAttribute('alt')) || ''
    };
  }

  function show(i) {
    var trigger = LB.items[i];
    if (!trigger) return;
    LB.index = i;
    var it = readItem(trigger);
    var img = $('.lb-img', LB.node);
    img.src = it.src;
    img.alt = it.alt;
    $('.lb-cap', LB.node).textContent = it.caption;
    var many = LB.items.length > 1;
    $('.lb-prev', LB.node).hidden = !many;
    $('.lb-next', LB.node).hidden = !many;
  }

  function step(d) { show((LB.index + d + LB.items.length) % LB.items.length); }

  function openLB(group, i, opener) {
    LB.items = group;
    LB.opener = opener;
    LB.node.classList.remove('hidden');
    document.body.classList.add('lb-open');
    show(i);
    $('.lb-close', LB.node).focus();
  }

  function closeLB() {
    LB.node.classList.add('hidden');
    document.body.classList.remove('lb-open');
    $('.lb-img', LB.node).removeAttribute('src');
    if (LB.opener) { LB.opener.focus(); LB.opener = null; }
  }

  function wireLightbox() {
    var triggers = $$('[data-lightbox]');
    if (!triggers.length) return;
    buildLightbox();

    var groups = {};
    triggers.forEach(function (t) {
      var g = t.getAttribute('data-lightbox');
      (groups[g] = groups[g] || []).push(t);
    });

    Object.keys(groups).forEach(function (g) {
      var list = groups[g];
      list.forEach(function (t, i) {
        // A photo that only feeds its room's viewer carries the hidden
        // attribute: it still counts in the group, so the arrows reach it,
        // but it stays out of the tab order and out of the pointer path.
        if (t.hasAttribute('hidden')) return;
        if (t.tagName !== 'BUTTON' && t.tagName !== 'A') {
          t.setAttribute('role', 'button');
          t.setAttribute('tabindex', '0');
        }
        t.classList.add('lb-trigger');
        t.addEventListener('click', function (e) { e.preventDefault(); openLB(list, i, t); });
        t.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLB(list, i, t); }
        });
      });
    });
  }

  /* ==================================================================
     SMALL THINGS
     ================================================================== */
  function wireMenu() {
    var btn = $('#menu-btn'), nav = $('#mobile-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function wireLangPicker() {
    var btn = $('#lang-btn'), menu = $('#lang-menu'), wrap = $('#lang-picker');
    if (!btn || !menu) return;

    var toggle = function (open) {
      menu.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle(menu.classList.contains('hidden'));
    });

    menu.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-lang]');
      if (!opt) return;
      toggle(false);
      btn.focus();
      setLang(opt.getAttribute('data-lang'));
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) toggle(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) { toggle(false); btn.focus(); }
    });
  }

  // If a photo has not been added yet, show a quiet frame instead of a broken icon.
  function wireImageFallback() {
    $$('img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.dataset.failed) return;
        img.dataset.failed = '1';
        img.classList.add('img-missing');
        img.removeAttribute('src');
      });
    });
  }

  // Contact page: the two social buttons. They stay greyed out until the
  // links are filled in at the top of this file.
  function wireSocial() {
    var host = $('#social-buttons');
    if (!host) return;

    var ig = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
    var tt = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.4 2.2 1.7 3.6 3.9 3.8v2.5c-1.3.1-2.5-.2-3.8-.9v5.9c0 4.3-3.6 6.9-7 5.6-2.3-.9-3.5-3.2-3.2-5.6.3-2.3 2.3-4.1 4.7-4.2v2.6c-.4.1-.8.2-1.2.4-1.1.5-1.5 1.8-1 2.8.5 1 1.8 1.4 2.8.8.7-.4 1.1-1.1 1.1-2V3h3.7z"/></svg>';

    var one = function (url, label, icon) {
      if (url) {
        return '<a href="' + url + '" target="_blank" rel="noopener" class="btn btn-ochre">' +
               icon + '<span>' + label + '</span></a>';
      }
      return '<span class="btn btn-ghost opacity-55 cursor-default">' + icon +
             '<span>' + label + '</span></span>';
    };

    host.innerHTML = one(SITE.instagram, 'Instagram', ig) + one(SITE.tiktok, 'TikTok', tt);

    if (!SITE.instagram && !SITE.tiktok) {
      var note = document.createElement('p');
      note.className = 'mt-5 text-cream/50 text-sm w-full';
      note.setAttribute('data-i18n', 'footer.soon');
      note.textContent = 'Coming soon';
      host.appendChild(note);
    }
  }

  function wireReveal() {
    var els = $$('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ==================================================================
     GO
     ================================================================== */
  function init() {
    var header = $('#site-header'), footer = $('#site-footer'), sticky = $('#book-bar');
    if (header) header.innerHTML = headerHTML();
    if (footer) footer.innerHTML = footerHTML();
    if (sticky) sticky.innerHTML = stickyHTML();

    var y = $('#year');
    if (y) y.textContent = new Date().getFullYear();

    wireMenu();
    wireLangPicker();
    wireLightbox();
    wireImageFallback();
    wireSocial();
    wireReveal();

    snapshot();          // remember the English wording first

    // A language picked from ?lang= or already saved is remembered, so it
    // carries across the three pages. One merely guessed from the browser
    // is not, so the guess can still improve later.
    var found = detectLang();
    setLang(found.code, found.chosen);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
