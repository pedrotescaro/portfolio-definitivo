(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  function initToolkitTabs() {
    const toolkit = document.querySelector('[data-toolkit]');
    if (!toolkit) return;

    const tabs = [...toolkit.querySelectorAll('[data-toolkit-tab]')];
    const panels = [...toolkit.querySelectorAll('[data-toolkit-panel]')];
    const track = toolkit.querySelector('[data-toolkit-track]');
    const viewport = toolkit.querySelector('[data-toolkit-viewport]');
    const previousButton = toolkit.querySelector('[data-toolkit-prev]');
    const nextButton = toolkit.querySelector('[data-toolkit-next]');

    if (!tabs.length || tabs.length !== panels.length || !track || !viewport) return;

    let activeIndex = 0;
    let resizeFrame = null;

    const updateHeight = () => {
      viewport.style.height = `${panels[activeIndex].scrollHeight}px`;
      resizeFrame = null;
    };

    const selectPanel = (index, moveFocus = false) => {
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
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(updateHeight);
    }, { passive: true });

    window.addEventListener('load', updateHeight, { once: true });
    selectPanel(0);
  }

  function initPortraitMotion() {
    const portrait = document.querySelector('[data-portrait]');
    const supportsPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!portrait || !supportsPointer || prefersReducedMotion) return;

    portrait.addEventListener('pointermove', (event) => {
      const rect = portrait.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      portrait.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });

    portrait.addEventListener('pointerleave', () => {
      portrait.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
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

    window.matchMedia('(min-width: 821px)').addEventListener('change', (event) => {
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

    systemTheme.addEventListener('change', (event) => {
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

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    const drawTrail = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const effectEnabled = !document.body.classList.contains('cursor-effect-off');
      trailOpacity += ((pointerActive && effectEnabled ? 1 : 0) - trailOpacity) * 0.12;

      trail.push({ x: pointer.x, y: pointer.y });
      if (trail.length > maxTrail) trail.shift();

      if (trailOpacity > 0.01) {
        const isLightTheme = document.body.classList.contains('light-mode');
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 220);
        glow.addColorStop(0, isLightTheme
          ? `rgba(10, 10, 12, ${0.05 * trailOpacity})`
          : `rgba(255, 255, 255, ${0.055 * trailOpacity})`);
        glow.addColorStop(0.38, isLightTheme
          ? `rgba(30, 30, 34, ${0.022 * trailOpacity})`
          : `rgba(182, 140, 255, ${0.035 * trailOpacity})`);
        glow.addColorStop(1, isLightTheme ? 'rgba(250, 250, 248, 0)' : 'rgba(10, 10, 10, 0)');
        context.fillStyle = glow;
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);

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
            : `rgba(238, 232, 246, ${ratio * 0.42 * trailOpacity})`;
          context.stroke();
        }
      }

      window.requestAnimationFrame(drawTrail);
    };

    document.addEventListener('pointermove', (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointerActive = true;
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
      pointerActive = false;
    });

    window.addEventListener('blur', () => {
      pointerActive = false;
    });

    window.addEventListener('resize', requestResize, { passive: true });
    resizeCanvas();
    drawTrail();
  }

  function initCommunityStory() {
    const section = document.querySelector('[data-community-story]');
    const track = section?.querySelector('[data-community-track]');
    const panels = [...(section?.querySelectorAll('[data-community-panel]') || [])];
    const progressBar = section?.querySelector('[data-community-progress]');
    const desktopMotion = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');

    if (!section || !track || panels.length < 2) return;

    let frame = null;
    let currentProgress = 0;
    let targetProgress = 0;
    let previousFrameTime = 0;
    let hasRendered = false;

    const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

    const resetStory = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }

      currentProgress = 0;
      targetProgress = 0;
      previousFrameTime = 0;
      hasRendered = false;
      track.style.removeProperty('transform');
      progressBar?.style.setProperty('transform', 'scaleX(0)');
      section.style.removeProperty('--community-story-progress');
      panels.forEach((panel) => {
        panel.classList.add('is-active');
        panel.style.removeProperty('--community-panel-opacity');
        panel.style.removeProperty('--community-panel-shift');
        panel.style.removeProperty('--community-panel-scale');
      });
    };

    const updateTargetProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
      targetProgress = clamp(-rect.top / scrollRange);

      if (!hasRendered) {
        currentProgress = targetProgress;
        hasRendered = true;
      }
    };

    const renderStory = (frameTime) => {
      frame = null;

      if (!desktopMotion.matches) {
        resetStory();
        return;
      }

      const elapsed = previousFrameTime ? Math.min(64, frameTime - previousFrameTime) : 16.67;
      const smoothing = 1 - Math.exp(-elapsed / 115);
      const distanceToTarget = targetProgress - currentProgress;

      previousFrameTime = frameTime;
      currentProgress += distanceToTarget * smoothing;

      if (Math.abs(distanceToTarget) < 0.0001) {
        currentProgress = targetProgress;
      }

      const horizontalDistance = Math.max(0, track.scrollWidth - window.innerWidth);
      const panelPosition = currentProgress * (panels.length - 1);
      const activeIndex = Math.round(panelPosition);

      track.style.transform = `translate3d(${-horizontalDistance * currentProgress}px, 0, 0)`;
      progressBar?.style.setProperty('transform', `scaleX(${currentProgress})`);
      section.style.setProperty('--community-story-progress', currentProgress.toFixed(4));

      panels.forEach((panel, index) => {
        const panelVisibility = clamp(1 - Math.abs(index - panelPosition));
        const easedVisibility = 1 - Math.pow(1 - panelVisibility, 3);

        panel.classList.toggle('is-active', index === activeIndex);
        panel.style.setProperty('--community-panel-opacity', (0.24 + easedVisibility * 0.76).toFixed(4));
        panel.style.setProperty('--community-panel-shift', `${((1 - easedVisibility) * 26).toFixed(2)}px`);
        panel.style.setProperty('--community-panel-scale', (0.97 + easedVisibility * 0.03).toFixed(4));
      });

      if (currentProgress !== targetProgress) {
        frame = window.requestAnimationFrame(renderStory);
      }
    };

    const requestStoryUpdate = () => {
      if (!desktopMotion.matches) {
        resetStory();
        return;
      }

      updateTargetProgress();
      if (frame) return;
      previousFrameTime = performance.now();
      frame = window.requestAnimationFrame(renderStory);
    };

    const handleMotionChange = () => {
      requestStoryUpdate();
    };

    window.addEventListener('scroll', requestStoryUpdate, { passive: true });
    window.addEventListener('resize', requestStoryUpdate, { passive: true });
    window.addEventListener('load', requestStoryUpdate, { once: true });
    desktopMotion.addEventListener('change', handleMotionChange);
    requestStoryUpdate();
  }

  function initSectionTransitions() {
    const sections = [...document.querySelectorAll('main > section, body > footer.site-footer')]
      .filter((section) => !section.matches('#inicio, #sobre-mim, #hard-skills, #comunidade, #contato') && section.offsetParent !== null);

    if (!sections.length) return;

    sections.forEach((section) => {
      section.classList.add('section-motion');

      if (prefersReducedMotion) {
        section.classList.add('is-section-active');
        return;
      }

      const veil = document.createElement('span');
      veil.className = 'section-motion__veil';
      veil.setAttribute('aria-hidden', 'true');
      section.appendChild(veil);
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-section-active'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-section-active', entry.isIntersecting);
      });
    }, {
      threshold: 0.08,
      rootMargin: '-10% 0px -10% 0px'
    });

    sections.forEach((section) => observer.observe(section));
  }

  document.addEventListener('DOMContentLoaded', () => {
    finishLoading();
    initMotionReveals();
    initProjectFilters();
    initToolkitTabs();
    initPortraitMotion();
    initHeaderControls();
    initThemeToggle();
    initCursorTrail();
    initCommunityStory();
    initSectionTransitions();
  });
})();
