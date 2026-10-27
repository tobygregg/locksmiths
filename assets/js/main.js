/* ─────────────────────────────────────────────────────────────
   Guernsey Locksmiths – site behaviour (no dependencies)
   Header · mobile menu · scroll reveals · services explorer ·
   sticky mobile bar · quote form
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Header shadow once the page scrolls ─────────────────── */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ─────────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); burger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1024) setMenu(false); });
  }

  /* ── Scroll reveals (children of [data-stagger] cascade) ──── */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    group.querySelectorAll(':scope > .reveal').forEach(function (el, i) {
      el.style.setProperty('--d', i * 90 + 'ms');
    });
  });
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── Pause the hero animations while they're off screen ──── */
  var hero = document.getElementById('top');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle('is-paused', !entries[0].isIntersecting);
    }).observe(hero);
  }

  /* ── Services explorer (ARIA tabs) ───────────────────────── */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    // keep the chosen tab in view on the sideways-scrolling phone list
    var row = tab.parentElement.parentElement;
    if (row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: tab.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* "Ask about this" buttons pre-pick the service in the form */
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('[data-service]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (serviceSelect) serviceSelect.value = btn.getAttribute('data-service');
    });
  });

  /* ── Sticky mobile bar: appears once the hero buttons scroll away ── */
  var bar = document.getElementById('mobile-bar');
  var heroCtas = document.getElementById('hero-ctas');
  var contact = document.getElementById('contact');
  if (bar && heroCtas && 'IntersectionObserver' in window) {
    var pastHero = false, atContact = false;
    var update = function () { bar.classList.toggle('is-shown', pastHero && !atContact); };
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    }).observe(heroCtas);
    if (contact) {
      new IntersectionObserver(function (entries) {
        atContact = entries[0].isIntersecting; update();
      }, { threshold: 0.25 }).observe(contact);
    }
  } else if (bar) {
    bar.classList.add('is-shown');
  }

  /* ── Quote form: inline validation + sending state ───────── */
  var form = document.getElementById('quote-form');
  if (form) {
    var rules = {
      name: function (v) { return v.trim().length > 1; },
      phone: function (v) { return v.replace(/[^0-9]/g, '').length >= 6; },
      email: function (v) { return v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      message: function (v) { return v.trim().length > 3; }
    };
    var check = function (field) {
      var rule = rules[field.name];
      if (!rule) return true;
      var ok = rule(field.value);
      field.classList.toggle('is-invalid', !ok);
      field.setAttribute('aria-invalid', String(!ok));
      var err = document.getElementById('e-' + field.name);
      if (err) field.setAttribute('aria-describedby', err.id);
      return ok;
    };
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener('blur', function () { if (field.value) check(field); });
      field.addEventListener('input', function () { if (field.classList.contains('is-invalid')) check(field); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        var field = form.elements[name];
        if (field && !check(field) && !firstBad) firstBad = field;
      });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = form.querySelector('[data-submit]');
      if (btn) {
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-wait');
        var label = btn.querySelector('[data-label]');
        if (label) label.textContent = 'Sending…';
      }
    });
  }

  /* ── Footer year ─────────────────────────────────────────── */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
