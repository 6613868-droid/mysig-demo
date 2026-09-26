// MYSIG — Baltic dusk concept

// шапка: фон после прокрутки
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// мобильное меню
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  toggle.textContent = open ? 'Закрыть' : 'Меню';
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    header.classList.remove('open');
    toggle.textContent = 'Меню';
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// плавное появление блоков
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// заглушки: если фото на месте — показываем, если нет — оставляем плашку.
// расширение не важно: если .jpg нет, пробуем .png, затем .webp
const EXT_FALLBACKS = ['.png', '.webp'];
document.querySelectorAll('.ph img').forEach((img) => {
  const loaded = () => img.classList.add('loaded');
  let step = 0;
  const fail = () => {
    if (step >= EXT_FALLBACKS.length) { img.remove(); return; }
    const ext = EXT_FALLBACKS[step++];
    img.addEventListener('load', loaded);
    img.src = img.src.replace(/\.(jpg|jpeg|png|webp)$/i, ext);
  };
  if (img.complete) {
    img.naturalWidth > 0 ? loaded() : fail();
  } else {
    img.addEventListener('load', loaded);
    img.addEventListener('error', fail);
  }
});

// форма: пока демо — просто показываем состояние успеха
const form = document.querySelector('#order-form');
const success = document.querySelector('.form-success');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  form.hidden = true;
  success.hidden = false;
});
