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
  // 2. Waitlist form — EmailJS Integration
  // ------------------------------------------------------------------
  var form = document.getElementById('waitlist-form');
  var waitlistSuccess = document.getElementById('waitlist-success');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var userEmailInput = form.querySelector('input[type="email"]');
      var userEmail = userEmailInput ? userEmailInput.value : '';

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      emailjs.send("service_pp9uinh", "template_a7iqhjm", {
          reply_to: userEmail,
          message: "New waitlist signup from: " + userEmail
      })
      .then(function() {
         form.style.display = 'none';
         if (waitlistSuccess) {
           waitlistSuccess.style.display = 'block';
         }
      }, function(error) {
         alert("Oops! Something went wrong. Please try again.");
         submitBtn.innerText = originalBtnText;
         submitBtn.disabled = false;
         console.log("FAILED...", error);
      });
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
