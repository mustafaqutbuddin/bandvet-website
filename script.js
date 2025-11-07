// ============================================
// BANDVET Website - Interactive Elements
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
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

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.product-card-modern, .benefit-card, .testimonial-card-modern');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.hero-blob');

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Stats counter animation
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatValue(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatValue(Math.floor(current));
        }
    }, 16);
};

const formatStatValue = (value) => {
    const originalText = value.toString();
    if (originalText.includes('K')) return originalText;
    if (originalText.includes('%')) return originalText;
    if (originalText.includes('★')) return originalText;
    return value;
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = document.querySelectorAll('.stat-value');
            statCards.forEach(stat => {
                const text = stat.textContent;
                let targetValue = 0;

                if (text.includes('K+')) {
                    targetValue = parseInt(text.replace('K+', '')) * 1000;
                    animateCounter(stat, targetValue);
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 2000);
                } else if (text.includes('%')) {
                    targetValue = parseInt(text.replace('%', ''));
                    let current = 0;
                    const interval = setInterval(() => {
                        current++;
                        stat.textContent = current + '%';
                        if (current >= targetValue) clearInterval(interval);
                    }, 20);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Product card hover effect (tilt removed)
const productCards = document.querySelectorAll('.product-card-modern');
productCards.forEach(card => {
    // Tilt effect removed - cards now just lift up on hover
    // The hover effect is handled by CSS
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn, .btn-buy');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();

        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.left = e.clientX - rect.left - 50 + 'px';
        ripple.style.top = e.clientY - rect.top - 50 + 'px';
        ripple.style.animation = 'ripple-effect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple-effect {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Color swatches interaction
const colorDots = document.querySelectorAll('.color-dot');
colorDots.forEach(dot => {
    dot.addEventListener('click', function() {
        colorDots.forEach(d => d.style.transform = 'scale(1)');
        this.style.transform = 'scale(1.3)';
        this.style.transition = 'transform 0.2s ease';
    });
});

// Scroll progress indicator (optional)
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, #2B7FD9, #FDB840)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Lazy load images (when you add real images)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add cursor follower effect (optional, modern touch)
const createCursorFollower = () => {
    const cursor = document.createElement('div');
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.border = '2px solid #2B7FD9';
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'all 0.1s ease';
    cursor.style.opacity = '0';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Enlarge on hover over clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, .btn-buy');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(43, 127, 217, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
};

// Uncomment to enable custom cursor
// createCursorFollower();

// Performance optimization: Debounce function
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

// Apply debounce to resize events
const debouncedResize = debounce(() => {
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// Console branding
console.log(
    '%c🐾 BANDVET %c- Caring For The Wounds Of Your Loved Ones',
    'color: #2B7FD9; font-size: 24px; font-weight: bold;',
    'color: #4A5568; font-size: 14px;'
);

console.log(
    '%cProfessional pet care solutions | Made with ❤️',
    'color: #FDB840; font-size: 12px;'
);

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add Easter egg (paw prints on click)
let clickCount = 0;
document.addEventListener('click', (e) => {
    clickCount++;

    if (clickCount % 10 === 0) {
        const paw = document.createElement('div');
        paw.textContent = '🐾';
        paw.style.position = 'fixed';
        paw.style.left = e.clientX - 15 + 'px';
        paw.style.top = e.clientY - 15 + 'px';
        paw.style.fontSize = '30px';
        paw.style.pointerEvents = 'none';
        paw.style.zIndex = '9999';
        paw.style.animation = 'fade-out-up 2s ease-out forwards';

        document.body.appendChild(paw);

        setTimeout(() => paw.remove(), 2000);
    }
});

// Add fade-out-up animation
if (!document.querySelector('#paw-animation-style')) {
    const style = document.createElement('style');
    style.id = 'paw-animation-style';
    style.textContent = `
        @keyframes fade-out-up {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-50px);
            }
        }
    `;
    document.head.appendChild(style);
}