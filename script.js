// STAR WARS PORTFOLIO - JavaScript

// ========================================
// GENERATE FLOATING PARTICLES
// ========================================

/**
 * Generate floating particles in the background (like previous design)
 */
function generateParticles() {
    const fastLayer = document.querySelector('.stars-fast');
    if (!fastLayer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(212, 175, 95, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 4px rgba(212, 175, 95, 0.8)';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 5) + 's';
        particle.style.animation = 'float-particle 15s infinite ease-in-out';

        fastLayer.appendChild(particle);
    }
}

// ========================================
// STAR WARS SOUND EFFECTS (Optional)
// ========================================

const sounds = {
    hover: () => {
        // Você pode adicionar sons do Star Wars aqui se desejar
        // const audio = new Audio('path/to/sound.mp3');
        // audio.play();
    }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Show/hide loading overlay
 */
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Navigate between sections with Star Wars transition
 */
window.showSection = (sectionId) => {
    console.log('🚀 Hyperjump to:', sectionId);

    // Hide all sections with fade effect
    document.querySelectorAll('.content-section').forEach(section => {
        if (section.id !== sectionId) {
            section.style.opacity = '0';
            setTimeout(() => {
                section.classList.add('hidden');
            }, 300);
        } else {
            section.classList.remove('hidden');
            setTimeout(() => {
                section.style.opacity = '1';
            }, 50);
        }
    });

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Highlight active nav button
    document.querySelectorAll('.nav-btn').forEach(button => {
        const buttonSection = button.getAttribute('onclick').match(/'(.+)'/)[1];
        if (buttonSection === sectionId) {
            button.style.color = 'var(--sw-yellow)';
            button.style.textShadow = '0 0 10px rgba(255, 232, 31, 0.6)';
        } else {
            button.style.color = 'var(--light-gray)';
            button.style.textShadow = 'none';
        }
    });
};

/**
 * Animate counter with Star Wars effect
 */
function animateCounter(id, target, suffix = '') {
    const element = document.getElementById(id);
    if (!element) return;

    let current = 0;
    const increment = target / 60;
    const duration = 2500;
    const stepTime = duration / 60;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Observe elements and trigger animation on scroll
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableSelectors = [
        '.timeline-item',
        '.arsenal-card',
        '.specialty-card',
        '.chronicle-panel',
        '.contact-card',
        '.achievement-panel'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    });
}

// ========================================
// ACTIVE NAVIGATION ON SCROLL
// ========================================

/**
 * Update active navigation based on scroll position
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('.content-section');
    const navButtons = document.querySelectorAll('.nav-btn');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navButtons.forEach(button => {
        const buttonSection = button.getAttribute('onclick').match(/'(.+)'/)[1];
        if (buttonSection === currentSection) {
            button.style.color = 'var(--sw-yellow)';
            button.style.textShadow = '0 0 10px rgba(255, 232, 31, 0.6)';
        } else {
            button.style.color = 'var(--light-gray)';
            button.style.textShadow = 'none';
        }
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================

/**
 * Add parallax effect to enhance depth
 */
function handleParallax() {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.star-wars-text');

    elements.forEach(element => {
        const speed = 0.05;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

/**
 * Setup smooth scrolling for all links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// HOVER EFFECTS
// ========================================

/**
 * Add special hover effects to cards
 */
function setupHoverEffects() {
    // Add glow effect on hover for nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            sounds.hover();
        });
    });

    // Add glow effect on specialty cards
    document.querySelectorAll('.specialty-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 40px rgba(255, 232, 31, 0.4)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// ========================================
// TYPEWRITER EFFECT (Optional)
// ========================================

/**
 * Create Star Wars crawl-like typing effect
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========================================
// EASTER EGGS
// ========================================

/**
 * Konami Code Easter Egg
 */
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);

    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        console.log('🌟 The Force is strong with you! 🌟');
        console.log('May the Code be with you, always.');
        // Add special effect here
        document.body.style.animation = 'rainbow 2s infinite';
    }
});

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize all Star Wars portfolio features
 */
function initializePortfolio() {
    console.log('🌌 A long time ago in a galaxy far, far away...');
    console.log('🚀 Portfolio initializing...');

    // Generate floating particles
    generateParticles();

    // Setup animations and effects
    setupScrollAnimations();
    setupSmoothScroll();
    setupHoverEffects();

    // Animate counters on hero section
    setTimeout(() => {
        animateCounter('yearsExp', 3, '+');
        animateCounter('projectCount', 50, '+');
        animateCounter('techStack', 20, '+');
    }, 500);

    // Show home section by default with transition
    setTimeout(() => {
        showSection('home');
    }, 100);

    // Add scroll event listeners with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    console.log('✅ Systems online. Ready for hyperspace!');
    console.log('💫 May the Code be with you!');
}

// ========================================
// MOBILE MENU
// ========================================

/**
 * Setup mobile menu functionality
 */
function setupMobileMenu() {
    if (window.innerWidth <= 768) {
        console.log('📱 Mobile systems active');
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.flexDirection = 'column';
            nav.style.alignItems = 'center';
        }
    }
}

// ========================================
// LAZY LOADING
// ========================================

/**
 * Lazy load images for performance
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// EVENT LISTENERS
// ========================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    setupMobileMenu();
    setupLazyLoading();
});

// Handle window resize
window.addEventListener('resize', () => {
    setupMobileMenu();
});

// Add fade-in effect to sections
document.querySelectorAll('.content-section').forEach(section => {
    section.style.transition = 'opacity 0.5s ease';
});

// ========================================
// PERFORMANCE MONITORING (Optional)
// ========================================

if (performance.navigation.type === 1) {
    console.log('🔄 Page reloaded - Systems rebooting');
} else {
    console.log('🎬 First contact - Welcome to the portfolio');
}

// Log performance metrics
window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Hyperdrive engaged in ${pageLoadTime}ms`);
    }, 0);
});

// ========================================
// EXPORT (if using modules)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        animateCounter,
        setupScrollAnimations,
        initializePortfolio
    };
}