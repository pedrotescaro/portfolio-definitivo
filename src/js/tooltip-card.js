(() => {
  const insights = {
    'heal-plus': {
      initials: 'H+',
      pt: {
        eyebrow: 'Projeto em destaque',
        title: 'Heal+',
        meta: 'HealthTech · IA · Mobile',
        description: 'Aplicativo para apoiar o acompanhamento clínico de feridas, combinando visão computacional, inteligência artificial e uma experiência mobile centrada no profissional de saúde.',
        note: 'Apresentado em feiras e eventos de tecnologia.'
      },
      en: {
        eyebrow: 'Featured project',
        title: 'Heal+',
        meta: 'HealthTech · AI · Mobile',
        description: 'An application designed to support clinical wound monitoring by combining computer vision, artificial intelligence, and a mobile experience centered on healthcare professionals.',
        note: 'Presented at technology fairs and events.'
      }
    },
    feteps: {
      initials: '16',
      image: './src/imagens/tooltips/feteps-evento.jpg',
      imagePosition: 'center',
      pt: {
        eyebrow: 'Sobre o evento',
        title: '16ª FETEPS',
        meta: 'Feira Tecnológica · Centro Paula Souza',
        description: 'Evento do Centro Paula Souza que reúne projetos desenvolvidos por estudantes para apresentar soluções, pesquisa aplicada e inovação tecnológica.',
        note: 'O App HEAL foi apresentado como projeto expositor.',
        imageAlt: 'Público reunido durante a FETEPS',
        credit: 'Foto: FETEPS · Centro Paula Souza'
      },
      en: {
        eyebrow: 'About the event',
        title: '16th FETEPS',
        meta: 'Technology Fair · Centro Paula Souza',
        description: 'An event organized by Centro Paula Souza that brings together student projects to showcase solutions, applied research, and technological innovation.',
        note: 'The HEAL App was presented as an exhibiting project.',
        imageAlt: 'Audience gathered during FETEPS',
        credit: 'Photo: FETEPS · Centro Paula Souza'
      }
    },
    'linus-torvalds': {
      initials: 'LT',
      image: './src/imagens/tooltips/linus-torvalds.jpg',
      imagePosition: 'center 24%',
      pt: {
        eyebrow: 'Quem é?',
        title: 'Linus Torvalds',
        meta: 'Criador do Linux e do Git',
        description: 'Engenheiro de software responsável pela criação do kernel Linux e do Git, duas tecnologias fundamentais para o desenvolvimento moderno.',
        note: 'A frase reforça a importância de transformar ideias em código.',
        imageAlt: 'Foto de Linus Torvalds',
        credit: 'Foto: kuvaaja · Wikimedia Commons · CC BY-SA 3.0'
      },
      en: {
        eyebrow: 'Who is he?',
        title: 'Linus Torvalds',
        meta: 'Creator of Linux and Git',
        description: 'Software engineer responsible for creating the Linux kernel and Git, two technologies that are fundamental to modern development.',
        note: 'The quote highlights the importance of turning ideas into code.',
        imageAlt: 'Photo of Linus Torvalds',
        credit: 'Photo: kuvaaja · Wikimedia Commons · CC BY-SA 3.0'
      }
    },
    'fatec-ferraz': {
      image: './src/imagens/tooltips/fatec-ferraz.webp',
      imagePosition: 'center',
      pt: {
        title: 'Fatec Ferraz de Vasconcelos',
        description: 'Faculdade pública de tecnologia do Centro Paula Souza, onde curso Análise e Desenvolvimento de Sistemas.',
        imageAlt: 'Campus da Fatec Ferraz de Vasconcelos',
        credit: 'Foto: Fatec Ferraz · Centro Paula Souza'
      },
      en: {
        title: 'Fatec Ferraz de Vasconcelos',
        description: 'A public technology college within Centro Paula Souza, where I study Systems Analysis and Development.',
        imageAlt: 'Fatec Ferraz de Vasconcelos campus',
        credit: 'Photo: Fatec Ferraz · Centro Paula Souza'
      }
    },
    'ifsp-suzano': {
      image: './src/imagens/tooltips/ifsp-suzano.jpg',
      imagePosition: 'center',
      pt: {
        title: 'IFSP Campus Suzano',
        description: 'Instituição pública federal onde concluí o Ensino Médio integrado ao Técnico em Automação Industrial.',
        imageAlt: 'Vista aérea do IFSP Campus Suzano',
        credit: 'Foto: Divulgação · IFSP Suzano'
      },
      en: {
        title: 'IFSP Suzano Campus',
        description: 'A federal public institution where I completed High School integrated with an Industrial Automation technical program.',
        imageAlt: 'Aerial view of the IFSP Suzano Campus',
        credit: 'Photo: Courtesy of IFSP Suzano'
      }
    },
    'guilherme-campos': {
      initials: 'GC',
      image: './src/imagens/tooltips/guilherme-campos.jpg?v=2',
      imagePosition: 'center',
      pt: {
        eyebrow: 'Time Heal+',
        title: 'Guilherme Alves de Campos',
        meta: 'Desenvolvimento e apresentação',
        description: 'Integrante do time que colaborou no desenvolvimento do Heal+ e na apresentação do projeto na XII Feira Tecnológica da Fatec Ferraz.',
        note: 'Abra o nome para visitar o LinkedIn.',
        imageAlt: 'Foto de perfil de Guilherme Alves de Campos',
        credit: 'Foto: perfil público no LinkedIn'
      },
      en: {
        eyebrow: 'Heal+ team',
        title: 'Guilherme Alves de Campos',
        meta: 'Development and presentation',
        description: 'Team member who collaborated on Heal+ development and presented the project at the 12th Technology Fair at Fatec Ferraz.',
        note: 'Open the name to visit LinkedIn.',
        imageAlt: 'Profile photo of Guilherme Alves de Campos',
        credit: 'Photo: public LinkedIn profile'
      }
    },
    'paulo-santos': {
      initials: 'PS',
      image: './src/imagens/tooltips/paulo-santos.jpg?v=2',
      imagePosition: 'center',
      pt: {
        eyebrow: 'Time Heal+',
        title: 'Paulo Henrique Leal Santos',
        meta: 'Desenvolvimento e apresentação',
        description: 'Integrante do time que colaborou no desenvolvimento do Heal+ e na apresentação do projeto na XII Feira Tecnológica da Fatec Ferraz.',
        note: 'Abra o nome para visitar o LinkedIn.',
        imageAlt: 'Foto de perfil de Paulo Henrique Leal Santos',
        credit: 'Foto: perfil público no LinkedIn'
      },
      en: {
        eyebrow: 'Heal+ team',
        title: 'Paulo Henrique Leal Santos',
        meta: 'Development and presentation',
        description: 'Team member who collaborated on Heal+ development and presented the project at the 12th Technology Fair at Fatec Ferraz.',
        note: 'Open the name to visit LinkedIn.',
        imageAlt: 'Profile photo of Paulo Henrique Leal Santos',
        credit: 'Photo: public LinkedIn profile'
      }
    },
    'camila-franca': {
      initials: 'CF',
      image: './src/imagens/tooltips/camila-franca.jpg?v=2',
      imagePosition: 'center',
      pt: {
        eyebrow: 'Contribuição ao Heal+',
        title: 'Camila França',
        meta: 'Avaliação e feedback',
        description: 'Contribuiu com avaliação e feedbacks que ajudaram o time a refletir sobre o produto e sua apresentação.',
        note: 'Abra o nome para visitar o LinkedIn.',
        imageAlt: 'Foto de perfil de Camila França',
        credit: 'Foto: perfil público no LinkedIn'
      },
      en: {
        eyebrow: 'Heal+ contribution',
        title: 'Camila França',
        meta: 'Review and feedback',
        description: 'Contributed reviews and feedback that helped the team reflect on the product and its presentation.',
        note: 'Open the name to visit LinkedIn.',
        imageAlt: 'Profile photo of Camila França',
        credit: 'Photo: public LinkedIn profile'
      }
    },
    'keven-maximus': {
      initials: 'KM',
      image: './src/imagens/tooltips/keven-maximus.jpg?v=2',
      imagePosition: 'center',
      pt: {
        eyebrow: 'Contribuição ao Heal+',
        title: 'Keven Maximus',
        meta: 'Avaliação e feedback',
        description: 'Contribuiu com avaliação e feedbacks que ajudaram o time a refletir sobre o produto e sua apresentação.',
        note: 'Abra o nome para visitar o LinkedIn.',
        imageAlt: 'Foto de perfil de Keven Maximus',
        credit: 'Foto: perfil público no LinkedIn'
      },
      en: {
        eyebrow: 'Heal+ contribution',
        title: 'Keven Maximus',
        meta: 'Review and feedback',
        description: 'Contributed reviews and feedback that helped the team reflect on the product and its presentation.',
        note: 'Open the name to visit LinkedIn.',
        imageAlt: 'Profile photo of Keven Maximus',
        credit: 'Photo: public LinkedIn profile'
      }
    }
  };

  const initTooltipCards = () => {
    if (!document.querySelector('[data-insight-card]')) return;
    if (document.querySelector('#portfolio-insight-tooltip')) return;

    Object.values(insights).forEach((insight) => {
      if (!insight.image) return;
      const preload = new Image();
      preload.src = insight.image;
    });

    const tooltip = document.createElement('aside');
    tooltip.id = 'portfolio-insight-tooltip';
    tooltip.className = 'portfolio-insight-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.innerHTML = `
      <figure class="portfolio-insight-tooltip__media" data-insight-media hidden>
        <img alt="" data-insight-image>
        <figcaption data-insight-credit></figcaption>
      </figure>
      <div class="portfolio-insight-tooltip__body">
        <strong data-insight-title></strong>
        <p data-insight-description></p>
      </div>
    `;
    document.body.appendChild(tooltip);

    const media = tooltip.querySelector('[data-insight-media]');
    const image = tooltip.querySelector('[data-insight-image]');
    const credit = tooltip.querySelector('[data-insight-credit]');
    const title = tooltip.querySelector('[data-insight-title]');
    const description = tooltip.querySelector('[data-insight-description]');

    let activeTrigger = null;
    let activeMode = null;
    let hideTimer = null;
    let touchTimer = null;
    let lastInput = 'mouse';

    const getTrigger = (target) => (
      target instanceof Element ? target.closest('[data-insight-card]') : null
    );

    const getCopy = (trigger) => {
      const insight = insights[trigger?.dataset.insightCard];
      if (!insight) return null;
      const language = document.documentElement.dataset.language === 'en' ? 'en' : 'pt';
      return { insight, copy: insight[language] || insight.pt };
    };

    const renderCard = (trigger) => {
      const content = getCopy(trigger);
      if (!content) return false;

      title.textContent = content.copy.title;
      description.textContent = content.copy.description;

      const hasImage = Boolean(content.insight.image);
      tooltip.classList.toggle('has-image', hasImage);
      media.hidden = !hasImage;

      if (hasImage) {
        image.src = content.insight.image;
        image.alt = content.copy.imageAlt || content.copy.title;
        image.style.objectPosition = content.insight.imagePosition || 'center';
        credit.textContent = content.copy.credit || '';
        credit.hidden = !content.copy.credit;
      } else {
        image.removeAttribute('src');
        image.alt = '';
        credit.textContent = '';
        credit.hidden = true;
      }

      return true;
    };

    const positionCard = (clientX, clientY) => {
      const margin = 12;
      const gap = 16;
      const rect = tooltip.getBoundingClientRect();
      let left = clientX + gap;
      let top = clientY + gap;

      if (left + rect.width > window.innerWidth - margin) left = clientX - rect.width - gap;
      if (top + rect.height > window.innerHeight - margin) top = clientY - rect.height - gap;

      left = Math.max(margin, Math.min(left, window.innerWidth - rect.width - margin));
      top = Math.max(margin, Math.min(top, window.innerHeight - rect.height - margin));

      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.round(top)}px`;
    };

    const positionFromTrigger = (trigger) => {
      const rect = trigger.getBoundingClientRect();
      positionCard(rect.left + rect.width / 2, rect.bottom);
    };

    const clearTimers = () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      if (touchTimer) window.clearTimeout(touchTimer);
      hideTimer = null;
      touchTimer = null;
    };

    const hideCard = () => {
      clearTimers();
      activeTrigger?.removeAttribute('data-insight-open');
      activeTrigger = null;
      activeMode = null;
      tooltip.classList.remove('is-visible');
      tooltip.setAttribute('aria-hidden', 'true');
    };

    const showCard = (trigger, point = null, mode = 'pointer') => {
      if (!renderCard(trigger)) return;
      clearTimers();

      if (activeTrigger && activeTrigger !== trigger) {
        activeTrigger.removeAttribute('data-insight-open');
      }

      activeTrigger = trigger;
      activeMode = mode;
      activeTrigger.setAttribute('data-insight-open', 'true');
      tooltip.setAttribute('aria-hidden', 'false');
      tooltip.classList.add('is-visible');

      if (point) {
        positionCard(point.x, point.y);
      } else {
        positionFromTrigger(trigger);
      }
    };

    document.addEventListener('pointerover', (event) => {
      if (event.pointerType === 'touch') return;
      const trigger = getTrigger(event.target);
      if (!trigger || trigger.contains(event.relatedTarget)) return;
      showCard(trigger, { x: event.clientX, y: event.clientY }, 'pointer');
    });

    document.addEventListener('pointermove', (event) => {
      if (!activeTrigger || activeMode !== 'pointer' || event.pointerType === 'touch') return;
      if (!activeTrigger.matches(':hover')) return;
      positionCard(event.clientX, event.clientY);
    }, { passive: true });

    document.addEventListener('pointerout', (event) => {
      if (event.pointerType === 'touch') return;
      const trigger = getTrigger(event.target);
      if (!trigger || trigger.contains(event.relatedTarget)) return;
      if (document.activeElement === trigger) return;

      hideTimer = window.setTimeout(hideCard, 80);
    });

    document.addEventListener('focusin', (event) => {
      const trigger = getTrigger(event.target);
      if (!trigger || lastInput === 'touch') return;
      showCard(trigger, null, 'focus');
    });

    document.addEventListener('focusout', (event) => {
      const trigger = getTrigger(event.target);
      if (!trigger || activeTrigger !== trigger) return;
      if (trigger.matches(':hover') && lastInput !== 'keyboard') return;
      hideCard();
    });

    document.addEventListener('pointerdown', (event) => {
      lastInput = event.pointerType || 'mouse';
      if (!getTrigger(event.target) && activeTrigger) hideCard();
    }, { passive: true });

    document.addEventListener('click', (event) => {
      const trigger = getTrigger(event.target);
      if (!trigger || lastInput !== 'touch') return;

      const isOpen = activeTrigger === trigger && tooltip.classList.contains('is-visible');
      if (trigger.matches('a[href]') && isOpen) {
        hideCard();
        return;
      }

      event.preventDefault();
      if (isOpen) {
        hideCard();
        return;
      }

      showCard(trigger, null, 'touch');
      touchTimer = window.setTimeout(hideCard, 4500);
    });

    document.addEventListener('keydown', (event) => {
      lastInput = 'keyboard';
      if (event.key === 'Escape') hideCard();
    }, true);

    document.addEventListener('site-language-change', hideCard);
    window.addEventListener('scroll', hideCard, { passive: true });
    window.addEventListener('resize', hideCard, { passive: true });
  };

  document.addEventListener('DOMContentLoaded', initTooltipCards);
})();
