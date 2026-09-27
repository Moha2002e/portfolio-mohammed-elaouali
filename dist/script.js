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
  const intro = journey.querySelector('.journey-intro');
  const education = journey.querySelector('.frame-education');
  const experience = journey.querySelector('.frame-experience');
  const tech = journey.querySelectorAll('.scene-tech');
  const captions = {
    education: journey.querySelector('.caption-education'),
    experience: journey.querySelector('.caption-experience'),
    projects: journey.querySelector('.caption-projects')
  };

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: journey,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.15,
      pin: scene,
      invalidateOnRefresh: true
    }
  });

  timeline
    .to(intro, { opacity: 0, y: -70, duration: 0.16 })
    .to(scene, { scale: 1.42, xPercent: 12, yPercent: 3, duration: 0.22 }, '<')
    .to(education, { x: '22vw', y: '9vh', rotate: 0, duration: 0.2 }, '<')
    .to(captions.education, { opacity: 1, y: -8, duration: 0.08 })
    .to(scene, { scale: 1.08, xPercent: -9, yPercent: -2, duration: 0.22 })
    .to(education, { opacity: 0.35, duration: 0.08 }, '<')
    .to(experience, { x: '-16vw', y: '5vh', rotate: 0, duration: 0.2 }, '<')
    .to(tech, { opacity: 1, stagger: 0.06, duration: 0.12 }, '<')
    .to(captions.experience, { opacity: 1, y: -8, duration: 0.08 })
    .to(scene, { scale: 1.24, xPercent: 2, yPercent: 5, duration: 0.22 })
    .to(experience, { opacity: 0.3, duration: 0.08 }, '<')
    .to(captions.projects, { opacity: 1, y: -8, duration: 0.1 })
    .to(scene, { scale: 1, xPercent: 0, yPercent: 0, duration: 0.18 });
}
