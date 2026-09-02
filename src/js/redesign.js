(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const listenForMediaChange = (mediaQuery, listener) => {
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(listener);
    }
  };

  function finishLoading() {
    const loadingScreen = document.querySelector('.loading-screen');

    window.setTimeout(() => {
      document.body.classList.add('is-ready');

      if (!loadingScreen) return;
      loadingScreen.classList.add('fade-out');

      window.setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 850);
    }, prefersReducedMotion ? 80 : 950);
  }

  function initMotionReveals() {
    const hero = document.querySelector('.hero-minimal');
    const targets = [...document.querySelectorAll('.motion-reveal')].filter((element) => !hero?.contains(element));

    if (!targets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    });

    targets.forEach((element) => observer.observe(element));
  }

  function initProjectFilters() {
    const buttons = [...document.querySelectorAll('.project-filter')];
    const cards = [...document.querySelectorAll('.project-card[data-category]')];
    const grid = document.querySelector('[data-project-grid]');
    const label = document.querySelector('[data-project-label]');
    const count = document.querySelector('[data-project-count]');
    const indicator = document.querySelector('.project-filter__active');
    const expandWrap = document.querySelector('[data-project-expand-wrap]');
    const expandButton = document.querySelector('[data-project-expand]');
    const moreCount = document.querySelector('[data-project-more-count]');

    if (!buttons.length || !cards.length || !grid) return;

    const labels = {
      pt: {
        featured: 'Destaques',
        web: 'Web',
        games: 'Jogos',
        experiment: 'Experimentos'
      },
      en: {
        featured: 'Featured',
        web: 'Web',
        games: 'Games',
        experiment: 'Experiments'
      }
    };
    const filterOrder = ['web', 'games', 'featured', 'experiment'];
    const visibleLimit = 4;
    const expandedFilters = new Set();
    let currentFilter = 'web';
    let isTransitioning = false;

    const updateIndicator = (button) => {
      if (!indicator || !button) return;

      indicator.style.width = `${button.offsetWidth}px`;
      indicator.style.height = `${button.offsetHeight}px`;
      indicator.style.transform = `translate3d(${button.offsetLeft}px, ${button.offsetTop}px, 0)`;
      indicator.classList.add('is-ready');
    };

    const updateButtons = (filter) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));

        if (isActive) {
          window.requestAnimationFrame(() => updateIndicator(button));
        }
      });
    };

    const renderFilter = (filter) => {
      const matchingCards = cards.filter((card) => card.dataset.category.split(' ').includes(filter));
      const isExpanded = expandedFilters.has(filter);
      const visibleCards = isExpanded ? matchingCards : matchingCards.slice(0, visibleLimit);
      const visibleSet = new Set(visibleCards);

      cards.forEach((card, index) => {
        const shouldShow = visibleSet.has(card);

        card.hidden = !shouldShow;
        card.classList.remove('filter-enter');

        if (!shouldShow) return;

        card.classList.add('is-visible');
        card.style.setProperty('--filter-delay', `${Math.min(index * 55, 220)}ms`);

        if (!prefersReducedMotion) {
          window.requestAnimationFrame(() => card.classList.add('filter-enter'));
        }
      });

      const language = document.documentElement.dataset.language === 'en' ? 'en' : 'pt';
      if (label) label.textContent = labels[language][filter] || (language === 'en' ? 'Projects' : 'Projetos');
      if (count) count.textContent = String(matchingCards.length);

      const remaining = Math.max(0, matchingCards.length - visibleCards.length);
      if (moreCount) moreCount.textContent = String(remaining);
      if (expandWrap) expandWrap.hidden = remaining === 0;
    };

    const selectFilter = (filter, animate = true) => {
      if (!labels.pt[filter] || isTransitioning) return;

      updateButtons(filter);
      const previousIndex = filterOrder.indexOf(currentFilter);
      const nextIndex = filterOrder.indexOf(filter);
      const direction = nextIndex >= previousIndex ? 1 : -1;
      const commit = () => {
        renderFilter(filter);
        currentFilter = filter;
      };

      if (!animate || prefersReducedMotion || filter === currentFilter) {
        commit();
        return;
      }

      isTransitioning = true;
      grid.style.setProperty('--project-exit-y', `${direction * -30}px`);
      grid.style.setProperty('--project-entry-y', `${direction * 30}px`);
      grid.classList.add('is-switching-out');
      label?.classList.add('is-switching');

      window.setTimeout(() => {
        commit();
        grid.classList.remove('is-switching-out');
        grid.classList.add('is-switching-in');
        void grid.offsetHeight;
        grid.classList.remove('is-switching-in');
        label?.classList.remove('is-switching');

        window.setTimeout(() => {
          isTransitioning = false;
        }, 360);
      }, 210);
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => selectFilter(button.dataset.filter));
    });

    expandButton?.addEventListener('click', () => {
      expandedFilters.add(currentFilter);
      renderFilter(currentFilter);
    });

    window.addEventListener('resize', () => {
      updateIndicator(buttons.find((button) => button.classList.contains('is-active')));
    });

    document.addEventListener('site-language-change', () => {
      renderFilter(currentFilter);
      window.requestAnimationFrame(() => {
        updateIndicator(buttons.find((button) => button.classList.contains('is-active')));
      });
    });

    selectFilter('web', false);
  }

  function initProjectLightbox() {
    const triggers = [...document.querySelectorAll('.project-card__visual')];

    if (!triggers.length) return;

    const lightbox = document.createElement('dialog');
    lightbox.className = 'project-lightbox';
    lightbox.id = 'project-lightbox';
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-labelledby', 'project-lightbox-title');
    lightbox.innerHTML = `
      <div class="project-lightbox__surface">
        <button class="project-lightbox__close" type="button" data-project-lightbox-close>
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <div class="project-lightbox__layout">
          <figure class="project-lightbox__media">
            <img class="project-lightbox__image" src="" alt="" />
            <div class="project-lightbox__gallery" data-project-lightbox-gallery hidden>
              <button class="project-lightbox__gallery-button project-lightbox__gallery-button--previous" type="button" data-project-gallery-previous>
                <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
              </button>
              <div class="project-lightbox__gallery-pagination" data-project-gallery-pagination></div>
              <span class="visually-hidden" aria-live="polite" aria-atomic="true" data-project-gallery-status></span>
              <button class="project-lightbox__gallery-button project-lightbox__gallery-button--next" type="button" data-project-gallery-next>
                <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>
          </figure>
          <section class="project-lightbox__panel">
            <div class="project-lightbox__copy">
              <span class="project-lightbox__eyebrow"></span>
              <h2 class="project-lightbox__title" id="project-lightbox-title"></h2>
              <p class="project-lightbox__description"></p>
            </div>
            <div class="project-lightbox__actions">
              <a data-project-lightbox-source target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-github" aria-hidden="true"></i><span></span>
              </a>
              <a data-project-lightbox-site target="_blank" rel="noopener noreferrer">
                <span></span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </section>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.project-lightbox__image');
    const lightboxEyebrow = lightbox.querySelector('.project-lightbox__eyebrow');
    const lightboxTitle = lightbox.querySelector('.project-lightbox__title');
    const lightboxDescription = lightbox.querySelector('.project-lightbox__description');
    const closeButton = lightbox.querySelector('[data-project-lightbox-close]');
    const sourceLink = lightbox.querySelector('[data-project-lightbox-source]');
    const siteLink = lightbox.querySelector('[data-project-lightbox-site]');
    const galleryControls = lightbox.querySelector('[data-project-lightbox-gallery]');
    const galleryPagination = lightbox.querySelector('[data-project-gallery-pagination]');
    const galleryStatus = lightbox.querySelector('[data-project-gallery-status]');
    const previousImageButton = lightbox.querySelector('[data-project-gallery-previous]');
    const nextImageButton = lightbox.querySelector('[data-project-gallery-next]');
    let lastTrigger = null;
    let galleryImages = [];
    let galleryAlts = [];
    let galleryIndex = 0;

    const copy = () => {
      const isEnglish = document.documentElement.dataset.language === 'en';
      return {
        enlarge: isEnglish ? 'Enlarge image' : 'Ampliar imagem',
        close: isEnglish ? 'Close image' : 'Fechar imagem',
        previous: isEnglish ? 'Previous image' : 'Imagem anterior',
        next: isEnglish ? 'Next image' : 'Próxima imagem',
        gallery: isEnglish ? 'Project images' : 'Imagens do projeto',
        goTo: isEnglish ? 'Go to image' : 'Ir para a imagem',
        of: isEnglish ? 'of' : 'de',
        source: isEnglish ? 'Source' : 'Código',
        project: isEnglish ? 'Live project' : 'Ver projeto',
        eyebrow: isEnglish ? 'Selected project' : 'Projeto selecionado'
      };
    };

    const renderGalleryPagination = () => {
      const labels = copy();
      galleryPagination.setAttribute('role', 'group');
      galleryPagination.setAttribute('aria-label', labels.gallery);
      galleryPagination.replaceChildren(
        ...galleryImages.map((_, index) => {
          const indicator = document.createElement('button');
          indicator.className = 'project-lightbox__gallery-indicator';
          indicator.type = 'button';
          indicator.dataset.projectGalleryIndex = String(index);
          indicator.setAttribute('aria-label', `${labels.goTo} ${index + 1} ${labels.of} ${galleryImages.length}`);
          return indicator;
        })
      );
    };

    const renderGalleryImage = (index) => {
      if (!galleryImages.length) return;

      galleryIndex = (index + galleryImages.length) % galleryImages.length;
      lightboxImage.src = galleryImages[galleryIndex];
      lightboxImage.alt = galleryAlts[galleryIndex] || galleryAlts[0] || '';
      galleryStatus.textContent = `${galleryIndex + 1} ${copy().of} ${galleryImages.length}`;
      galleryPagination.querySelectorAll('[data-project-gallery-index]').forEach((indicator, indicatorIndex) => {
        const isActive = indicatorIndex === galleryIndex;
        indicator.classList.toggle('is-active', isActive);
        if (isActive) indicator.setAttribute('aria-current', 'true');
        else indicator.removeAttribute('aria-current');
      });
      galleryControls.hidden = galleryImages.length < 2;
    };

    const populateLightbox = (trigger) => {
      const sourceImage = trigger?.querySelector('.project-image');
      const card = trigger?.closest('.project-card');
      if (!sourceImage || !card) return false;

      const configuredSources = (trigger.dataset.projectImages || '')
        .split('|')
        .map((source) => source.trim())
        .filter(Boolean);
      const configuredAlts = (trigger.dataset.projectImageAlts || '')
        .split('|')
        .map((alt) => alt.trim());
      const projectTitle = card.querySelector('h3')?.textContent?.trim() || sourceImage.alt;
      const projectType = card.querySelector('.project-card__type')?.textContent?.trim();
      const projectDescription = card.querySelector('.project-card__body > p')?.textContent?.trim();
      const repositoryLink = card.querySelector('.project-card__actions a[href*="github.com"]');
      const labels = copy();

      galleryImages = (configuredSources.length ? configuredSources : [sourceImage.currentSrc || sourceImage.src])
        .map((source) => new URL(source, document.baseURI).href);
      galleryAlts = galleryImages.map((_, index) => configuredAlts[index] || sourceImage.alt);
      renderGalleryPagination();
      renderGalleryImage(0);
      lightboxTitle.textContent = projectTitle;
      lightboxDescription.textContent = projectDescription || '';
      lightboxEyebrow.textContent = projectType || labels.eyebrow;
      siteLink.href = trigger.href;

      if (repositoryLink) {
        sourceLink.href = repositoryLink.href;
        sourceLink.hidden = false;
      } else {
        sourceLink.removeAttribute('href');
        sourceLink.hidden = true;
      }

      return true;
    };

    const updateLanguage = () => {
      const labels = copy();
      closeButton.setAttribute('aria-label', labels.close);
      previousImageButton.setAttribute('aria-label', labels.previous);
      nextImageButton.setAttribute('aria-label', labels.next);
      sourceLink.querySelector('span').textContent = labels.source;
      siteLink.querySelector('span').textContent = labels.project;

      triggers.forEach((trigger) => {
        const projectTitle = trigger.closest('.project-card')?.querySelector('h3')?.textContent?.trim() || '';
        const affordanceLabel = trigger.querySelector('.project-card__zoom span');
        if (affordanceLabel) affordanceLabel.textContent = labels.enlarge;
        trigger.setAttribute('aria-label', projectTitle ? `${labels.enlarge}: ${projectTitle}` : labels.enlarge);
      });

      if (lastTrigger && lightbox.open) populateLightbox(lastTrigger);
    };

    const closeLightbox = () => {
      if (typeof lightbox.close === 'function' && lightbox.open) {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
        document.body.classList.remove('is-lightbox-open');
      }
    };

    triggers.forEach((trigger) => {
      const affordance = document.createElement('span');
      affordance.className = 'project-card__zoom';
      affordance.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i><span></span>';
      trigger.appendChild(affordance);
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', lightbox.id);

      trigger.addEventListener('click', (event) => {
        if (!trigger.querySelector('.project-image')) return;
        event.preventDefault();
        lastTrigger = trigger;
        populateLightbox(trigger);
        document.body.classList.add('is-lightbox-open');

        if (typeof lightbox.showModal === 'function') {
          lightbox.showModal();
        } else {
          lightbox.setAttribute('open', '');
        }
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    previousImageButton.addEventListener('click', () => renderGalleryImage(galleryIndex - 1));
    nextImageButton.addEventListener('click', () => renderGalleryImage(galleryIndex + 1));
    galleryPagination.addEventListener('click', (event) => {
      const indicator = event.target.closest('[data-project-gallery-index]');
      if (!indicator) return;
      renderGalleryImage(Number(indicator.dataset.projectGalleryIndex));
    });
    lightbox.addEventListener('keydown', (event) => {
      if (galleryImages.length < 2) return;
      if (event.key === 'ArrowLeft') renderGalleryImage(galleryIndex - 1);
      if (event.key === 'ArrowRight') renderGalleryImage(galleryIndex + 1);
    });
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener('close', () => {
      document.body.classList.remove('is-lightbox-open');
      window.requestAnimationFrame(() => lastTrigger?.focus());
    });
    lightbox.addEventListener('cancel', () => {
      document.body.classList.remove('is-lightbox-open');
    });
    document.addEventListener('site-language-change', updateLanguage);
    updateLanguage();
  }

  function initToolkitTabs() {
    const toolkit = document.querySelector('[data-toolkit]');
    if (!toolkit) return;

    const tabs = [...toolkit.querySelectorAll('[data-toolkit-tab]')];
    const panels = [...toolkit.querySelectorAll('[data-toolkit-panel]')];
    const track = toolkit.querySelector('[data-toolkit-track]');
    const viewport = toolkit.querySelector('[data-toolkit-viewport]');
    const previousButton = toolkit.querySelector('[data-toolkit-prev]');
    const nextButton = toolkit.querySelector('[data-toolkit-next]');
    const cards = [...toolkit.querySelectorAll('.toolkit-card')];

    if (!tabs.length || tabs.length !== panels.length || !track || !viewport) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'toolkit-floating-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltip);

    let activeTooltipCard = null;
    let tooltipFrame = null;

    const positionTooltip = (card) => {
      const cardRect = card.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportGap = 12;
      const preferredTop = cardRect.top - tooltipRect.height - 12;
      const fallbackTop = cardRect.bottom + 12;
      const hasSpaceAbove = preferredTop >= viewportGap;
      const top = Math.max(
        viewportGap,
        Math.min(
          hasSpaceAbove ? preferredTop : fallbackTop,
          window.innerHeight - tooltipRect.height - viewportGap
        )
      );
      const left = Math.max(
        viewportGap,
        Math.min(
          cardRect.left + (cardRect.width - tooltipRect.width) / 2,
          window.innerWidth - tooltipRect.width - viewportGap
        )
      );

      tooltip.style.top = `${Math.round(top)}px`;
      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.dataset.placement = hasSpaceAbove ? 'above' : 'below';
    };

    const showTooltip = (card) => {
      const cardTitle = card.getAttribute('aria-label');
      if (!cardTitle) return;

      activeTooltipCard = card;
      tooltip.textContent = cardTitle;
      tooltip.setAttribute('aria-hidden', 'false');
      tooltip.classList.remove('is-visible');
      if (tooltipFrame) window.cancelAnimationFrame(tooltipFrame);
      tooltipFrame = window.requestAnimationFrame(() => {
        positionTooltip(card);
        tooltip.classList.add('is-visible');
        tooltipFrame = null;
      });
    };

    const hideTooltip = (card) => {
      if (card && activeTooltipCard !== card) return;
      if (tooltipFrame) window.cancelAnimationFrame(tooltipFrame);
      tooltipFrame = null;
      activeTooltipCard = null;
      tooltip.classList.remove('is-visible');
      tooltip.setAttribute('aria-hidden', 'true');
    };

    cards.forEach((card) => {
      const cardTitle = card.querySelector('h4')?.textContent?.trim();
      if (!cardTitle) return;
      card.tabIndex = 0;
      card.setAttribute('aria-label', cardTitle);
      card.addEventListener('pointerenter', () => showTooltip(card));
      card.addEventListener('pointerleave', () => hideTooltip(card));
      card.addEventListener('focus', () => showTooltip(card));
      card.addEventListener('blur', () => hideTooltip(card));
    });

    let activeIndex = 0;
    let resizeFrame = null;

    const updateHeight = () => {
      viewport.style.height = `${panels[activeIndex].scrollHeight}px`;
      resizeFrame = null;
    };

    const selectPanel = (index, moveFocus = false) => {
      hideTooltip();
      activeIndex = Math.max(0, Math.min(index, panels.length - 1));
      track.style.transform = `translate3d(-${activeIndex * 100}%, 0, 0)`;

      tabs.forEach((tab, tabIndex) => {
        const isActive = tabIndex === activeIndex;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === activeIndex;
        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
        panel.querySelectorAll('.toolkit-card').forEach((card) => {
          card.tabIndex = isActive ? 0 : -1;
        });
      });

      if (previousButton) previousButton.disabled = activeIndex === 0;
      if (nextButton) nextButton.disabled = activeIndex === panels.length - 1;
      window.requestAnimationFrame(updateHeight);

      if (moveFocus) tabs[activeIndex].focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectPanel(index));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        selectPanel(activeIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
      });
    });

    previousButton?.addEventListener('click', () => selectPanel(activeIndex - 1));
    nextButton?.addEventListener('click', () => selectPanel(activeIndex + 1));

    window.addEventListener('resize', () => {
      hideTooltip();
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(updateHeight);
    }, { passive: true });
    window.addEventListener('scroll', () => hideTooltip(), { passive: true, capture: true });

    window.addEventListener('load', updateHeight, { once: true });
    selectPanel(0);
  }

  function initPortraitMotion() {
    const portrait = document.querySelector('[data-portrait]');
    const card = portrait?.querySelector('.hero-portrait__frame');
    const glare = portrait?.querySelector('.hero-portrait__shine');

    if (!portrait || !card || !glare || prefersReducedMotion) return;

    let rotateX = 0;
    let rotateY = 0;
    let frame = null;
    let rect = null;
    let pointerX = 0;
    let pointerY = 0;

    const applyCardTransform = (scale) => {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    };

    const renderMotion = () => {
      frame = null;
      if (!rect || rect.width === 0 || rect.height === 0) return;

      const x = (pointerX - rect.left) / rect.width - 0.5;
      const y = (pointerY - rect.top) / rect.height - 0.5;

      rotateX = y * -18;
      rotateY = x * 18;
      applyCardTransform(1.045);
      glare.style.transform = `translate3d(${x * 55}%, ${y * 55}%, 0)`;
      portrait.classList.add('is-portrait-active');
    };

    portrait.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(renderMotion);
    }, { passive: true });

    portrait.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;

      rect = portrait.getBoundingClientRect();
      portrait.classList.add('is-portrait-active');
      applyCardTransform(1.045);
    });

    portrait.addEventListener('pointerleave', () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = null;
      rect = null;
      rotateX = 0;
      rotateY = 0;
      portrait.classList.remove('is-portrait-active');
      applyCardTransform(1);
      glare.style.transform = 'translate3d(0, 0, 0)';
    });
  }

  function initHeaderControls() {
    const header = document.querySelector('.hero-header');
    const navLinks = [...document.querySelectorAll('.hero-header__nav a[href^="#"]')];
    const mobileNavLinks = [...document.querySelectorAll('.hero-mobile-menu a[href^="#"]')];
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    let scrollFrame = null;
    let isHeaderCompact = window.scrollY > 72;

    const getMenuLabel = (isOpen) => {
      const isEnglish = document.documentElement.dataset.language === 'en';
      if (isEnglish) return isOpen ? 'Close menu' : 'Open menu';
      return isOpen ? 'Fechar menu' : 'Abrir menu';
    };

    const updateMenuLabel = () => {
      if (!menuToggle) return;
      menuToggle.setAttribute('aria-label', getMenuLabel(menuToggle.getAttribute('aria-expanded') === 'true'));
    };

    const setMobileMenuOpen = (isOpen, returnFocus = false) => {
      menuToggle?.setAttribute('aria-expanded', String(isOpen));
      menuToggle?.setAttribute('aria-label', getMenuLabel(isOpen));
      mobileMenu?.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('mobile-menu-open', isOpen);

      if (returnFocus) menuToggle?.focus();
    };

    const trackedSections = navLinks
      .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
      .filter(({ section }) => Boolean(section));

    const updateHeader = () => {
      const scrollPosition = Math.max(0, window.scrollY);
      const isAtTop = scrollPosition < 24;
      const probe = Math.min(window.innerHeight * 0.34, 260);
      let active = trackedSections[0];

      if (isHeaderCompact && scrollPosition < 28) {
        isHeaderCompact = false;
      } else if (!isHeaderCompact && scrollPosition > 72) {
        isHeaderCompact = true;
      }

      document.body.classList.toggle('at-page-top', isAtTop);
      header?.classList.toggle('is-scrolled', isHeaderCompact);

      trackedSections.forEach((entry) => {
        const rect = entry.section.getBoundingClientRect();
        if (rect.top <= probe) active = entry;
      });

      navLinks.forEach((link) => link.classList.toggle('is-active', link === active?.link));
      mobileNavLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === active?.link.getAttribute('href');
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
      scrollFrame = null;
    };

    const requestHeaderUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateHeader);
    };

    menuToggle?.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      setMobileMenuOpen(willOpen);
    });

    mobileMenu?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        setMobileMenuOpen(false);
      });
    });

    document.addEventListener('pointerdown', (event) => {
      if (!mobileMenu?.classList.contains('is-open')) return;
      if (mobileMenu.contains(event.target) || menuToggle?.contains(event.target)) return;
      setMobileMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !mobileMenu?.classList.contains('is-open')) return;
      setMobileMenuOpen(false, true);
    });

    updateHeader();
    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
    window.addEventListener('resize', requestHeaderUpdate, { passive: true });
    document.addEventListener('site-language-change', updateMenuLabel);

    listenForMediaChange(window.matchMedia('(min-width: 821px)'), (event) => {
      if (!event.matches || !mobileMenu?.classList.contains('is-open')) return;
      setMobileMenuOpen(false);
    });

    updateMenuLabel();
  }

  function initThemeToggle() {
    const root = document.documentElement;
    const toggle = document.querySelector('[data-theme-toggle]');
    const tooltip = document.querySelector('[data-theme-tooltip]');
    const favicon = document.querySelector('#theme-favicon');
    const themeColor = document.querySelector('#theme-color');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)');

    if (!toggle) return;

    let hasSavedPreference = false;
    let isChangingTheme = false;

    try {
      hasSavedPreference = Boolean(localStorage.getItem('site-theme'));
    } catch (error) {
      hasSavedPreference = false;
    }

    const applyTheme = (theme) => {
      const isLight = theme === 'light';
      const isEnglish = root.dataset.language === 'en';
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
      document.body.classList.toggle('light-mode', isLight);
      toggle.setAttribute('aria-pressed', String(isLight));
      toggle.setAttribute('aria-label', isEnglish
        ? (isLight ? 'Enable dark mode' : 'Enable light mode')
        : (isLight ? 'Ativar modo escuro' : 'Ativar modo claro'));

      if (tooltip) {
        tooltip.textContent = isEnglish
          ? (isLight ? 'Dark mode' : 'Light mode')
          : (isLight ? 'Modo escuro' : 'Modo claro');
      }
      if (favicon) favicon.href = `./src/imagens/header-logo-${theme}.png`;
      if (themeColor) themeColor.content = isLight ? '#f4f4f2' : '#0c0c0d';
    };

    const getTransitionGeometry = () => {
      const rect = toggle.getBoundingClientRect();
      const x = Math.min(window.innerWidth, Math.max(0, rect.left + (rect.width / 2)));
      const y = Math.min(window.innerHeight, Math.max(0, rect.top + (rect.height / 2)));
      const horizontalDistance = Math.max(x, window.innerWidth - x);
      const verticalDistance = Math.max(y, window.innerHeight - y);

      return {
        x,
        y,
        radius: Math.ceil(Math.hypot(horizontalDistance, verticalDistance))
      };
    };

    const runFallbackThemeTransition = async (theme, geometry) => {
      const transitionLayer = document.createElement('span');
      const baseColor = theme === 'light' ? '#f4f4f2' : '#0c0c0d';
      const glowColor = theme === 'light' ? '#ffffff' : '#25252a';
      const origin = `${geometry.x}px ${geometry.y}px`;

      transitionLayer.className = 'theme-transition-layer';
      transitionLayer.setAttribute('aria-hidden', 'true');
      transitionLayer.style.background = `radial-gradient(circle at ${origin}, ${glowColor} 0%, ${baseColor} 42%, ${baseColor} 100%)`;
      document.body.appendChild(transitionLayer);

      if (typeof transitionLayer.animate !== 'function') {
        applyTheme(theme);
        transitionLayer.remove();
        return;
      }

      await transitionLayer.animate([
        { clipPath: `circle(0px at ${origin})`, opacity: 0.72 },
        { clipPath: `circle(${geometry.radius}px at ${origin})`, opacity: 1 }
      ], {
        duration: 720,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards'
      }).finished;

      applyTheme(theme);

      await transitionLayer.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: 280,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }).finished;

      transitionLayer.remove();
    };

    const changeTheme = async (theme) => {
      if (isChangingTheme || theme === root.dataset.theme) return;

      if (prefersReducedMotion) {
        applyTheme(theme);
        return;
      }

      isChangingTheme = true;
      toggle.disabled = true;

      const geometry = getTransitionGeometry();
      const origin = `${geometry.x}px ${geometry.y}px`;

      root.style.setProperty('--theme-transition-x', `${geometry.x}px`);
      root.style.setProperty('--theme-transition-y', `${geometry.y}px`);
      root.classList.add('theme-transition-active');
      toggle.classList.add('is-theme-changing');

      try {
        if (typeof document.startViewTransition === 'function') {
          const viewTransition = document.startViewTransition(() => applyTheme(theme));

          await viewTransition.ready;

          const revealAnimation = root.animate([
            {
              clipPath: `circle(0px at ${origin})`,
              filter: theme === 'light' ? 'brightness(1.08)' : 'brightness(0.86)'
            },
            {
              clipPath: `circle(${geometry.radius}px at ${origin})`,
              filter: 'brightness(1)'
            }
          ], {
            duration: 780,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            fill: 'both',
            pseudoElement: '::view-transition-new(root)'
          });

          await revealAnimation.finished;
          await viewTransition.finished;
        } else {
          await runFallbackThemeTransition(theme, geometry);
        }
      } catch (error) {
        if (root.dataset.theme !== theme) applyTheme(theme);
      } finally {
        document.querySelectorAll('.theme-transition-layer').forEach((layer) => layer.remove());
        root.classList.remove('theme-transition-active');
        root.style.removeProperty('--theme-transition-x');
        root.style.removeProperty('--theme-transition-y');
        toggle.classList.remove('is-theme-changing');
        toggle.disabled = false;
        isChangingTheme = false;
      }
    };

    toggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      hasSavedPreference = true;

      try {
        localStorage.setItem('site-theme', nextTheme);
      } catch (error) {
        // O tema continua funcional mesmo quando o armazenamento está bloqueado.
      }

      changeTheme(nextTheme);
    });

    listenForMediaChange(systemTheme, (event) => {
      if (hasSavedPreference) return;
      changeTheme(event.matches ? 'light' : 'dark');
    });

    document.addEventListener('site-language-change', () => {
      applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
    });

    applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  }

  function initCursorTrail() {
    const canvas = document.querySelector('#cursor-trail');
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!canvas || !supportsFinePointer || prefersReducedMotion) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const trail = [];
    const maxTrail = 22;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pointerActive = false;
    let trailOpacity = 0;
    let resizeFrame = null;
    let animationFrame = null;
    let lastMovementAt = 0;

    const resizeCanvas = () => {
      const viewportPixels = Math.max(1, window.innerWidth * window.innerHeight);
      const pixelBudgetRatio = Math.sqrt(2400000 / viewportPixels);
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 1.5, pixelBudgetRatio));
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      resizeFrame = null;
    };

    const requestResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(resizeCanvas);
    };

    const drawTrail = (timestamp) => {
      animationFrame = null;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const effectEnabled = !document.body.classList.contains('cursor-effect-off');
      const isMoving = pointerActive && timestamp - lastMovementAt < 140;
      trailOpacity += ((isMoving && effectEnabled ? 1 : 0) - trailOpacity) * 0.14;

      if (isMoving) trail.push({ x: pointer.x, y: pointer.y });
      if (trail.length > maxTrail) trail.shift();

      if (trailOpacity > 0.01) {
        const isLightTheme = document.body.classList.contains('light-mode');
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 220);
        glow.addColorStop(0, isLightTheme
          ? `rgba(10, 10, 12, ${0.05 * trailOpacity})`
          : `rgba(255, 255, 255, ${0.055 * trailOpacity})`);
        glow.addColorStop(0.38, isLightTheme
          ? `rgba(30, 30, 34, ${0.022 * trailOpacity})`
          : `rgba(255, 255, 255, ${0.035 * trailOpacity})`);
        glow.addColorStop(1, isLightTheme ? 'rgba(250, 250, 248, 0)' : 'rgba(10, 10, 10, 0)');
        context.fillStyle = glow;
        context.fillRect(pointer.x - 220, pointer.y - 220, 440, 440);

        for (let index = 0; index < trail.length - 1; index += 1) {
          const start = trail[index];
          const end = trail[index + 1];
          const ratio = index / trail.length;

          context.beginPath();
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y);
          context.lineCap = 'round';
          context.lineWidth = Math.max(0.45, ratio * 2.7);
          context.strokeStyle = isLightTheme
            ? `rgba(20, 20, 24, ${ratio * 0.32 * trailOpacity})`
            : `rgba(242, 242, 242, ${ratio * 0.42 * trailOpacity})`;
          context.stroke();
        }
      }

      if (isMoving || trailOpacity > 0.01) {
        animationFrame = window.requestAnimationFrame(drawTrail);
      } else {
        trailOpacity = 0;
        trail.length = 0;
      }
    };

    const requestTrailFrame = () => {
      if (animationFrame || document.hidden) return;
      animationFrame = window.requestAnimationFrame(drawTrail);
    };

    document.addEventListener('pointermove', (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointerActive = true;
      lastMovementAt = performance.now();
      requestTrailFrame();
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
      pointerActive = false;
      requestTrailFrame();
    });

    window.addEventListener('blur', () => {
      pointerActive = false;
      requestTrailFrame();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
        pointerActive = false;
        trailOpacity = 0;
        trail.length = 0;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    });

    window.addEventListener('resize', requestResize, { passive: true });
    resizeCanvas();
  }

  function initCommunityStory() {
    const section = document.querySelector('[data-community-story]');
    const viewport = section?.querySelector('[data-community-viewport]');
    const track = section?.querySelector('[data-community-track]');
    const panels = [...(section?.querySelectorAll('[data-community-panel]') || [])];
    const pagination = section?.querySelector('[data-community-pagination]');
    const status = section?.querySelector('[data-community-status]');
    const previousButton = section?.querySelector('[data-community-prev]');
    const nextButton = section?.querySelector('[data-community-next]');

    if (!section || !viewport || !track || panels.length < 2) return;

    let frame = null;
    let slideAnimationFrame = null;
    let activeIndex = 0;
    let resizeFrame = null;
    let heightFrame = null;
    let isProgrammaticScroll = false;
    let scrollSettleTimer = null;
    let autoplayTimer = null;
    let pointerPaused = false;
    let focusPaused = false;
    let keyboardMode = false;
    let paginationButtons = [];
    let sectionInView = !('IntersectionObserver' in window);

    const autoplayDelay = 5000;

    const clampIndex = (index) => Math.max(0, Math.min(panels.length - 1, index));
    const getPanelTitle = (index) => panels[index]?.querySelector('h3')?.textContent?.trim() || '';

    const updatePaginationLabels = () => {
      if (!pagination) return;

      const isEnglish = document.documentElement.dataset.language === 'en';
      const groupLabel = isEnglish ? 'Select community event' : 'Selecionar evento da comunidade';
      const goToLabel = isEnglish ? 'Go to event' : 'Ir para o evento';
      const connector = isEnglish ? 'of' : 'de';

      pagination.setAttribute('aria-label', groupLabel);
      paginationButtons.forEach((button, index) => {
        button.setAttribute('aria-label', `${goToLabel} ${index + 1} ${connector} ${panels.length}: ${getPanelTitle(index)}`);
      });
    };

    const renderPagination = () => {
      if (!pagination) return;

      const indicators = panels.map((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'community-story__indicator';
        indicator.type = 'button';
        indicator.dataset.communityIndex = String(index);
        return indicator;
      });

      if (typeof pagination.replaceChildren === 'function') {
        pagination.replaceChildren(...indicators);
      } else {
        pagination.textContent = '';
        indicators.forEach((indicator) => pagination.appendChild(indicator));
      }
      paginationButtons = [...pagination.querySelectorAll('[data-community-index]')];
      updatePaginationLabels();
    };

    const syncViewportHeight = () => {
      if (heightFrame) window.cancelAnimationFrame(heightFrame);
      heightFrame = window.requestAnimationFrame(() => {
        heightFrame = null;
        const panelHeight = panels[activeIndex]?.offsetHeight || 0;
        if (panelHeight > 0) viewport.style.height = `${Math.ceil(panelHeight)}px`;
      });
    };

    const updateStatus = (index) => {
      const isEnglish = document.documentElement.dataset.language === 'en';
      const prefix = isEnglish ? 'Event' : 'Evento';
      const connector = isEnglish ? 'of' : 'de';
      const message = `${prefix} ${index + 1} ${connector} ${panels.length}: ${getPanelTitle(index)}`;

      if (status) status.textContent = message;
    };

    const syncAutoplayIndicatorState = () => {
      const isPaused = pointerPaused || focusPaused || document.hidden || !sectionInView;
      section.classList.toggle('is-community-autoplay-paused', isPaused);
    };

    const restartActiveIndicatorAnimation = () => {
      const activeIndicator = pagination?.querySelector('.community-story__indicator.is-active');
      if (!activeIndicator) return;

      activeIndicator.classList.remove('is-active');
      void activeIndicator.offsetWidth;
      activeIndicator.classList.add('is-active');
    };

    const updateNextButtonLabel = (index = activeIndex) => {
      if (!nextButton) return;

      const isEnglish = document.documentElement.dataset.language === 'en';
      const isLastPanel = index === panels.length - 1;
      const label = isLastPanel
        ? (isEnglish ? 'Return to first event' : 'Voltar ao primeiro evento')
        : (isEnglish ? 'Next event' : 'Próximo evento');

      nextButton.setAttribute('aria-label', label);
      nextButton.setAttribute('title', label);
    };

    const updatePreviousButtonLabel = (index = activeIndex) => {
      if (!previousButton) return;

      const isEnglish = document.documentElement.dataset.language === 'en';
      const isFirstPanel = index === 0;
      const label = isFirstPanel
        ? (isEnglish ? 'Go to last event' : 'Ir para o último evento')
        : (isEnglish ? 'Previous event' : 'Evento anterior');

      previousButton.setAttribute('aria-label', label);
      previousButton.setAttribute('title', label);
    };

    const stopAutoplay = () => {
      if (!autoplayTimer) return;
      window.clearTimeout(autoplayTimer);
      autoplayTimer = null;
    };

    const scheduleAutoplay = () => {
      stopAutoplay();
      syncAutoplayIndicatorState();
      if (pointerPaused || focusPaused || document.hidden || !sectionInView) return;

      restartActiveIndicatorAnimation();

      autoplayTimer = window.setTimeout(() => {
        autoplayTimer = null;
        const nextIndex = (activeIndex + 1) % panels.length;
        goToPanel(nextIndex);
        scheduleAutoplay();
      }, autoplayDelay);
    };

    const updateControls = (index) => {
      activeIndex = clampIndex(index);
      previousButton?.removeAttribute('disabled');
      nextButton?.removeAttribute('disabled');
      updatePreviousButtonLabel(activeIndex);
      updateNextButtonLabel(activeIndex);

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === activeIndex;
        panel.classList.toggle('is-active', isActive);
        if ('inert' in panel) panel.inert = !isActive;
        panel.setAttribute('aria-hidden', String(!isActive));

        if (isActive) {
          panel.setAttribute('aria-current', 'true');
        } else {
          panel.removeAttribute('aria-current');
        }
      });

      paginationButtons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === activeIndex;
        const isComplete = buttonIndex < activeIndex;
        button.classList.toggle('is-active', isActive);
        button.classList.toggle('is-complete', isComplete);
        if (isActive) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });

      updateStatus(activeIndex);
      syncViewportHeight();
    };

    const syncFromScroll = () => {
      frame = null;
      const scrollRange = Math.max(1, viewport.scrollWidth - viewport.clientWidth);
      const progress = Math.max(0, Math.min(1, viewport.scrollLeft / scrollRange));
      const nextIndex = clampIndex(Math.round(progress * (panels.length - 1)));

      if (!isProgrammaticScroll && nextIndex !== activeIndex) updateControls(nextIndex);

      if (isProgrammaticScroll) return;

      if (scrollSettleTimer) window.clearTimeout(scrollSettleTimer);
      scrollSettleTimer = window.setTimeout(() => {
        const settledProgress = Math.max(0, Math.min(1, viewport.scrollLeft / scrollRange));
        const settledIndex = clampIndex(Math.round(settledProgress * (panels.length - 1)));
        if (settledIndex !== activeIndex) updateControls(settledIndex);
      }, 140);
    };

    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncFromScroll);
    };

    const cancelSlideAnimation = () => {
      if (slideAnimationFrame) window.cancelAnimationFrame(slideAnimationFrame);
      slideAnimationFrame = null;
      isProgrammaticScroll = false;
      viewport.classList.remove('is-animating');
    };

    const getPanelScrollLeft = (panel) => {
      const viewportRect = viewport.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      return viewport.scrollLeft + panelRect.left - viewportRect.left;
    };

    const easeInOutCubic = (progress) => (
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
    );

    const goToPanel = (index, behavior = 'smooth') => {
      const nextIndex = clampIndex(index);
      const panel = panels[nextIndex];
      if (!panel) return;

      cancelSlideAnimation();
      if (scrollSettleTimer) window.clearTimeout(scrollSettleTimer);

      const startLeft = viewport.scrollLeft;
      const targetLeft = getPanelScrollLeft(panel);
      const distance = targetLeft - startLeft;

      updateControls(nextIndex);

      if (behavior === 'auto' || Math.abs(distance) < 1) {
        viewport.scrollLeft = targetLeft;
        requestSync();
        return;
      }

      const duration = prefersReducedMotion ? 320 : 760;
      const startedAt = performance.now();
      isProgrammaticScroll = true;
      viewport.classList.add('is-animating');

      const animate = (timestamp) => {
        const elapsed = timestamp - startedAt;
        const progress = Math.min(1, elapsed / duration);
        viewport.scrollLeft = startLeft + distance * easeInOutCubic(progress);

        if (progress < 1) {
          slideAnimationFrame = window.requestAnimationFrame(animate);
          return;
        }

        viewport.scrollLeft = targetLeft;
        slideAnimationFrame = null;
        isProgrammaticScroll = false;
        viewport.classList.remove('is-animating');
        requestSync();
      };

      slideAnimationFrame = window.requestAnimationFrame(animate);
    };

    previousButton?.addEventListener('click', () => {
      goToPanel((activeIndex - 1 + panels.length) % panels.length);
      scheduleAutoplay();
    });
    nextButton?.addEventListener('click', () => {
      goToPanel((activeIndex + 1) % panels.length);
      scheduleAutoplay();
    });

    pagination?.addEventListener('click', (event) => {
      const indicator = event.target.closest('[data-community-index]');
      if (!indicator || !pagination.contains(indicator)) return;

      goToPanel(Number(indicator.dataset.communityIndex));
      scheduleAutoplay();
    });

    viewport.addEventListener('keydown', (event) => {
      const commands = {
        ArrowLeft: (activeIndex - 1 + panels.length) % panels.length,
        ArrowRight: (activeIndex + 1) % panels.length,
        Home: 0,
        End: panels.length - 1
      };

      if (!(event.key in commands)) return;
      event.preventDefault();
      goToPanel(commands[event.key]);
      scheduleAutoplay();
    });

    viewport.addEventListener('scroll', requestSync, { passive: true });
    viewport.addEventListener('pointerdown', () => {
      pointerPaused = true;
      cancelSlideAnimation();
      stopAutoplay();
      syncAutoplayIndicatorState();
    }, { passive: true });

    const resumeAfterPointer = () => {
      if (!pointerPaused) return;
      pointerPaused = false;
      scheduleAutoplay();
    };

    window.addEventListener('pointerup', resumeAfterPointer, { passive: true });
    viewport.addEventListener('pointercancel', resumeAfterPointer, { passive: true });

    document.addEventListener('keydown', () => {
      keyboardMode = true;
    }, true);

    document.addEventListener('pointerdown', () => {
      keyboardMode = false;
    }, true);

    section.addEventListener('focusin', (event) => {
      if (!keyboardMode) return;
      focusPaused = true;
      stopAutoplay();
      syncAutoplayIndicatorState();
    });

    section.addEventListener('focusout', () => {
      window.requestAnimationFrame(() => {
        const focusedElement = document.activeElement;
        focusPaused = Boolean(
          keyboardMode
          && section.contains(focusedElement)
        );
        scheduleAutoplay();
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        scheduleAutoplay();
      }
      syncAutoplayIndicatorState();
    });

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        sectionInView = Boolean(entry?.isIntersecting);

        if (sectionInView) {
          scheduleAutoplay();
        } else {
          stopAutoplay();
          syncAutoplayIndicatorState();
        }
      }, {
        threshold: 0.04,
        rootMargin: '160px 0px'
      });

      sectionObserver.observe(section);
    }

    if ('ResizeObserver' in window) {
      const panelResizeObserver = new ResizeObserver((entries) => {
        if (entries.some((entry) => entry.target === panels[activeIndex])) syncViewportHeight();
      });
      panels.forEach((panel) => panelResizeObserver.observe(panel));
    }

    window.addEventListener('resize', () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        goToPanel(activeIndex, 'auto');
      });
    }, { passive: true });

    document.addEventListener('site-language-change', () => {
      updateStatus(activeIndex);
      updatePaginationLabels();
      updatePreviousButtonLabel(activeIndex);
      updateNextButtonLabel(activeIndex);
    });
    renderPagination();
    updateControls(0);
    scheduleAutoplay();
  }

  function initSectionTransitions() {
    const sections = [...document.querySelectorAll('main > section, body > footer.site-footer')]
      .filter((section) => !section.matches('#inicio, #sobre-mim, #hard-skills, #comunidade, #contato') && section.offsetParent !== null);

    if (!sections.length) return;

    sections.forEach((section) => {
      section.classList.add('section-motion');

      if (prefersReducedMotion) {
        section.classList.add('is-section-active');
      }
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-section-active'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-section-active');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -12% 0px'
    });

    sections.forEach((section) => observer.observe(section));
  }

  function initAnimationPerformance() {
    const root = document.documentElement;
    const animatedSections = [...document.querySelectorAll('main > section, body > footer.site-footer')];

    const syncPageVisibility = () => {
      root.classList.toggle('is-page-hidden', document.hidden);
    };

    document.addEventListener('visibilitychange', syncPageVisibility);
    syncPageVisibility();

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-animation-paused', !entry.isIntersecting);
      });
    }, {
      threshold: 0,
      rootMargin: '180px 0px'
    });

    animatedSections.forEach((section) => observer.observe(section));
  }

  document.addEventListener('DOMContentLoaded', () => {
    finishLoading();
    initMotionReveals();
    initProjectFilters();
    initProjectLightbox();
    initToolkitTabs();
    initPortraitMotion();
    initHeaderControls();
    initThemeToggle();
    initCursorTrail();
    initCommunityStory();
    initSectionTransitions();
    initAnimationPerformance();
  });
})();
