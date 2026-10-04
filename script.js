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

document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  element.classList.add('reveal-ready');
  revealObserver.observe(element);
});

document.querySelectorAll('.skills-grid .skill-card, .projects-grid .project-card, .formation-grid .formation-card').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
});

const contactForm = document.querySelector('#contact-form');
const formNote = contactForm?.querySelector('.form-note');
const formSubmitButton = contactForm?.querySelector('button[type="submit"]');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  if (formSubmitButton) {
    formSubmitButton.disabled = true;
    formSubmitButton.textContent = 'Envoi en cours…';
  }

  try {
    const response = await fetch('https://formsubmit.co/ajax/mohammedelaouali1@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data,
    });
    if (!response.ok) throw new Error('Envoi échoué');
    const result = await response.json().catch(() => null);
    if (result && String(result.success) === 'false') {
      throw new Error(result.message || 'Envoi échoué');
    }
    contactForm.reset();
    if (formNote) formNote.textContent = 'Message envoyé, merci ! Je réponds rapidement.';
  } catch (error) {
    const subject = `Contact portfolio — ${name || 'nouveau message'}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:mohammedelaouali1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formNote) formNote.textContent = "L'envoi direct a échoué, votre messagerie s'ouvre à la place.";
  } finally {
    if (formSubmitButton) {
      formSubmitButton.disabled = false;
      formSubmitButton.textContent = 'Envoyer le message';
    }
  }
});
