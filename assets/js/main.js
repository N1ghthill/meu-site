document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const menuButton = document.querySelector('.menu-btn');
  const menuIcon = menuButton ? menuButton.querySelector('i') : null;
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = Array.from(document.querySelectorAll('.section-anchor'));

  function closeMenu() {
    if (!navLinksContainer || !menuButton || !menuIcon) {
      return;
    }
    navLinksContainer.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  }

  if (menuButton && navLinksContainer && menuIcon) {
    menuButton.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuIcon.classList.toggle('fa-bars', !isOpen);
      menuIcon.classList.toggle('fa-xmark', isOpen);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 86;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!navLinksContainer || !menuButton) {
      return;
    }
    if (!navLinksContainer.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const id = entry.target.getAttribute('id');
        if (!id) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { threshold: 0.4, rootMargin: '-10% 0px -35% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 45, 280)}ms`;
    revealObserver.observe(element);
  });

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  const supportSection = document.getElementById('apoie') || document.getElementById('support');
  const pixButton = document.querySelector('.support-pix-btn');
  const modal = document.querySelector('.support-modal');
  const modalBackdrop = document.querySelector('.support-modal-backdrop');
  const modalCloseButton = document.querySelector('.support-modal-close');
  const pixKeyTarget = document.querySelector('[data-pix-key-text]');
  const copyButton = document.querySelector('.support-copy-btn');
  const copyFeedback = document.querySelector('.support-copy-feedback');

  const pixKey = supportSection ? (supportSection.dataset.pixKey || '').trim() : '';

  if (!pixKey && pixButton) {
    pixButton.remove();
  }

  if (pixKeyTarget && pixKey) {
    pixKeyTarget.textContent = pixKey;
  }

  function openModal() {
    if (!modal || !pixKey) {
      return;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    if (copyFeedback) {
      copyFeedback.textContent = '';
    }
  }

  function closeModal() {
    if (!modal) {
      return;
    }
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }

  async function copyPixKey() {
    if (!pixKey || !copyFeedback) {
      return;
    }

    let copied = false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(pixKey);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      const temp = document.createElement('textarea');
      temp.value = pixKey;
      temp.setAttribute('readonly', '');
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      copied = document.execCommand('copy');
      document.body.removeChild(temp);
    }

    copyFeedback.textContent = copied
      ? (isEnglish ? 'Pix key copied successfully.' : 'Chave Pix copiada com sucesso.')
      : (isEnglish
        ? 'Unable to copy automatically. Please copy it manually.'
        : 'Nao foi possivel copiar automaticamente. Copie manualmente.');
  }

  if (pixButton) {
    pixButton.addEventListener('click', openModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeModal);
  }

  if (copyButton) {
    copyButton.addEventListener('click', copyPixKey);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});
