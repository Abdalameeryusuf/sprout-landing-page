/* ====================================================================
   Sprout — landing page interactivity
   Plain ES2017+. No build step. No dependencies.

   Responsibilities:
     1. Mobile nav menu — show/hide top-nav links on small screens.
     2. Waitlist form  — pure-frontend stub: shows inline success state,
        hides the form, stops actually submitting anywhere. The real
        endpoint should be wired into the form's action attribute.
     3. Smooth-scroll polyfill for browsers that ignore CSS smooth-scroll
        (most modern browsers handle it natively via `html { scroll-behavior }`).
   ==================================================================== */

(function () {
  'use strict';

  var STORAGE = {
    theme: 'sprout-theme',
    density: 'sprout-density'
  };

  // ------------------------------------------------------------------
  // 1. Mobile nav menu
  // ------------------------------------------------------------------
  var menuToggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('topnav-links');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close menu on link click
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------------------------------------------------------------------
  // 2. Waitlist form — pure-frontend stub
  // ------------------------------------------------------------------
  var form = document.getElementById('waitlist-form');
  var success = document.getElementById('waitlist-success');
  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailInput = form.querySelector('input[type="email"]');
      var email = (emailInput.value || '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.focus();
        emailInput.setAttribute('aria-invalid', 'true');
        return;
      }
      emailInput.removeAttribute('aria-invalid');

      // TODO: replace with a real Formspree / Mailchimp / Resend endpoint.
      // Until then, just hide the form and show the success state.
      form.style.display = 'none';
      success.classList.add('is-visible');
      // Move focus to the success message for screen readers.
      success.setAttribute('tabindex', '-1');
      success.focus();
    });
  }

  // ------------------------------------------------------------------
  // 3. Smooth scroll fallback (most browsers honour CSS scroll-behavior)
  // ------------------------------------------------------------------
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
})();
