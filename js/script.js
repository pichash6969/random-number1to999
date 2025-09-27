// ===========================
// GLOBAL VARIABLES
// ===========================
let isLoading = true;
let currentSection = 'home';
const typingTexts = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initialize all features
    initializeApp();
});

function initializeApp() {
    // Loading screen
    handleLoadingScreen();
    
    // Navigation
    initializeNavigation();
    
    // Typing animation
    startTypingAnimation();
    
    // Skills animation
    initializeSkillsAnimation();
    
    // Project filtering
    initializeProjectFiltering();
    
    // Contact form
    initializeContactForm();
    
    // Scroll effects
    initializeScrollEffects();
    
    // Theme toggle
    initializeThemeToggle();
    
    // Modal functionality
    initializeModal();
    
    // Back to top button
    initializeBackToTop();
    
    console.log('🚀 Portfolio loaded successfully!');
}

// ===========================
// LOADING SCREEN
// ===========================
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        isLoading = false;
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// ===========================
// NAVIGATION
// ===========================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    currentSection = sectionId;
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// TYPING ANIMATION
// ===========================
function startTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    function typeText() {
        const currentText = typingTexts[typingIndex];
        
        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000); // Pause before deleting
            } else {
                setTimeout(typeText, 100);
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                typingIndex = (typingIndex + 1) % typingTexts.length;
                setTimeout(typeText, 500); // Pause before typing next text
            } else {
                setTimeout(typeText, 50);
            }
        }
    }
    
    typeText();
}

// ===========================
// SKILLS ANIMATION
// ===========================
function initializeSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);

    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }, index * 200);
        });
    }
}

// ===========================
// PROJECT FILTERING
// ===========================
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===========================
// CONTACT FORM
// ===========================
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const formData = new FormData(this);
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API endpoint)
            await simulateFormSubmission(formData);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon! 🚀', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Oops! Something went wrong. Please try again later. 😅', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Simulate form submission (replace with actual implementation)
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success/failure
            if (Math.random() > 0.1) { // 90% success rate
                resolve('Message sent successfully');
            } else {
                reject(new Error('Simulated error'));
            }
        }, 2000);
    });
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                min-width: 300px;
                max-width: 500px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                transform: translateX(400px);
                transition: all 0.3s ease;
                animation: slideInRight 0.5s ease forwards;
            }
            
            .notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification-error {
                border-left: 4px solid #f44336;
            }
            
            .notification-info {
                border-left: 4px solid #2196F3;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
            }
            
            .notification-content i:first-child {
                font-size: 18px;
                color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            }
            
            .notification-content span {
                flex: 1;
                color: #333;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                padding: 4px;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: #f0f0f0;
                color: #666;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            body.dark-mode .notification {
                background: #2d2d2d;
                color: white;
            }
            
            body.dark-mode .notification-content span {
                color: white;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ===========================
// SCROLL EFFECTS
// ===========================
function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // Fade in animation for elements
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
    const animateElements = document.querySelectorAll('.section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===========================
// THEME TOGGLE
// ===========================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===========================
// MODAL FUNCTIONALITY
// ===========================
function initializeModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const projectBtns = document.querySelectorAll('[data-project]');
    
    // Project data (you can expand this)
    const projectData = {
        '1': {
            title: 'E-commerce Platform',
            category: 'Web Application',
            description: 'A complete e-commerce solution built with modern technologies. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. The platform is fully responsive and optimized for mobile devices.',
            image: './images/project1.jpg',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Express'],
            github: 'https://github.com/yourusername/ecommerce-platform',
            demo: 'https://your-ecommerce-demo.com'
        },
        '2': {
            title: 'Weather Forecast App',
            category: 'Web Application',
            description: 'A sophisticated weather application that provides real-time weather data, 7-day forecasts, interactive maps, and weather alerts. Built with vanilla JavaScript and integrated with multiple weather APIs for accurate data. Features include geolocation detection, favorite locations, and beautiful data visualizations.',
            image: './images/project2.jpg',
            tech: ['JavaScript', 'API Integration', 'Charts.js', 'Geolocation API', 'CSS3', 'HTML5'],
            github: 'https://github.com/yourusername/weather-app',
            demo: 'https://your-weather-demo.com'
        },
        '3': {
            title: 'Task Management App',
            category: 'Mobile App',
            description: 'A Progressive Web App (PWA) for task management with offline functionality. Features include drag-and-drop task organization, real-time collaboration, push notifications, data synchronization, and works seamlessly across all devices. Built with modern web technologies and service workers.',
            image: './images/project3.jpg',
            tech: ['PWA', 'Service Worker', 'IndexedDB', 'Push API', 'Web App Manifest', 'JavaScript'],
            github: 'https://github.com/yourusername/task-manager',
            demo: 'https://your-task-demo.com'
        }
    };
    
    // Open modal
    projectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                populateModal(project);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function populateModal(project) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-category').textContent = project.category;
        document.getElementById('modal-description').textContent = project.description;
        document.getElementById('modal-image').src = project.image;
        document.getElementById('modal-github').href = project.github;
        document.getElementById('modal-demo').href = project.demo;
        
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if user prefers reduced motion
function respectsMotionPreference() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Smooth scroll polyfill for older browsers
function smoothScrollTo(target) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// ===========================
// EASTER EGGS & FUN FEATURES
// ===========================
function initializeEasterEggs() {
    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            showNotification('🎮 Konami Code Activated! You found the easter egg! 🥳', 'success');
            addRainbowEffect();
        }
    });

    // Double-click logo for special effect
    const logo = document.querySelector('.nav-logo a');
    if (logo) {
        logo.addEventListener('dblclick', () => {
            showNotification('🚀 Thanks for double-clicking my logo! You\'re awesome! ⭐', 'info');
            logo.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                logo.style.animation = '';
            }, 500);
        });
    }
}

function addRainbowEffect() {
    document.body.style.animation = 'rainbow 2s ease infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// ===========================
// PERFORMANCE MONITORING
// ===========================
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`⚡ Page loaded in ${loadTime}ms`);
            
            // Show performance notification if load time is good
            if (loadTime < 3000) {
                setTimeout(() => {
                    showNotification('🚀 Page loaded super fast! Optimized for speed! ⚡', 'success');
                }, 3000);
            }
        }
    });

    // Monitor largest contentful paint
    if ('LCP' in window) {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
}

// ===========================
// SEO & ANALYTICS HELPERS
// ===========================
function updatePageMeta(section) {
    const metaDescriptions = {
        home: 'Raj Kumar - Full Stack Web Developer specializing in modern web technologies',
        about: 'Learn about Raj Kumar\'s experience and skills in web development',
        skills: 'Technical skills and expertise of Raj Kumar in web development',
        projects: 'Featured projects and work portfolio of Raj Kumar',
        contact: 'Get in touch with Raj Kumar for web development projects'
    };

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && metaDescriptions[section]) {
        metaDescription.content = metaDescriptions[section];
    }
}

// Track page sections for analytics
function trackSectionView(section) {
    // Google Analytics event tracking (if GA is installed)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'section_view', {
            'section_name': section,
            'engagement_time_msec': Date.now()
        });
    }
    
    // Update page meta for current section
    updatePageMeta(section);
}

// ===========================
// ACCESSIBILITY FEATURES
// ===========================
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }

    // Reduced motion preference
    if (respectsMotionPreference()) {
        document.body.classList.add('reduce-motion');
        
        // Disable animations
        const style = document.createElement('style');
        style.textContent = `
            .reduce-motion *,
            .reduce-motion *::before,
            .reduce-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Focus trap for modal
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('keydown', handleModalKeydown);
    }
}

function handleModalKeydown(e) {
    if (e.key === 'Tab') {
        const focusableElements = e.currentTarget.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
}

// ===========================
// ERROR HANDLING
// ===========================
function initializeErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        // You can send this to an error tracking service
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        // You can send this to an error tracking service
    });
}

// ===========================
// SERVICE WORKER (PWA FEATURES)
// ===========================
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// ===========================
// CONSOLE EASTER EGG
// ===========================
function initializeConsoleMessage() {
    const consoleStyles = [
        'color: #667eea',
        'font-size: 16px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)'
    ].join(';');

    console.log(`
%c🚀 Welcome to My Portfolio!

Built with:
- HTML5, CSS3, JavaScript
- AOS Animation Library  
- Font Awesome Icons
- Modern CSS Grid & Flexbox
- Responsive Design
- Dark/Light Theme
- Progressive Enhancement

Want to work together? 
📧 your.email@example.com
🔗 github.com/yourusername
💼 linkedin.com/in/yourusername

Thanks for exploring the code! 😊
    `, consoleStyles);

    // ASCII Art (optional)
    console.log(`
     ____  _    _  _  _   ____  _  _  __  _    ___  
    (  _ \\( \\/\\/ )( \\( ) (  _ \\( \\( )(  )( )  / __) 
     )___/ )    (  )  (   )___/ )  (  )(__)   \\__ \\ 
    (__)  (__/\\__)(\\__)  (__)  (__\\_)       (___/ 
    `);
}

// ===========================
// INITIALIZE ADDITIONAL FEATURES
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features after main app loads
    setTimeout(() => {
        initializeEasterEggs();
        initializePerformanceMonitoring();
        initializeAccessibility();
        initializeErrorHandling();
        initializeServiceWorker();
        initializeConsoleMessage();
        
        // Track initial page view
        trackSectionView('home');
    }, 1000);
});

// ===========================
// EXPORT FUNCTIONS (for testing)
// ===========================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showNotification,
        trackSectionView,
        debounce,
        throttle
    };
}
