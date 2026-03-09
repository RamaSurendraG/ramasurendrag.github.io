// Page Loader
const pageLoader = document.getElementById('pageLoader');
window.addEventListener('load', () => {
    setTimeout(() => {
        pageLoader?.classList.add('hidden');
    }, 1500);
});

// ============================================
// Mouse Trail Effect
// ============================================
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail active';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 800);
    });
}

// ============================================
// Text Scramble Effect
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.innerText;
    }
    
    scramble() {
        const text = this.originalText;
        let iteration = 0;
        const interval = setInterval(() => {
            this.el.innerText = text.split('').map((char, index) => {
                if (index < iteration) return text[index];
                return this.chars[Math.floor(Math.random() * this.chars.length)];
            }).join('');
            
            if (iteration >= text.length) {
                clearInterval(interval);
            }
            iteration += 1/3;
        }, 30);
    }
}

// Apply scramble effect to section titles on scroll
const scrambleTitles = document.querySelectorAll('.section-title');
const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const scrambler = new TextScramble(entry.target);
            scrambler.scramble();
            scrambleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

scrambleTitles.forEach(title => scrambleObserver.observe(title));

// Theme Picker
const themePickerBtn = document.getElementById('themePickerBtn');
const themeDropdown = document.getElementById('themeDropdown');
const themeOptions = document.querySelectorAll('.theme-option');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update active state
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        }
    });
}

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return prefersDark.matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getPreferredTheme());

// Toggle dropdown
themePickerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('active');
});

// Theme option click
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        setTheme(theme);
        themeDropdown.classList.remove('active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!themePickerBtn?.contains(e.target) && !themeDropdown?.contains(e.target)) {
        themeDropdown?.classList.remove('active');
    }
});

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Tab Switching for Projects
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(tabId)?.classList.add('active');
    });
});

// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.timeline-item, .expertise-category, .achievement-card, .project-card, .poc-card, .detail-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function setActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Particles Effect (Simple)
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
            50% { transform: translateY(-10px) translateX(-10px); opacity: 0.5; }
            75% { transform: translateY(-30px) translateX(5px); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing Animation for Hero Title
const typingText = document.getElementById('typingText');
const titles = [
    'IT Architecture Consultant',
    'Cloud Solutions Architect',
    'AI/ML Solutions Expert',
    'Distributed Systems Specialist',
    'Technical Leader'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    if (!typingText) return;
    
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing after a delay
setTimeout(typeEffect, 1000);

// Smooth scroll for logo (back to top)
document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Parallax effect for hero visual
const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
    if (heroVisual && window.innerWidth > 768) {
        const scrolled = window.scrollY;
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// CATEGORY 1: 3D Tilt Effect (Perspective Rotate)
// Applied to: project cards, achievement cards, expertise categories
// ============================================
const tiltCards = document.querySelectorAll('.project-card, .achievement-card, .expertise-category');
tiltCards.forEach(card => {
    card.classList.add('hover-effect-tilt');
    
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// Section Reveal Animation
// ============================================
const sectionHeaders = document.querySelectorAll('.section-header');
const sectionRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            sectionRevealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

sectionHeaders.forEach(header => {
    header.classList.add('section-reveal');
    sectionRevealObserver.observe(header);
});

// ============================================
// Ripple Effect on Contact Cards
// ============================================
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size/2 + 'px';
        ripple.style.top = e.clientY - rect.top - size/2 + 'px';
        
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// Magnetic Button Effect
// ============================================
const magneticBtns = document.querySelectorAll('.btn-primary');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ============================================
// Enhanced Floating Particles
// ============================================
const particlesContainer2 = document.getElementById('particles');
if (particlesContainer2) {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.width = `${4 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particlesContainer2.appendChild(particle);
    }
}

// ============================================
// Hover Glow for Timeline Cards
// ============================================
const timelineCards = document.querySelectorAll('.timeline-content');
timelineCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.15), 0 0 30px rgba(99, 102, 241, 0.1)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ============================================
// Skill Tag Hover Sound (Visual Feedback)
// ============================================
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.3s ease';
    });
    tag.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// ============================================
// CATEGORY 2: Glow Radiance Effect (Spotlight Follow)
// Applied to: detail cards, cert cards, contact cards, POC cards
// ============================================
const glowCards = document.querySelectorAll('.detail-card, .cert-card, .poc-card');

// Theme-aware glow colors
function getGlowColors() {
    const theme = document.documentElement.getAttribute('data-theme');
    const colors = {
        dark:   { main: 'rgba(99, 102, 241, 0.3)',  soft: 'rgba(99, 102, 241, 0.12)' },
        light:  { main: 'rgba(99, 102, 241, 0.25)', soft: 'rgba(99, 102, 241, 0.1)' },
        ocean:  { main: 'rgba(6, 182, 212, 0.3)',   soft: 'rgba(6, 182, 212, 0.12)' },
        forest: { main: 'rgba(34, 197, 94, 0.3)',   soft: 'rgba(34, 197, 94, 0.12)' },
        sunset: { main: 'rgba(251, 146, 60, 0.3)', soft: 'rgba(251, 146, 60, 0.12)' },
        royal:  { main: 'rgba(168, 85, 247, 0.3)', soft: 'rgba(168, 85, 247, 0.12)' }
    };
    return colors[theme] || colors.dark;
}

glowCards.forEach(card => {
    card.classList.add('hover-effect-glow');
    
    // Create glow overlay element
    const glowOverlay = document.createElement('div');
    glowOverlay.classList.add('glow-overlay');
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(glowOverlay);
    
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Get theme-aware colors
        const colors = getGlowColors();
        
        glowOverlay.style.background = `radial-gradient(circle at ${x}px ${y}px, 
            ${colors.main} 0%, 
            ${colors.soft} 30%, 
            transparent 65%)`;
        glowOverlay.style.opacity = '1';
        
        // Subtle scale effect
        card.style.transform = 'scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        glowOverlay.style.opacity = '0';
        card.style.transform = 'scale(1)';
    });
});

// ============================================
// Certificate Lightbox
// ============================================
const certItems = document.querySelectorAll('.cert-item');
const lightbox = document.getElementById('certLightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBadge = document.getElementById('lightboxBadge');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxIssuer = document.getElementById('lightboxIssuer');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxLink = document.getElementById('lightboxLink');

const certData = {
    'CKA': {
        badge: '⎈',
        title: 'Certified Kubernetes Administrator',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        desc: 'Demonstrates the ability to perform the responsibilities of Kubernetes administrators including installation, configuration, and management of production-grade Kubernetes clusters.',
        link: 'https://www.cncf.io/certification/cka/'
    },
    'CKAD': {
        badge: '⎈',
        title: 'Certified Kubernetes Application Developer',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        desc: 'Validates skills in designing, building, configuring, and exposing cloud native applications for Kubernetes.',
        link: 'https://www.cncf.io/certification/ckad/'
    },
    'CKS': {
        badge: '🛡️',
        title: 'Certified Kubernetes Security Specialist',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        desc: 'Demonstrates competence in securing container-based applications and Kubernetes platforms during build, deployment, and runtime.',
        link: 'https://www.cncf.io/certification/cks/'
    },
    'KCNA': {
        badge: '☁️',
        title: 'Kubernetes and Cloud Native Associate',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        desc: 'Demonstrates foundational knowledge and skills in Kubernetes and cloud native technologies.',
        link: 'https://www.cncf.io/certification/kcna/'
    },
    'KCSA': {
        badge: '🔐',
        title: 'Kubernetes and Cloud Native Security Associate',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        desc: 'Validates understanding of baseline security knowledge and skills for Kubernetes and cloud native ecosystem.',
        link: 'https://www.cncf.io/certification/kcsa/'
    }
};

certItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
        const certName = item.querySelector('h4')?.innerText;
        const data = certData[certName];
        
        if (data && lightbox) {
            lightboxBadge.innerText = data.badge;
            lightboxTitle.innerText = data.title;
            lightboxIssuer.innerText = data.issuer;
            lightboxDesc.innerText = data.desc;
            lightboxLink.href = data.link;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

lightboxClose?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Expandable Timeline
// ============================================
const timelineContents = document.querySelectorAll('.timeline-content');
timelineContents.forEach(content => {
    content.addEventListener('click', function() {
        this.classList.toggle('expanded');
        const parent = this.closest('.timeline-item');
        if (parent) {
            parent.classList.toggle('expanded');
        }
    });
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            formStatus.className = 'form-status success';
            formStatus.innerText = '✓ Message sent successfully! I\'ll get back to you soon.';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.innerText = '✕ Oops! Something went wrong. Please try emailing directly.';
    }
    
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 5000);
});

// ============================================
// Skills Progress Bars (if added to HTML)
// ============================================
const progressBars = document.querySelectorAll('.progress-bar-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ============================================
// Custom Cursor
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .timeline-content, .cert-item, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    document.addEventListener('mousedown', () => cursorRing.classList.add('click'));
    document.addEventListener('mouseup', () => cursorRing.classList.remove('click'));
}

// ============================================
// Confetti Effect
// ============================================
function createConfetti(x, y) {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const colors = ['#6366f1', '#8b5cf6', '#22d3ee', '#10b981', '#f59e0b', '#ef4444'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';

        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        confetti.style.setProperty('--x-spread', Math.cos(angle) * velocity + 'px');

        if (shapes[Math.floor(Math.random() * shapes.length)] === 'circle') {
            confetti.style.borderRadius = '50%';
        }

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3500);
    }
}

const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        createConfetti(rect.left + rect.width / 2, rect.top);
    });
});

// ============================================
// Quick Actions Visibility
// ============================================
const quickActions = document.getElementById('quickActions');
if (quickActions) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            quickActions.classList.add('visible');
        } else {
            quickActions.classList.remove('visible');
        }
    });
}

// ============================================
// Enhanced Confetti Animation with Spread
// ============================================
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
@keyframes confetti-fall {
    0% {
        transform: translateY(-10px) translateX(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) translateX(var(--x-spread, 50px)) rotate(720deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(confettiStyle);

// ============================================
// Typing Effect on Reload
// ============================================
const heroRole = document.querySelector('.hero-role');
if (heroRole) {
    const text = heroRole.textContent;
    heroRole.textContent = '';
    heroRole.style.borderRight = '2px solid var(--color-primary)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroRole.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                heroRole.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(typeWriter, 1500);
}


// ============================================
// Parallax Scroll Effect
// ============================================
const parallaxElements = document.querySelectorAll('.hero-visual');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});

// ============================================
// Particle Network Background
// ============================================
const canvas = document.getElementById('particleNetwork');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    const connectionDistance = 150;
    let mouseX = 0, mouseY = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#6366f1';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    animateParticles();
}

// ============================================
// Animated Skill Bars
// ============================================
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percent = entry.target.getAttribute('data-percent');
            entry.target.style.width = percent + '%';
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillBarObserver.observe(bar));

// ============================================
// Magnetic Button Effect
// ============================================
const magneticButtons = document.querySelectorAll('.magnetic');
magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// Section Transition on Scroll
// ============================================
const allSections = document.querySelectorAll('section');
const sectionTransitionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

allSections.forEach(section => {
    section.classList.add('section-transition');
    sectionTransitionObserver.observe(section);
});

// ============================================
// Stats Tooltip
// ============================================
const statItems = document.querySelectorAll('.stat-item');
const tooltipData = {
    0: 'Two decades of enterprise software development',
    1: 'Large-scale projects across multiple domains',
    2: 'Led and mentored engineering teams globally'
};

statItems.forEach((item, index) => {
    if (!item.querySelector('.stat-tooltip')) {
        const tooltip = document.createElement('div');
        tooltip.className = 'stat-tooltip';
        tooltip.textContent = tooltipData[index] || 'Key achievement';
        item.appendChild(tooltip);
    }
});

// ============================================
// Pulse Load Animation
// ============================================
window.addEventListener('load', () => {
    document.querySelectorAll('.detail-card, .achievement-card, .project-card').forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('pulse-load');
        }, i * 100);
    });
});

// ============================================
// Stagger List Animation
// ============================================
const staggerLists = document.querySelectorAll('.info-list, .publications-list, .competencies-grid');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('stagger-list');
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

staggerLists.forEach(list => staggerObserver.observe(list));

// ============================================
// Gradient Text on Hero Name
// ============================================
const heroName = document.querySelector('.hero-name');
if (heroName) {
    const nameLines = heroName.querySelectorAll('.name-line');
    nameLines.forEach(line => {
        line.classList.add('gradient-text-animate');
    });
}

// ============================================
// Copy Email to Clipboard
// ============================================
const emailCopyCard = document.getElementById('emailCopyCard');
if (emailCopyCard) {
    const emailToCopy = emailCopyCard.getAttribute('data-email');
    const copyText = emailCopyCard.querySelector('.copy-text');
    
    emailCopyCard.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailToCopy);
            emailCopyCard.classList.add('copied');
            if (copyText) {
                copyText.textContent = 'Copied!';
            }
            
            setTimeout(() => {
                emailCopyCard.classList.remove('copied');
                if (copyText) {
                    copyText.textContent = 'Click to copy';
                }
            }, 2000);
        } catch (err) {
            window.location.href = 'mailto:' + emailToCopy;
        }
    });
}

// ============================================
// Smooth Theme Transitions
// ============================================
const themeTransitionOverlay = document.createElement('div');
themeTransitionOverlay.className = 'theme-transition-overlay';
document.body.appendChild(themeTransitionOverlay);

function smoothThemeTransition(callback) {
    document.documentElement.classList.add('theme-transitioning');
    themeTransitionOverlay.classList.add('active');
    
    setTimeout(() => {
        callback();
        
        setTimeout(() => {
            themeTransitionOverlay.classList.remove('active');
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    }, 150);
}

const themeOptionsEnhanced = document.querySelectorAll('.theme-option');
themeOptionsEnhanced.forEach(option => {
    option.addEventListener('click', () => {
        const newTheme = option.getAttribute('data-theme');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (newTheme !== currentTheme) {
            smoothThemeTransition(() => {
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    });
});

// ============================================
// Download Button Animation
// ============================================
const downloadBtn = document.querySelector('.btn-download');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        const svg = downloadBtn.querySelector('svg');
        if (svg) {
            svg.style.animation = 'none';
            svg.offsetHeight;
            svg.style.animation = 'downloadBounce 0.3s ease 3';
        }
    });
}

// ============================================
// Hide Scroll Indicator on Scroll
// ============================================
const scrollIndicator = document.querySelector('.hero-scroll-enhanced');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
    scrollIndicator.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

