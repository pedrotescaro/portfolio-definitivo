(() => {
  const root = document.documentElement;

  const contentEntries = [
    { selector: 'title', value: 'Pedro Tescaro — Full Stack Developer' },
    {
      selector: '.hero-header__nav .hero-header__tooltip',
      value: ['Home', 'About me', 'Tools &amp; Software', 'Experience', 'Projects', 'Education', 'Community', 'Contact']
    },
    {
      selector: '.hero-mobile-menu a',
      value: ['Home', 'About me', 'Tools &amp; Software', 'Experience', 'Projects', 'Education', 'Community', 'Contact']
    },
    {
      selector: '.hero-minimal__title',
      value: 'Pedro Tescaro<br><strong>Full Stack Developer.</strong>'
    },
    {
      selector: '.hero-minimal__subtitle',
      value: 'I build web, mobile, and backend experiences focused on clarity, performance, and real-world impact.'
    },
    { selector: '.hero-minimal__actions a', value: ['About me', 'Contact'] },
    { selector: '.hero-scroll span', value: 'Scroll to explore' },

    { selector: '#sobre-mim .about-reference__heading h2', value: 'About me' },
    {
      selector: '.about-reference__content > p:nth-of-type(1)',
      value: 'My journey brings together web, backend, and mobile development. I am currently studying Systems Analysis and Development at <button class="insight-trigger" type="button" data-insight-card="fatec-ferraz" aria-describedby="portfolio-insight-tooltip">FATEC Ferraz de Vasconcelos</button>, and I hold a technical degree in Industrial Automation from <button class="insight-trigger" type="button" data-insight-card="ifsp-suzano" aria-describedby="portfolio-insight-tooltip">IFSP Campus Suzano</button>—an education that strengthened my structured approach to solving problems.'
    },
    {
      selector: '.about-reference__content > p:nth-of-type(2)',
      value: 'I worked as a mobile development intern at <strong>Éboli Tecnologia</strong>, building Flutter interfaces and features for production applications. I am also the creator of <strong><button class="insight-trigger" type="button" data-insight-card="heal-plus" aria-describedby="portfolio-insight-tooltip">Heal+</button></strong>, an Artificial Intelligence solution that helps healthcare professionals monitor patients with wounds, presented at the <strong>16th <button class="insight-trigger" type="button" data-insight-card="feteps" aria-describedby="portfolio-insight-tooltip">FETEPS</button></strong>.'
    },
    {
      selector: '.about-reference__quote p',
      value: '“Talk is cheap. Show me the code.”'
    },
    {
      selector: '.about-reference__quote cite',
      value: '— <button class="insight-trigger" type="button" data-insight-card="linus-torvalds" aria-describedby="portfolio-insight-tooltip">Linus Torvalds</button>, creator of Linux'
    },
    {
      selector: '.about-reference__note',
      value: '<em>(This is the idea I bring to every project: learn, build, and turn knowledge into something that works in practice.)</em>'
    },
    {
      selector: '.about-reference__content > p:nth-of-type(4)',
      value: 'Today I am deepening my knowledge of <strong>React Native, TypeScript, JavaScript, Python, and Data/AI</strong>. My goal is to grow as a developer of complete digital products, combining technology, user experience, and real-world impact.'
    },
    { selector: '.about-reference__card h3', value: ['Goal', 'Current focus', 'Next steps'] },
    {
      selector: '.about-reference__card p',
      value: [
        'Grow as a full stack developer and create end-to-end digital products that solve real problems.',
        'Improve my mobile, backend, and Artificial Intelligence skills, with special attention to product, usability, and code quality.',
        'Deepen my knowledge of architecture, cloud, and testing to build safer, faster, and more scalable applications.'
      ]
    },

    { selector: '.toolkit-reference__heading h2', value: 'Tools &amp; Software' },
    {
      selector: '.toolkit-reference__heading p',
      value: 'The environment I use across web, mobile, backend, data, and game development projects.'
    },
    { selector: '.toolkit-tab', value: ['Software', 'Tools', 'Languages'] },
    {
      selector: '#toolkit-panel-software > h3',
      value: '// Applications in my development workflow'
    },
    { selector: '#toolkit-tools-code', value: '// Code' },
    { selector: '#toolkit-tools-other', value: '// Other' },
    {
      selector: '#toolkit-panel-languages > h3',
      value: '// Languages and web foundations used in my projects'
    },
    { selector: '#toolkit-languages-frontend', value: '// Web Frontend' },
    { selector: '#toolkit-languages-backend', value: '// Backend' },
    { selector: '#toolkit-languages-mobile', value: '// Mobile Development' },
    { selector: '#toolkit-languages-games', value: '// Systems &amp; Games' },
    { selector: '#toolkit-languages-database', value: '// Databases' },

    { selector: '#formation-title', value: 'Education' },
    {
      selector: '.formation-hero__intro',
      value: 'My education combines technology, industrial automation, and software development in a continuous learning journey.'
    },
    { selector: '.formation-chip-active', value: 'In progress' },
    { selector: '.formation-chip-done', value: 'Completed' },
    {
      selector: '.formation-item-copy h4',
      value: [
        'Technology Degree in Systems Analysis and Development',
        'High School integrated with an Industrial Automation Technical Program',
        'Computer Science, Game and App Development Course'
      ]
    },
    {
      selector: '.formation-item-copy p',
      value: [
        '<button class="insight-trigger" type="button" data-insight-card="fatec-ferraz" aria-describedby="portfolio-insight-tooltip">FATEC — Ferraz de Vasconcelos College of Technology</button>',
        '<button class="insight-trigger" type="button" data-insight-card="ifsp-suzano" aria-describedby="portfolio-insight-tooltip">IFSP — Federal Institute of São Paulo, Suzano Campus</button>',
        'MEGA School Institute — Training level 8'
      ]
    },
    { selector: '.formation-item:nth-of-type(3) .formation-item-period', value: 'Sep 2019 — Feb 2020' },
    { selector: '.formation-heading h3', value: 'Certifications' },
    {
      selector: '.formation-actions a',
      value: [
        'View Credly profile <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        'Download résumé <i class="fa-solid fa-download" aria-hidden="true"></i>'
      ]
    },

    { selector: '#experience-title', value: 'Experience' },
    {
      selector: '.experience-hero__intro',
      value: 'Professional experiences that strengthened my development, collaboration, communication, and problem-solving skills.'
    },
    {
      selector: '.experience-entry-tenure',
      value: ['Apr 2026 - Present', 'Nov 2024 - Jul 2025', 'Mar 2022 - Dec 2022']
    },
    {
      selector: '.experience-entry-details',
      value: ['R&D Fellowship · Remote', '9 months · Internship · Remote', '10 months · Extension Project · On-site']
    },
    { selector: '.experience-entry-role-label', value: 'Role' },
    { selector: '.experience-entry-heading h3', value: ['R&D Fellow — REDI-SUS', 'Mobile Developer', 'Mathematics Instructor'] },
    {
      selector: '.experience-entry:nth-of-type(1) .experience-highlights li',
      value: [
        'Developed software solutions and applied digital health research in the REDI-SUS project, integrating the HEAL+ module for patient monitoring and wound analysis.',
        'Conducted requirements gathering, systems modeling with UML (Use Cases, Sequence, and Activity diagrams), and technical/architectural documentation.',
        'Built and integrated applications, services, and REST APIs for communication and interoperability between modules.',
        'Researched, prepared data, and performed experiments with Computer Vision and Artificial Intelligence for wound image processing and classification.'
      ]
    },
    {
      selector: '.experience-entry:nth-of-type(2) .experience-highlights li',
      value: [
        'Developed Android solutions with Flutter and Dart, focusing on functional interfaces and a strong user experience.',
        'Participated in technical meetings to align requirements, product decisions, and delivery progress.',
        'Solved compatibility, configuration, and troubleshooting issues in real mobile development scenarios.'
      ]
    },
    {
      selector: '.experience-entry:nth-of-type(3) .experience-highlights li',
      value: [
        'Supported students with difficulties in basic Mathematics through online and in-person guidance.',
        'Answered questions from High School and Youth and Adult Education classes, adapting language and approach to each need.',
        'Strengthened communication, teaching, and mentoring skills in an educational setting.'
      ]
    },
    {
      selector: '.experience-entry:nth-of-type(1) .experience-pill',
      value: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'REST APIs', 'Artificial Intelligence', 'Computer Vision', 'UML']
    },
    {
      selector: '.experience-entry:nth-of-type(3) .experience-pill',
      value: ['Teaching', 'Mentoring', 'Communication', 'Teaching methods', 'Mathematics']
    },

    { selector: '.projects-redesign__kicker', value: '04 / selected work' },
    { selector: '.projects-redesign__intro h2', value: 'Projects' },
    {
      selector: '.projects-redesign__intro > p:last-child',
      value: 'A selection of interfaces, products, and experiments that turn ideas into real experiences.'
    },
    {
      selector: '.project-filter span:not(.project-filter__active)',
      value: ['Web', 'Games', 'Featured', 'Experiments']
    },
    { selector: '.projects-redesign__sidebar-note', value: 'Select a category' },
    { selector: '[data-project-count-label]', value: 'projects' },
    { selector: '[data-project-expand-prefix]', value: 'Show' },
    { selector: '[data-project-expand-suffix]', value: 'more projects' },
    {
      selector: '[data-project-id="stacklyst"] .project-card__type',
      value: 'Next.js · AI · Gamification'
    },
    {
      selector: '[data-project-id="stacklyst"] .project-card__body > p',
      value: 'A gamified social network where developers share knowledge, follow learning paths, and improve through AI-generated quizzes.'
    },
    {
      selector: '[data-project-id="async"] .project-card__type',
      value: 'Electron · Local AI · Open source'
    },
    {
      selector: '[data-project-id="async"] .project-card__body > p',
      value: 'An open-source desktop assistant that helps students and developers write better, learn faster, and build with confidence using local AI.'
    },
    {
      selector: '[data-project-id="aurelis"] .project-card__body > p',
      value: 'An immersive creative-intelligence experience that turns brand signals into visuals, insights, and creative decisions.'
    },
    {
      selector: '[data-project-id="pretext"] .project-card__body > p',
      value: 'An editorial experience where typography and a 3D object dynamically share the same space.'
    },
    {
      selector: '[data-project-id="healplus"] .project-card__type',
      value: 'HealthTech · Product'
    },
    {
      selector: '[data-project-id="healplus"] .project-card__body > p',
      value: 'A digital product that supports wound monitoring through a clear, healthcare-focused experience.'
    },
    {
      selector: '[data-project-id="sos-eletrica"] .project-card__type',
      value: 'Business website'
    },
    {
      selector: '[data-project-id="sos-eletrica"] .project-card__body > p',
      value: 'A direct website designed to present technical services and turn visits into quote requests.'
    },
    {
      selector: '[data-project-id="pryzen"] .project-card__type',
      value: 'Collaborative project'
    },
    {
      selector: '[data-project-id="pryzen"] .project-card__body > p',
      value: 'Educational tools and scripts brought together in a collaborative web experience.'
    },
    {
      selector: '[data-project-id="blue-star"] .project-card__body > p',
      value: 'A top-down pixel-art action RPG featuring exploration, character progression, and choices that shape the journey.'
    },
    {
      selector: '[data-project-id="gta"] .project-card__type',
      value: 'Themed UI'
    },
    {
      selector: '[data-project-id="gta"] .project-card__body > p',
      value: 'A responsive interface study with art direction inspired by the game universe.'
    },
    {
      selector: '.project-card__actions a[href*="github.com"]',
      value: 'Source <i class="fa-brands fa-github"></i>'
    },
    {
      selector: '.project-card__actions a:not([href*="github.com"]):not([href*="itch.io"])',
      value: 'Open <i class="fa-solid fa-arrow-up-right-from-square"></i>'
    },
    {
      selector: '.project-card__actions a[href*="itch.io"]',
      value: 'View on itch.io <i class="fa-brands fa-itch-io"></i>'
    },

    { selector: '.community-showcase__label .skills-board__eyebrow', value: 'Events &amp; Community' },
    {
      selector: '.community-showcase__title',
      value: 'Presence in the <span>tech community</span>.'
    },
    { selector: '.community-story__panel:nth-of-type(1) .community-story__chapter', value: '01 / Project &amp; Presentation' },
    { selector: '.community-story__panel:nth-of-type(1) h3', value: '16th FETEPS · HEAL App' },
    {
      selector: '.community-story__panel:nth-of-type(1) .community-story__copy p',
      value: 'Presented the HEAL App as an exhibitor, communicating its proposal, product decisions, and the value of a digital wound-management solution.'
    },
    {
      selector: '.community-story__panel:nth-of-type(1) .community-story__copy > a',
      value: 'View the project <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>'
    },
    { selector: '.community-story__panel:nth-of-type(2) .community-story__chapter', value: '02 / Health &amp; Innovation' },
    { selector: '.community-story__panel:nth-of-type(2) h3', value: '12th Technology Fair' },
    { selector: '.community-story__panel:nth-of-type(2) .community-story__copy > strong', value: '<button class="insight-trigger" type="button" data-insight-card="fatec-ferraz" aria-describedby="portfolio-insight-tooltip">Fatec Ferraz</button> · June 13, 2026' },
    {
      selector: '.community-story__panel:nth-of-type(2) .community-story__copy > p:not(.community-story__credits)',
      value: 'I presented Heal+, a mobile application for clinical wound monitoring that combines computer vision, artificial intelligence, and mobile development into a practical healthcare solution.'
    },
    {
      selector: '.community-story__panel:nth-of-type(2) .community-story__credits',
      value: 'Project developed with <a class="insight-trigger" href="https://www.linkedin.com/in/guilherme-alves-de-campos/" target="_blank" rel="noopener noreferrer" data-insight-card="guilherme-campos" aria-describedby="portfolio-insight-tooltip">Guilherme Alves de Campos</a> and <a class="insight-trigger" href="https://www.linkedin.com/in/paulo-leal-santos/" target="_blank" rel="noopener noreferrer" data-insight-card="paulo-santos" aria-describedby="portfolio-insight-tooltip">Paulo Henrique Leal Santos</a>, with reviews and feedback from <a class="insight-trigger" href="https://www.linkedin.com/in/camilalopezfranca/" target="_blank" rel="noopener noreferrer" data-insight-card="camila-franca" aria-describedby="portfolio-insight-tooltip">Camila França</a> and <a class="insight-trigger" href="https://www.linkedin.com/in/keven-maximus-64b650207/" target="_blank" rel="noopener noreferrer" data-insight-card="keven-maximus" aria-describedby="portfolio-insight-tooltip">Keven Maximus</a>.'
    },
    {
      selector: '.community-story__panel:nth-of-type(2) .community-story__copy > a',
      value: 'Discover Heal+ <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>'
    },
    { selector: '.community-story__panel:nth-of-type(3) .community-story__chapter', value: '03 / Entrepreneurship' },
    { selector: '.community-story__panel:nth-of-type(3) .community-story__copy > strong', value: 'Sebrae + <button class="insight-trigger" type="button" data-insight-card="fatec-ferraz" aria-describedby="portfolio-insight-tooltip">Fatec Ferraz</button> · March 20, 2026' },
    {
      selector: '.community-story__panel:nth-of-type(3) .community-story__copy p',
      value: 'Three hours immersed in entrepreneurship, artificial intelligence, and the real challenges faced by people getting started. The event reinforced that a good idea does not have to be unprecedented—it must create value and address a real problem.'
    },
    {
      selector: '.community-story__panel:nth-of-type(3) .community-story__copy > a',
      value: 'View participation <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>'
    },
    { selector: '.community-story__panel:nth-of-type(4) .community-story__chapter', value: '04 / Data &amp; Innovation' },
    { selector: '.community-story__panel:nth-of-type(4) h3', value: 'Data Innovation Meetup' },
    {
      selector: '.community-story__panel:nth-of-type(4) .community-story__copy p',
      value: 'A meetup dedicated to new perspectives on data, technology, and innovation, bringing academic learning closer to industry discussions.'
    },
    {
      selector: '.community-story__panel:nth-of-type(4) .community-story__copy > a',
      value: 'View participation <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>'
    },
    { selector: '.community-story__panel:nth-of-type(5) .community-story__chapter', value: '05 / Artificial Intelligence' },
    { selector: '.community-story__panel:nth-of-type(5) h3', value: 'Dev Immersion · Gemini' },
    {
      selector: '.community-story__panel:nth-of-type(5) .community-story__copy p',
      value: 'Hands-on work with generative AI during the 10th edition of Alura’s Dev Immersion, exploring prototyping, integration, and experimentation with Gemini.'
    },
    {
      selector: '.community-story__panel:nth-of-type(5) .community-story__copy > a',
      value: 'View post <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>'
    },
    { selector: '.community-story__panel:nth-of-type(6) .community-story__chapter', value: '06 / Technology &amp; Future' },
    {
      selector: '.community-story__panel:nth-of-type(6) .community-story__copy p',
      value: 'Participation in an initiative connecting technology, careers, and the future, broadening my perspective on professional paths and the impact of computing.'
    },
    {
      selector: '.community-story__panel:nth-of-type(6) .community-story__copy > a',
      value: 'View participation <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>'
    },

    { selector: '#contact-title', value: 'Contact' },
    {
      selector: '.contact-subtitle',
      value: 'Like my work or want to turn an idea into a product?<br />Reach out through one of the channels below.'
    },
    { selector: '.contact-redesign__secondary-title', value: 'Other links' },
    { selector: '.contact-social[href*="curriculo"] span', value: 'Résumé' },
    {
      selector: '.contact-redesign__copyright',
      value: '&copy; 2026 Pedro Tescaro. All rights reserved.'
    }
  ];

  const attributeEntries = [
    {
      selector: 'meta[name="description"]',
      attribute: 'content',
      value: 'Portfolio of Pedro Tescaro, a Full Stack Developer working with web, mobile, backend, data, and game development.'
    },
    { selector: '.hero-header__brand', attribute: 'aria-label', value: 'Back to top' },
    { selector: '.section-dots', attribute: 'aria-label', value: 'Section navigation' },
    {
      selector: '.section-dots__dot',
      attribute: 'aria-label',
      value: [
        'Go to home',
        'Go to about me',
        'Go to tools and skills',
        'Go to experience',
        'Go to projects',
        'Go to education',
        'Go to tech community presence',
        'Go to contact'
      ]
    },
    { selector: '.hero-header__nav', attribute: 'aria-label', value: 'Main navigation' },
    {
      selector: '.hero-header__nav a',
      attribute: 'aria-label',
      value: ['Home', 'About me', 'Tools &amp; Software', 'Experience', 'Projects', 'Education', 'Community', 'Contact']
    },
    { selector: '.hero-portrait img', attribute: 'alt', value: 'Profile photo of Pedro Tescaro' },
    { selector: '.about-reference__cards', attribute: 'aria-label', value: 'Professional goals' },
    { selector: '.toolkit-tabs', attribute: 'aria-label', value: 'Tool categories' },
    { selector: '[data-toolkit-prev]', attribute: 'aria-label', value: 'Previous category' },
    { selector: '[data-toolkit-next]', attribute: 'aria-label', value: 'Next category' },
    { selector: '[data-community-viewport]', attribute: 'aria-label', value: 'Events and community' },
    { selector: '[data-community-viewport]', attribute: 'aria-roledescription', value: 'carousel' },
    { selector: '.community-story__navigator', attribute: 'aria-label', value: 'Event navigation' },
    { selector: '[data-community-prev]', attribute: 'aria-label', value: 'Previous event' },
    { selector: '[data-community-next]', attribute: 'aria-label', value: 'Next event' },
    {
      selector: '[data-community-panel]',
      attribute: 'aria-label',
      value: ['1 of 6', '2 of 6', '3 of 6', '4 of 6', '5 of 6', '6 of 6']
    },
    { selector: '[data-community-panel]', attribute: 'aria-roledescription', value: 'slide' },
    { selector: '.projects-redesign__sidebar', attribute: 'aria-label', value: 'Filter projects' },
    { selector: '.contact-redesign__primary', attribute: 'aria-label', value: 'Primary contact channels' },
    { selector: '.contact-redesign__secondary', attribute: 'aria-label', value: 'Other links by Pedro Tescaro' },
    { selector: '.contact-social[href*="curriculo"]', attribute: 'aria-label', value: 'Download Pedro Tescaro’s résumé' }
  ];

  const originalContent = new WeakMap();
  const originalAttributes = new WeakMap();
  let isSwitching = false;

  const resolveValue = (entry, index) => {
    if (!Array.isArray(entry.value)) return entry.value;
    return entry.value[index] ?? entry.value[entry.value.length - 1];
  };

  const captureOriginals = () => {
    contentEntries.forEach((entry) => {
      document.querySelectorAll(entry.selector).forEach((element) => {
        if (!originalContent.has(element)) originalContent.set(element, element.innerHTML);
      });
    });

    attributeEntries.forEach((entry) => {
      document.querySelectorAll(entry.selector).forEach((element) => {
        if (!originalAttributes.has(element)) originalAttributes.set(element, new Map());
        const attributes = originalAttributes.get(element);
        if (!attributes.has(entry.attribute)) {
          attributes.set(entry.attribute, element.getAttribute(entry.attribute));
        }
      });
    });
  };

  const updateLanguageControl = (language) => {
    const toggle = document.querySelector('[data-language-toggle]');
    const flag = document.querySelector('[data-language-flag]');
    const code = document.querySelector('[data-language-code]');
    const tooltip = document.querySelector('[data-language-tooltip]');
    const isEnglish = language === 'en';

    if (flag) flag.src = isEnglish ? './src/imagens/flag-us.png' : './src/imagens/flag-br.png';
    if (code) code.textContent = isEnglish ? 'EN' : 'BR';
    if (tooltip) tooltip.textContent = isEnglish ? 'Português' : 'English';
    if (toggle) {
      toggle.setAttribute('aria-label', isEnglish ? 'Mudar para português' : 'Switch to English');
      toggle.setAttribute('title', isEnglish ? 'Mudar para português' : 'Switch to English');
    }
  };

  const applyLanguage = (language, persist = true) => {
    const normalizedLanguage = language === 'en' ? 'en' : 'pt';
    const isEnglish = normalizedLanguage === 'en';

    captureOriginals();

    contentEntries.forEach((entry) => {
      document.querySelectorAll(entry.selector).forEach((element, index) => {
        element.innerHTML = isEnglish
          ? resolveValue(entry, index)
          : originalContent.get(element);
      });
    });

    attributeEntries.forEach((entry) => {
      document.querySelectorAll(entry.selector).forEach((element, index) => {
        if (isEnglish) {
          element.setAttribute(entry.attribute, resolveValue(entry, index));
          return;
        }

        const originalValue = originalAttributes.get(element)?.get(entry.attribute);
        if (originalValue === null || originalValue === undefined) {
          element.removeAttribute(entry.attribute);
        } else {
          element.setAttribute(entry.attribute, originalValue);
        }
      });
    });

    root.lang = isEnglish ? 'en' : 'pt-BR';
    root.dataset.language = normalizedLanguage;
    updateLanguageControl(normalizedLanguage);

    if (persist) {
      try {
        localStorage.setItem('site-language', normalizedLanguage);
      } catch (error) {
        // A troca de idioma continua funcional quando o armazenamento está bloqueado.
      }
    }

    document.dispatchEvent(new CustomEvent('site-language-change', {
      detail: { language: normalizedLanguage }
    }));
  };

  const changeLanguage = async () => {
    if (isSwitching) return;

    const toggle = document.querySelector('[data-language-toggle]');
    const nextLanguage = root.dataset.language === 'en' ? 'pt' : 'en';
    isSwitching = true;

    if (toggle) {
      toggle.disabled = true;
      toggle.classList.remove('is-language-changing');
      void toggle.offsetWidth;
      toggle.classList.add('is-language-changing');
    }

    applyLanguage(nextLanguage);

    window.setTimeout(() => {
      if (toggle) {
        toggle.classList.remove('is-language-changing');
        toggle.disabled = false;
      }
      isSwitching = false;
    }, 520);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const initialLanguage = root.dataset.language === 'en' ? 'en' : 'pt';
    const toggle = document.querySelector('[data-language-toggle]');

    applyLanguage(initialLanguage, false);
    toggle?.addEventListener('click', changeLanguage);
  });
})();
