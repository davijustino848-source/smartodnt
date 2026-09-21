const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), { passive: true });

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const imageViewer = document.querySelector('.image-viewer');
const viewerImage = imageViewer?.querySelector('img');
const zoomButton = imageViewer?.querySelector('.viewer-zoom');

document.querySelectorAll('.case-open').forEach((button) => button.addEventListener('click', () => {
  viewerImage.src = button.dataset.full;
  viewerImage.alt = button.dataset.alt;
  imageViewer.showModal();
}));

imageViewer?.querySelector('.viewer-close').addEventListener('click', () => imageViewer.close());
zoomButton?.addEventListener('click', () => {
  const zoomed = imageViewer.classList.toggle('is-zoomed');
  zoomButton.setAttribute('aria-pressed', zoomed);
  zoomButton.textContent = zoomed ? 'Reduzir' : 'Ampliar';
});
imageViewer?.addEventListener('close', () => {
  imageViewer.classList.remove('is-zoomed');
  zoomButton.setAttribute('aria-pressed', 'false');
  zoomButton.textContent = 'Ampliar';
});
