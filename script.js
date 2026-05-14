/* ═══════════════════════════════════════════════════════════
   SUCHY — PORTFOLIO  |  script.js
   ═══════════════════════════════════════════════════════════ */

/* ── AOS Init ─────────────────────────────────────────────── */
// Remove the safety fallback override so AOS can animate properly
const aosFallback = document.querySelector('style');
if (aosFallback && aosFallback.textContent.includes('[data-aos]')) {
  aosFallback.remove();
}

AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

/* ── Year ─────────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Progress Bar ─────────────────────────────────────────── */
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${pct}%`;
});

/* ── Navbar scroll class ──────────────────────────────────── */
const navbar = document.getElementById('navbar');

const handleNavScroll = () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

/* ── Hamburger menu ───────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

/* ── Smooth scroll for anchor links ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 68; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── GSAP Hero entrance (safe: fromTo never leaves elements invisible) ── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  const heroEls = [
    { sel: '.hero-eyebrow',    delay: 0.1 },
    { sel: '.hero-name',       delay: 0.25 },
    { sel: '.hero-title',      delay: 0.4 },
    { sel: '.hero-desc',       delay: 0.55 },
    { sel: '.hero-cta',        delay: 0.7 },
    { sel: '.hero-scroll-hint',delay: 1.0 },
  ];

  heroEls.forEach(({ sel, delay }) => {
    gsap.fromTo(sel,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, delay, ease: 'power3.out' }
    );
  });
});

/* ── Active nav link on scroll ───────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

/* Add active style via CSS class */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: #fff; } .nav-links a.active::after { width: 100% !important; }`;
document.head.appendChild(style);

/* ── Skill pill hover stagger ─────────────────────────────── */
document.querySelectorAll('.skill-category').forEach(cat => {
  const pills = cat.querySelectorAll('.pill');
  pills.forEach((pill, i) => {
    pill.style.transitionDelay = `${i * 30}ms`;
  });
});