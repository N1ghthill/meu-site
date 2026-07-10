document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const menuButton = document.querySelector('.menu-btn');
  const menuIcon = menuButton ? menuButton.querySelector('i') : null;
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const langLinks = Array.from(document.querySelectorAll('.lang-link'));
  const sections = Array.from(document.querySelectorAll('.section-anchor'));
  const sectionByLocale = {
    inicio: 'home',
    softwares: 'software',
    diferenciais: 'advantages',
    apoie: 'support',
    contato: 'contact',
    home: 'inicio',
    software: 'softwares',
    advantages: 'diferenciais',
    support: 'apoie',
    contact: 'contato',
  };

  function getCurrentSectionId() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) {
      return hash.toLowerCase();
    }

    const activeLink = navLinks.find((link) => link.classList.contains('is-active'));
    if (activeLink) {
      const activeHref = activeLink.getAttribute('href') || '';
      if (activeHref.startsWith('#')) {
        return activeHref.slice(1).toLowerCase();
      }
    }

    const firstSection = sections[0];
    return firstSection ? firstSection.id.toLowerCase() : '';
  }

  function mapSectionId(sectionId, targetIsEnglish) {
    if (!sectionId) {
      return '';
    }
    if (targetIsEnglish === isEnglish) {
      return sectionId;
    }
    return sectionByLocale[sectionId] || sectionId;
  }

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

  langLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href) {
        return;
      }

      const targetLang = (link.getAttribute('hreflang') || '').toLowerCase();
      const targetIsEnglish = targetLang.startsWith('en');
      const currentSection = getCurrentSectionId();
      const mappedSection = mapSectionId(currentSection, targetIsEnglish);

      if (!mappedSection || targetIsEnglish === isEnglish) {
        return;
      }

      event.preventDefault();
      const destination = new URL(href, window.location.origin);
      destination.hash = mappedSection;
      window.location.assign(destination.toString());
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

  const softwareMediaBlocks = Array.from(document.querySelectorAll('.software-media'));

  function normalizeAssetPath(src) {
    if (!src) {
      return '';
    }
    try {
      return new URL(src, window.location.href).pathname;
    } catch {
      return src;
    }
  }

  function isActionKey(event) {
    return event.key === 'Enter' || event.key === ' ';
  }

  function collectGalleryItems(media) {
    const mainShot = media.querySelector('.software-main-shot');
    const thumbs = Array.from(media.querySelectorAll('.software-thumbs img'));
    const items = [];
    const seen = new Set();

    function appendItem(img, fallbackAlt = '') {
      if (!img) {
        return;
      }
      if (img.closest('[data-media-type="video"]')) {
        return;
      }
      const src = img.getAttribute('src');
      if (!src) {
        return;
      }
      const normalized = normalizeAssetPath(src);
      if (seen.has(normalized)) {
        return;
      }
      seen.add(normalized);
      items.push({
        src,
        alt: img.getAttribute('alt') || fallbackAlt,
      });
    }

    appendItem(mainShot);
    thumbs.forEach((thumb) => appendItem(thumb, mainShot ? (mainShot.getAttribute('alt') || '') : ''));
    return items;
  }

  softwareMediaBlocks.forEach((media, mediaIndex) => {
    const mainShot = media.querySelector('.software-main-shot');
    const videoFrame = media.querySelector('.software-video');
    const thumbsContainer = media.querySelector('.software-thumbs');
    if ((!mainShot && !videoFrame) || !thumbsContainer) {
      return;
    }

    let thumbs = Array.from(thumbsContainer.children).filter((thumb) => thumb.matches('img, button'));
    if (!thumbs.length) {
      return;
    }

    if (!mainShot && videoFrame) {
      const frameId = `software-main-shot-${mediaIndex + 1}`;
      const defaultVideoHtml = videoFrame.innerHTML;
      const defaultVideoLabel = videoFrame.getAttribute('aria-label') || '';
      const videoTitle = videoFrame.dataset.videoTitle || defaultVideoLabel;
      const videoSrc = videoFrame.dataset.videoSrc || '';
      const videoThumb = thumbs.find((thumb) => thumb.dataset.mediaType === 'video') || null;

      function getThumbImage(thumb) {
        return thumb.matches('img') ? thumb : thumb.querySelector('img');
      }

      function getThumbSrc(thumb) {
        const thumbImage = getThumbImage(thumb);
        return thumbImage ? thumbImage.getAttribute('src') : '';
      }

      function getThumbAlt(thumb) {
        const thumbImage = getThumbImage(thumb);
        return thumbImage ? (thumbImage.getAttribute('alt') || '') : '';
      }

      function setThumbState(activeThumb) {
        let screenshotIndex = 0;
        thumbs.forEach((thumb, thumbIndex) => {
          const isActive = thumb === activeThumb;
          const isVideoThumb = thumb.dataset.mediaType === 'video';
          if (!isVideoThumb) {
            screenshotIndex += 1;
          }
          thumb.classList.toggle('is-active', isActive);
          thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');
          thumb.setAttribute('tabindex', activeThumb ? (isActive ? '0' : '-1') : (thumbIndex === 0 ? '0' : '-1'));
          thumb.setAttribute(
            'aria-label',
            isVideoThumb
              ? (isEnglish ? 'View video demo' : 'Ver demo em vídeo')
              : (isEnglish ? `View screenshot ${screenshotIndex}` : `Ver screenshot ${screenshotIndex}`)
          );
        });
      }

      function loadVideoFrame() {
        if (!videoSrc) {
          return;
        }
        videoFrame.classList.add('is-switching');
        videoFrame.innerHTML = `
          <iframe
            src="${videoSrc}"
            title="${videoTitle}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        `;
        videoFrame.setAttribute('aria-label', defaultVideoLabel);
        setThumbState(videoThumb);
        requestAnimationFrame(() => {
          videoFrame.classList.remove('is-switching');
        });
      }

      function bindVideoPoster() {
        const posterButton = videoFrame.querySelector('.software-video-poster');
        if (!posterButton) {
          return;
        }
        posterButton.addEventListener('click', loadVideoFrame);
      }

      function restoreVideoFrame() {
        videoFrame.classList.add('is-switching');
        videoFrame.innerHTML = defaultVideoHtml;
        videoFrame.setAttribute('aria-label', defaultVideoLabel);
        videoFrame.removeAttribute('role');
        videoFrame.removeAttribute('tabindex');
        bindVideoPoster();
        setThumbState(videoThumb);
        requestAnimationFrame(() => {
          videoFrame.classList.remove('is-switching');
        });
      }

      function showScreenshotInFrame(targetThumb) {
        if (targetThumb.dataset.mediaType === 'video') {
          restoreVideoFrame();
          return;
        }

        const nextSrc = getThumbSrc(targetThumb);
        if (!nextSrc) {
          return;
        }

        const nextAlt = getThumbAlt(targetThumb);
        videoFrame.classList.add('is-switching');

        const preload = new Image();
        preload.decoding = 'async';
        preload.src = nextSrc;

        const commit = () => {
          const preview = document.createElement('img');
          preview.className = 'software-video-shot';
          preview.src = nextSrc;
          preview.alt = nextAlt;
          preview.width = 1920;
          preview.height = 1080;
          preview.decoding = 'async';
          preview.setAttribute('role', 'button');
          preview.setAttribute('tabindex', '0');
          preview.setAttribute(
            'aria-label',
            isEnglish ? 'Open screenshot preview' : 'Abrir visualizacao da screenshot'
          );

          preview.addEventListener('click', () => {
            openLightbox(media, nextSrc, preview);
          });

          preview.addEventListener('keydown', (event) => {
            if (!isActionKey(event)) {
              return;
            }
            event.preventDefault();
            openLightbox(media, nextSrc, preview);
          });

          videoFrame.innerHTML = '';
          videoFrame.appendChild(preview);
          videoFrame.setAttribute('aria-label', nextAlt);
          setThumbState(targetThumb);
          requestAnimationFrame(() => {
            videoFrame.classList.remove('is-switching');
          });
        };

        if (preload.complete) {
          commit();
          return;
        }

        preload.addEventListener('load', commit, { once: true });
        preload.addEventListener('error', commit, { once: true });
      }

      thumbs.forEach((thumb) => {
        if (!thumb.matches('button')) {
          thumb.setAttribute('role', 'button');
        }
        thumb.setAttribute('aria-controls', frameId);

        thumb.addEventListener('click', () => {
          showScreenshotInFrame(thumb);
        });

        thumb.addEventListener('keydown', (event) => {
          if (isActionKey(event)) {
            event.preventDefault();
            showScreenshotInFrame(thumb);
            return;
          }

          const currentIndex = thumbs.indexOf(thumb);
          if (currentIndex === -1) {
            return;
          }

          let nextIndex = -1;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % thumbs.length;
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
          } else if (event.key === 'Home') {
            nextIndex = 0;
          } else if (event.key === 'End') {
            nextIndex = thumbs.length - 1;
          }

          if (nextIndex >= 0) {
            event.preventDefault();
            const nextThumb = thumbs[nextIndex];
            showScreenshotInFrame(nextThumb);
            nextThumb.focus();
          }
        });
      });

      videoFrame.setAttribute('id', frameId);
      bindVideoPoster();
      setThumbState(videoThumb);
      return;
    }

    const defaultMainSrc = mainShot.getAttribute('src') || '';
    const defaultMainAlt = mainShot.getAttribute('alt') || '';
    const mainSrcPath = normalizeAssetPath(defaultMainSrc);
    const hasCurrentMainAsThumb = thumbs.some((thumb) => normalizeAssetPath(thumb.getAttribute('src')) === mainSrcPath);

    function setThumbState(activeThumb) {
      thumbs.forEach((thumb, thumbIndex) => {
        const isActive = thumb === activeThumb;
        thumb.classList.toggle('is-active', isActive);
        thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');
        const tabIndex = activeThumb ? (isActive ? '0' : '-1') : (thumbIndex === 0 ? '0' : '-1');
        thumb.setAttribute('tabindex', tabIndex);
        thumb.setAttribute(
          'aria-label',
          isEnglish
            ? `View screenshot ${thumbIndex + 1}`
            : `Ver screenshot ${thumbIndex + 1}`
        );
      });
    }

    function swapMainImage(targetThumb) {
      const nextSrc = targetThumb.getAttribute('src');
      if (!nextSrc) {
        return;
      }

      const nextAlt = targetThumb.getAttribute('alt') || mainShot.getAttribute('alt') || '';
      const currentPath = normalizeAssetPath(mainShot.getAttribute('src'));
      const nextPath = normalizeAssetPath(nextSrc);
      const isTargetActive = targetThumb.classList.contains('is-active');

      if (isTargetActive && normalizeAssetPath(defaultMainSrc) !== currentPath) {
        mainShot.classList.add('is-switching');
        mainShot.setAttribute('src', defaultMainSrc);
        mainShot.setAttribute('alt', defaultMainAlt);
        setThumbState(null);
        requestAnimationFrame(() => {
          mainShot.classList.remove('is-switching');
        });
        return;
      }

      if (currentPath === nextPath && mainShot.getAttribute('alt') === nextAlt) {
        setThumbState(targetThumb);
        return;
      }

      mainShot.classList.add('is-switching');

      const preload = new Image();
      preload.decoding = 'async';
      preload.src = nextSrc;

      const commit = () => {
        mainShot.setAttribute('src', nextSrc);
        mainShot.setAttribute('alt', nextAlt);
        setThumbState(targetThumb);
        requestAnimationFrame(() => {
          mainShot.classList.remove('is-switching');
        });
      };

      if (preload.complete) {
        commit();
        return;
      }

      preload.addEventListener('load', commit, { once: true });
      preload.addEventListener('error', commit, { once: true });
    }

    thumbs.forEach((thumb) => {
      thumb.setAttribute('role', 'button');
      thumb.setAttribute('aria-controls', `software-main-shot-${mediaIndex + 1}`);

      thumb.addEventListener('click', () => {
        swapMainImage(thumb);
      });

      thumb.addEventListener('keydown', (event) => {
        if (isActionKey(event)) {
          event.preventDefault();
          swapMainImage(thumb);
          return;
        }

        const currentIndex = thumbs.indexOf(thumb);
        if (currentIndex === -1) {
          return;
        }

        let nextIndex = -1;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % thumbs.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = thumbs.length - 1;
        }

        if (nextIndex >= 0) {
          event.preventDefault();
          const nextThumb = thumbs[nextIndex];
          swapMainImage(nextThumb);
          nextThumb.focus();
        }
      });
    });

    mainShot.setAttribute('id', `software-main-shot-${mediaIndex + 1}`);
    const initialActiveThumb = hasCurrentMainAsThumb
      ? (thumbs.find((thumb) => normalizeAssetPath(thumb.getAttribute('src')) === mainSrcPath) || null)
      : null;
    setThumbState(initialActiveThumb);

    mainShot.setAttribute('role', 'button');
    mainShot.setAttribute('tabindex', '0');
    mainShot.setAttribute(
      'aria-label',
      isEnglish ? 'Open screenshot preview' : 'Abrir visualizacao da screenshot'
    );

    mainShot.addEventListener('click', () => {
      openLightbox(media, mainShot.getAttribute('src') || defaultMainSrc, mainShot);
    });

    mainShot.addEventListener('keydown', (event) => {
      if (!isActionKey(event)) {
        return;
      }
      event.preventDefault();
      openLightbox(media, mainShot.getAttribute('src') || defaultMainSrc, mainShot);
    });
  });

  const lightbox = document.createElement('div');
  lightbox.className = 'shot-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="shot-lightbox-backdrop" data-lightbox-close></div>
    <div class="shot-lightbox-dialog" role="dialog" aria-modal="true" aria-label="${isEnglish ? 'Software screenshot preview' : 'Visualizacao de screenshot'}">
      <button type="button" class="shot-lightbox-close" aria-label="${isEnglish ? 'Close preview' : 'Fechar visualizacao'}">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button type="button" class="shot-lightbox-nav shot-lightbox-prev" aria-label="${isEnglish ? 'Previous screenshot' : 'Screenshot anterior'}">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <img class="shot-lightbox-image" src="" alt="">
      <button type="button" class="shot-lightbox-nav shot-lightbox-next" aria-label="${isEnglish ? 'Next screenshot' : 'Proxima screenshot'}">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <p class="shot-lightbox-caption"></p>
    </div>
  `;
  body.appendChild(lightbox);

  const lightboxBackdrop = lightbox.querySelector('.shot-lightbox-backdrop');
  const lightboxClose = lightbox.querySelector('.shot-lightbox-close');
  const lightboxPrev = lightbox.querySelector('.shot-lightbox-prev');
  const lightboxNext = lightbox.querySelector('.shot-lightbox-next');
  const lightboxImage = lightbox.querySelector('.shot-lightbox-image');
  const lightboxCaption = lightbox.querySelector('.shot-lightbox-caption');

  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxTrigger = null;
  let swipeTracking = false;
  let swipeStartX = 0;
  let swipeStartY = 0;
  let swipePointerId = null;
  const swipeThreshold = 52;
  const swipeAxisRatio = 1.25;

  function isLightboxOpen() {
    return lightbox.classList.contains('open');
  }

  function syncBodyOverflow() {
    const supportOpen = Boolean(modal && modal.classList.contains('open'));
    body.style.overflow = supportOpen || isLightboxOpen() ? 'hidden' : '';
  }

  function renderLightbox() {
    if (!lightboxImage || !lightboxItems.length) {
      return;
    }
    const item = lightboxItems[lightboxIndex];
    const hasMultiple = lightboxItems.length > 1;
    lightboxImage.setAttribute('src', item.src);
    lightboxImage.setAttribute('alt', item.alt || '');
    if (lightboxCaption) {
      lightboxCaption.textContent = item.alt || '';
    }
    if (lightboxPrev) {
      lightboxPrev.disabled = !hasMultiple;
    }
    if (lightboxNext) {
      lightboxNext.disabled = !hasMultiple;
    }
  }

  function showPrevLightboxImage() {
    if (lightboxItems.length < 2) {
      return;
    }
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  }

  function showNextLightboxImage() {
    if (lightboxItems.length < 2) {
      return;
    }
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    renderLightbox();
  }

  function resetSwipe() {
    swipeTracking = false;
    swipePointerId = null;
    swipeStartX = 0;
    swipeStartY = 0;
  }

  function startSwipe(x, y, pointerId = null) {
    if (!isLightboxOpen() || lightboxItems.length < 2) {
      resetSwipe();
      return;
    }
    swipeTracking = true;
    swipeStartX = x;
    swipeStartY = y;
    swipePointerId = pointerId;
  }

  function endSwipe(x, y, pointerId = null) {
    if (!swipeTracking) {
      return;
    }
    if (swipePointerId !== null && pointerId !== null && swipePointerId !== pointerId) {
      return;
    }

    const deltaX = x - swipeStartX;
    const deltaY = y - swipeStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX >= swipeThreshold && absX > absY * swipeAxisRatio) {
      if (deltaX > 0) {
        showPrevLightboxImage();
      } else {
        showNextLightboxImage();
      }
    }

    resetSwipe();
  }

  function closeLightbox() {
    if (!isLightboxOpen()) {
      return false;
    }
    resetSwipe();
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    syncBodyOverflow();
    if (lightboxTrigger && typeof lightboxTrigger.focus === 'function') {
      lightboxTrigger.focus();
    }
    return true;
  }

  function openLightbox(media, preferredSrc, trigger) {
    lightboxItems = collectGalleryItems(media);
    if (!lightboxItems.length || !lightboxImage) {
      return;
    }

    const preferredPath = normalizeAssetPath(preferredSrc);
    const matchedIndex = lightboxItems.findIndex((item) => normalizeAssetPath(item.src) === preferredPath);
    lightboxIndex = matchedIndex >= 0 ? matchedIndex : 0;
    lightboxTrigger = trigger || null;

    renderLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    syncBodyOverflow();
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevLightboxImage);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextLightboxImage);
  }

  if (lightboxImage) {
    lightboxImage.setAttribute('draggable', 'false');

    if (window.PointerEvent) {
      lightboxImage.addEventListener('pointerdown', (event) => {
        if (event.pointerType !== 'touch') {
          return;
        }
        event.preventDefault();
        startSwipe(event.clientX, event.clientY, event.pointerId);
      });

      lightboxImage.addEventListener('pointerup', (event) => {
        if (event.pointerType !== 'touch') {
          return;
        }
        endSwipe(event.clientX, event.clientY, event.pointerId);
      });

      lightboxImage.addEventListener('pointercancel', resetSwipe);
    } else {
      lightboxImage.addEventListener(
        'touchstart',
        (event) => {
          const touch = event.changedTouches[0];
          if (!touch) {
            return;
          }
          startSwipe(touch.clientX, touch.clientY, touch.identifier);
        },
        { passive: true }
      );

      lightboxImage.addEventListener(
        'touchend',
        (event) => {
          const touch = event.changedTouches[0];
          if (!touch) {
            resetSwipe();
            return;
          }
          endSwipe(touch.clientX, touch.clientY, touch.identifier);
        },
        { passive: true }
      );

      lightboxImage.addEventListener('touchcancel', resetSwipe, { passive: true });
    }
  }

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
    syncBodyOverflow();
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
    syncBodyOverflow();
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
        : 'Não foi possível copiar automaticamente. Copie manualmente.');
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
      if (closeLightbox()) {
        event.preventDefault();
        return;
      }
      closeModal();
      return;
    }

    if (!isLightboxOpen()) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevLightboxImage();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNextLightboxImage();
    }
  });
});
