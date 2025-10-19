// Portfolio Script - Based on Exoplanet Hunter

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Generate floating particles in the background
 */
function generateParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay for staggered effect
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 5) + 's';

        particlesContainer.appendChild(particle);
    }
}

/**
 * Animate counter from 0 to target value
 */
function animateCounter(id, target, suffix = '') {
    const element = document.getElementById(id);
    if (!element) return;

    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

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
 * Navigate between sections
 */
window.showSection = (sectionId) => {
    console.log('Navigating to:', sectionId);

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        if (section.id !== sectionId) {
            section.classList.add('hidden');
        } else {
            section.classList.remove('hidden');
        }
    });

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Highlight active nav button
    document.querySelectorAll('nav button').forEach(button => {
        const buttonSection = button.getAttribute('onclick').match(/'(.+)'/)[1];
        if (buttonSection === sectionId) {
            button.style.color = 'var(--primary-blue)';
        } else {
            button.style.color = 'var(--off-white)';
        }
    });
};

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
        '.skill-category',
        '.action-card',
        '.about-card',
        '.contact-item'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });
}

// ========================================
// ACTIVE NAVIGATION ON SCROLL
// ========================================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('.content-section');
    const navButtons = document.querySelectorAll('nav button');

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
            button.style.color = 'var(--primary-blue)';
        } else {
            button.style.color = 'var(--off-white)';
        }
    });
}

// ========================================
// TYPING EFFECT (Optional Enhancement)
// ========================================

/**
 * Create typewriter effect for text
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

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
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

/**
 * Setup smooth scrolling for all anchor links
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
// PARALLAX EFFECT ON SCROLL (Optional)
// ========================================

/**
 * Add subtle parallax effect to background elements
 */
function handleParallax() {
    const scrolled = window.pageYOffset;
    const techCore = document.querySelector('.tech-core');

    if (techCore) {
        techCore.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.1}px)`;
    }
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize all portfolio features on page load
 */
function initializePortfolio() {
    console.log('🚀 Portfolio initializing...');

    // Generate visual elements
    generateParticles();

    // Setup animations
    setupScrollAnimations();
    setupSmoothScroll();

    // Animate counters on hero section
    setTimeout(() => {
        animateCounter('yearsExp', 3, '+');
        animateCounter('projectCount', 50, '+');
        animateCounter('techStack', 20, '+');
    }, 500);

    // Show home section by default
    showSection('home');

    // Add scroll event listeners
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

    console.log('✅ Portfolio initialized successfully!');
}

// ========================================
// MOBILE MENU TOGGLE (Optional Enhancement)
// ========================================

/**
 * Setup mobile menu functionality
 */
function setupMobileMenu() {
    // This can be implemented if you want a hamburger menu for mobile
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    // Add mobile menu button if needed
    if (window.innerWidth <= 768) {
        console.log('Mobile view detected');
        // Add mobile menu logic here
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    setupMobileMenu();
});

// Handle window resize
window.addEventListener('resize', () => {
    setupMobileMenu();
});

// Optional: Add easter egg or fun interaction
document.addEventListener('keydown', (e) => {
    // Press 'D' for developer mode (example)
    if (e.key === 'd' && e.ctrlKey) {
        console.log('🎯 Developer mode activated!');
        console.log('Portfolio by Luiz Felipe Alves Lopes');
        console.log('Stack: HTML5, CSS3, Vanilla JavaScript');
    }
});

// ========================================
// CONTACT FORM HANDLER (if you add a form)
// ========================================

/**
 * Handle contact form submission
 */
function handleContactForm() {
    const form = document.querySelector('#contact-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading(true);

            // Add your form submission logic here
            // For example, using EmailJS or a backend API

            setTimeout(() => {
                showLoading(false);
                alert('Mensagem enviada com sucesso!');
                form.reset();
            }, 2000);
        });
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

/**
 * Lazy load images when they come into viewport
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

// Call lazy loading setup
setupLazyLoading();

// ========================================
// EXPORT FOR TESTING (Optional)
// ========================================

// If you're using modules, you can export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateParticles,
        animateCounter,
        showSection,
        setupScrollAnimations
    };
}