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

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
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
  document.querySelectorAll(".faq-item").forEach((item, index) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    const questionId = `faq-question-${index + 1}`;
    const answerId = `faq-answer-${index + 1}`;
    button.setAttribute("id", questionId);
    button.setAttribute("aria-controls", answerId);
    button.setAttribute("aria-expanded", "false");
    answer.setAttribute("id", answerId);
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", questionId);
    answer.setAttribute("aria-hidden", "true");

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item.active").forEach((open) => {
        if (open !== item) {
          const openButton = open.querySelector(".faq-question");
          const openAnswer = open.querySelector(".faq-answer");
          open.classList.remove("active");
          if (openAnswer) {
            openAnswer.style.maxHeight = null;
            openAnswer.setAttribute("aria-hidden", "true");
          }
          if (openButton) {
            openButton.setAttribute("aria-expanded", "false");
          }
        }
      });

      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
        answer.setAttribute("aria-hidden", "true");
        button.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.setAttribute("aria-hidden", "false");
        button.setAttribute("aria-expanded", "true");
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
