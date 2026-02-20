/* ============================================
   Learny — Main JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScroll();
  initFaqAccordion();
  initNavbarScroll();
  initScrollReveal();
});

/* --- Mobile Menu --- */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".navbar-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = (document.querySelector(".navbar")?.offsetHeight || 0) + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    });
  });
}

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const answer = item.querySelector(".faq-answer");
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item.active").forEach((open) => {
        if (open !== item) {
          open.classList.remove("active");
          open.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* --- Navbar Scroll State --- */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  const update = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  // Stagger children inside grid containers
  [".steps-row", ".testimonials-grid", ".pricing-grid", ".faq-list"].forEach((sel) => {
    document.querySelectorAll(sel).forEach((grid) => {
      grid.querySelectorAll(".reveal").forEach((el, i) => {
        el.style.transitionDelay = `${i * 90}ms`;
      });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}
