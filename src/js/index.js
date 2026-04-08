// Section dots indicator
function initSectionDots() {
    const dotsNav = document.querySelector('.section-dots');
    const dots = Array.from(document.querySelectorAll('.section-dots__dot'));
    if (!dotsNav || !dots.length) return;

    const trackedSections = dots
        .map((dot) => {
            const targetId = dot.getAttribute('href');
            const targetSection = targetId ? document.querySelector(targetId) : null;

            if (!targetSection) return null;

            return {
                dot,
                targetId,
                targetSection
            };
        })
        .filter(Boolean);

    if (!trackedSections.length) return;

    const heroSection = document.querySelector('#inicio');
    const header = document.querySelector('.cabecalho');
    let rafId = null;

    const setActiveDot = (activeId) => {
        dotsNav.classList.toggle('is-visible', activeId !== 'inicio');

        trackedSections.forEach(({ dot, targetId }) => {
            const isActive = targetId === `#${activeId}`;
            dot.classList.toggle('is-active', isActive);

            if (isActive) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    };

    const updateActiveSection = () => {
        const headerHeight = header ? header.offsetHeight : 0;
        const probeLine = window.innerHeight * 0.38;
        const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
        let activeId = null;
        let bestMatch = {
            id: trackedSections[0].targetSection.id,
            distance: Number.POSITIVE_INFINITY
        };

        trackedSections.forEach(({ targetSection }) => {
            const rect = targetSection.getBoundingClientRect();
            const adjustedTop = rect.top - headerHeight * 0.35;
            const adjustedBottom = rect.bottom - headerHeight * 0.1;

            if (adjustedTop <= probeLine && adjustedBottom >= probeLine) {
                activeId = targetSection.id;
            }

            const distanceToProbe = Math.abs(adjustedTop - probeLine);
            if (distanceToProbe < bestMatch.distance) {
                bestMatch = {
                    id: targetSection.id,
                    distance: distanceToProbe
                };
            }
        });

        if (!activeId) {
            activeId = bestMatch.id;
        }

        if (window.scrollY < heroHeight * 0.45) {
            activeId = 'inicio';
        }

        setActiveDot(activeId);
    };

    const requestSectionUpdate = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
            updateActiveSection();
            rafId = null;
        });
    };

    updateActiveSection();
    window.addEventListener('scroll', requestSectionUpdate, { passive: true });
    window.addEventListener('resize', requestSectionUpdate, { passive: true });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                const headerHeight = document.querySelector('.cabecalho').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.sobre-mim, .stack-tecnologias, .project');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.cabecalho');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.backdropFilter = 'blur(20px)';
        }

        lastScrollY = currentScrollY;
    });
}

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.querySelector('.first_section');
    const video = document.querySelector('.first__background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (video) {
            video.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing effect for title
function initTypingEffect() {
    const title = document.querySelector('.first__title');
    if (!title) return;
    
    // Preserve the original HTML structure
    const originalHTML = title.innerHTML;
    const text = title.textContent;
    
    // Clear content but preserve structure
    title.innerHTML = '<span></span>';
    title.style.borderRight = '2px solid #9443d8';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            const span = title.querySelector('span');
            span.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                title.style.borderRight = 'none';
                // Restore original HTML structure with purple color
                title.innerHTML = '<span style="color: #9443d8;">Pedro</span> Tescaro';
            }, 1000);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Loading screen functionality
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 3000);
}

// Enhanced scroll animations with stagger effect
function initStaggeredAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger effect
            }
        });
    }, observerOptions);

    // Observe elements for staggered animation
    const animatedElements = document.querySelectorAll('.sobre-mim, .stack-tecnologias, .project, .categoria');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced particle system
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    
    // Create additional particles dynamically
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Contador animado para estatísticas
function animateCounter(element, target) {
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        count += increment;
        element.textContent = Math.floor(count);
        if (count >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}


// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!cursor || !supportsFinePointer) {
        if (cursor) {
            cursor.remove();
        }
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interactiveSelector = 'a, button, .stack-tecnologias .item, .project-link, .contact-item, .submit-btn';
    let zoomLevel = 1;

    function syncZoomLevel() {
        const rawZoom = parseFloat(window.getComputedStyle(document.documentElement).zoom);
        zoomLevel = Number.isFinite(rawZoom) && rawZoom > 0 ? rawZoom : 1;
    }

    syncZoomLevel();

    const target = {
        x: window.innerWidth / (2 * zoomLevel),
        y: window.innerHeight / (2 * zoomLevel)
    };

    const current = {
        x: target.x,
        y: target.y
    };

    let isVisible = false;
    let isInteractive = false;
    let isPressed = false;
    let rafId = null;

    function syncCursorState() {
        cursor.classList.toggle('is-visible', isVisible);
        cursor.classList.toggle('is-interactive', isInteractive);
        cursor.classList.toggle('is-pressed', isPressed);
    }

    function animateCursor() {
        const easing = prefersReducedMotion ? 0.34 : (isInteractive ? 0.22 : 0.16);

        current.x += (target.x - current.x) * easing;
        current.y += (target.y - current.y) * easing;

        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const speed = Math.min(Math.hypot(dx, dy), 28);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretch = prefersReducedMotion ? 0 : speed / 28;
        const baseScale = isInteractive ? 1.08 : 1;
        const pressedScale = isPressed ? 0.9 : 1;

        cursor.style.setProperty('--cursor-x', `${current.x}px`);
        cursor.style.setProperty('--cursor-y', `${current.y}px`);
        cursor.style.setProperty('--cursor-rotate', `${angle || 0}deg`);
        cursor.style.setProperty('--cursor-scale-x', (baseScale * pressedScale * (1 + stretch * 0.28)).toFixed(3));
        cursor.style.setProperty('--cursor-scale-y', (baseScale * pressedScale * (1 - stretch * 0.14)).toFixed(3));

        rafId = requestAnimationFrame(animateCursor);
    }

    function startAnimation() {
        if (!rafId) {
            rafId = requestAnimationFrame(animateCursor);
        }
    }

    document.addEventListener('mousemove', (event) => {
        target.x = event.clientX / zoomLevel;
        target.y = event.clientY / zoomLevel;

        if (!isVisible) {
            isVisible = true;
            syncCursorState();
        }

        startAnimation();
    }, { passive: true });

    document.addEventListener('mouseover', (event) => {
        const interactiveTarget = event.target.closest(interactiveSelector);
        if (interactiveTarget) {
            isInteractive = true;
            syncCursorState();
        }
    });

    document.addEventListener('mouseout', (event) => {
        const currentTarget = event.target.closest(interactiveSelector);
        const relatedTarget = event.relatedTarget instanceof Element
            ? event.relatedTarget.closest(interactiveSelector)
            : null;

        if (currentTarget && currentTarget !== relatedTarget) {
            isInteractive = false;
            syncCursorState();
        }
    });

    document.addEventListener('mousedown', () => {
        isPressed = true;
        syncCursorState();
    });

    document.addEventListener('mouseup', () => {
        isPressed = false;
        syncCursorState();
    });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        isInteractive = false;
        isPressed = false;
        syncCursorState();
    });

    document.addEventListener('mouseenter', () => {
        if (target.x || target.y) {
            isVisible = true;
            syncCursorState();
        }
    });

    window.addEventListener('blur', () => {
        isVisible = false;
        isPressed = false;
        syncCursorState();
    });

    window.addEventListener('resize', () => {
        syncZoomLevel();
    }, { passive: true });
}

// Form submission handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 2000);
        });
    }
}

// Easter egg - Konami Code
function initEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.keyCode);
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        if (userInput.join(',') === konamiCode.join(',')) {
            activateEasterEgg();
        }
    });
}

function activateEasterEgg() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    // Show message
    const message = document.createElement('div');
    message.innerHTML = '🎉 Código Konami ativado! Você é um verdadeiro gamer! 🎮';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #9443d8, #b388ff);
        color: white;
        padding: 20px 40px;
        border-radius: 20px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 10000;
        animation: fadeInUp 0.5s ease;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#9443d8', '#b388ff', '#fff'][Math.floor(Math.random() * 3)]};
        top: -10px;
        left: ${Math.random() * 100}vw;
        z-index: 9999;
        animation: confettiFall 3s linear forwards;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initSmoothScroll();
    initSectionDots();
    initStaggeredAnimations();
    initHeaderScroll();
    initParallax();
    // initTypingEffect(); // Desabilitado - efeito de digitação removido
    initParticleSystem();
    initCustomCursor();
    initContactForm();
    initEasterEgg();
    
    // Animate counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to technology cards
    const techCards = document.querySelectorAll('.stack-tecnologias .item');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'float 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = 'none';
        });
    });
    
    // Add click effect to social media icons
    const socialIcons = document.querySelectorAll('.redes-sociais a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = icon.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            icon.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(148, 67, 216, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
