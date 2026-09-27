const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const journey = document.querySelector('.journey');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (journey && window.gsap && window.ScrollTrigger && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const scene = journey.querySelector('.journey-scene');
  const notes = gsap.utils.toArray('.scene-note', journey);
  const frames = gsap.utils.toArray('.scene-frame', journey);
  const tech = gsap.utils.toArray('.scene-tech', journey);
  const captions = gsap.utils.toArray('.scene-caption', journey);

  gsap.set(notes.slice(1), { opacity: 0 });

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: journey,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.3,
      pin: scene,
      invalidateOnRefresh: true
    }
  });

  timeline
    .to(notes[0], { opacity: 1, scale: 1, rotate: -6, duration: 0.12 })
    .to(scene, { scale: 1.08, xPercent: 3, duration: 0.1 })
    .to(notes[1], { opacity: 1, scale: 1, rotate: 5, duration: 0.12 })
    .to(scene, { scale: 1.18, xPercent: -4, yPercent: 2, duration: 0.1 })
    .to(notes[2], { opacity: 1, scale: 1, rotate: -3, duration: 0.12 })
    .to(frames[0], { opacity: 0.18, scale: 1.1, duration: 0.08 }, '<')
    .to(scene, { scale: 1.12, xPercent: 5, yPercent: -2, duration: 0.1 })
    .to(notes[3], { opacity: 1, scale: 1, rotate: 4, duration: 0.12 })
    .to(tech, { opacity: 1, stagger: 0.04, duration: 0.1 }, '<')
    .to(frames[1], { opacity: 0.18, scale: 1.1, duration: 0.08 }, '<')
    .to(scene, { scale: 1.2, xPercent: -3, yPercent: 3, duration: 0.1 })
    .to(notes[4], { opacity: 1, scale: 1, rotate: -5, duration: 0.12 })
    .to(scene, { scale: 1.1, xPercent: 2, duration: 0.1 })
    .to(notes[5], { opacity: 1, scale: 1, rotate: 3, duration: 0.12 })
    .to(captions, { opacity: 0, duration: 0.06 }, '<')
    .to(scene, { scale: 1.18, xPercent: -2, yPercent: -2, duration: 0.1 })
    .to(notes[6], { opacity: 1, scale: 1, rotate: -4, duration: 0.12 })
    .to(scene, { scale: 1, xPercent: 0, yPercent: 0, duration: 0.14 });
}
