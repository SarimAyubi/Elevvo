const THEME_KEY = 'nf_theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

function initTestimonials(root = document) {
  const slider = root.querySelector('.testimonials-slider');
  if (!slider) return;

  const items = Array.from(slider.querySelectorAll('.testimonial'));
  const dots = Array.from(slider.querySelectorAll('.dot'));
  let idx = items.findIndex(i => i.classList.contains('active'));
  if (idx < 0) idx = 0;
  const interval = parseInt(slider.dataset.interval || '5000', 10);
  let timer = null;

  function show(i) {
    items.forEach((it, j) => it.classList.toggle('active', j === i));
    dots.forEach((d, j) => d.classList.toggle('active', j === i));
    idx = i;
  }

  dots.forEach((d, i) => d.addEventListener('click', () => {
    show(i);
    resetTimer();
  }));

  function next() {
    const nextIndex = (idx + 1) % items.length;
    show(nextIndex);
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    if (slider.dataset.autoplay === 'true') {
      timer = setInterval(next, interval);
    }
  }

  // start
  show(idx);
  resetTimer();

  // Pause on hover
  slider.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
  slider.addEventListener('mouseleave', resetTimer);
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme
  initTheme();
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => toggleTheme());
  }

  // Testimonials
  initTestimonials(document);

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Small accessibility improvement for form
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('invalid', () => {
      emailInput.setCustomValidity('Please enter a valid email address');
    });
    emailInput.addEventListener('input', () => {
      emailInput.setCustomValidity('');
    });
  }
});
