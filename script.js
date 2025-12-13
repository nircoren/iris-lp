// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    }

    // Floating CTA button scroll behavior
    const floatingCta = document.getElementById('floatingCta');
    if (floatingCta) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                floatingCta.style.opacity = '1';
                floatingCta.style.visibility = 'visible';
            } else {
                floatingCta.style.opacity = '0';
                floatingCta.style.visibility = 'hidden';
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Validate form
            if (!data.name || !data.email || !data.message) {
                showNotification('אנא מלא את כל השדות הנדרשים', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('אנא הזן כתובת אימייל תקינה', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'שולח...';
            submitBtn.disabled = true;

            try {
                // Send data to server using environment-specific endpoint
                const endpoint = window.APP_CONFIG ? window.APP_CONFIG.CONTACT_ENDPOINT : '/api/contact';
                console.log('📤 Sending to endpoint:', endpoint);

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showNotification('ההודעה נשלחה בהצלחה! איריס תחזור אליכם בקרוב.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                showNotification('אירעה שגיאה בשליחת ההודעה. אנא נסו שוב או צרו קשר ישירות.', 'error');
            } finally {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Workshop option selection
    window.openContactForm = function(workshopType) {
        const workshopSelect = document.getElementById('workshop-type');
        if (workshopSelect) {
            workshopSelect.value = workshopType;
        }
        scrollToSection('contact');
    };

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-item, .benefit-card, .option-card, .gallery-img');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    // Initialize dynamic content from config
    if (window.APP_CONFIG) {
        // Update contact information
        const contactName = document.getElementById('contactName');
        const contactEmail = document.getElementById('contactEmail');
        const contactPhone = document.getElementById('contactPhone');
        const contactAddress = document.getElementById('contactAddress');
        const navBrand = document.getElementById('navBrand');
        const copyrightText = document.getElementById('copyrightText');

        if (contactName) contactName.textContent = window.APP_CONFIG.OWNER_NAME;
        if (contactEmail) contactEmail.textContent = window.APP_CONFIG.CONTACT_EMAIL;
        if (contactPhone) contactPhone.textContent = window.APP_CONFIG.CONTACT_PHONE;
        if (contactAddress) contactAddress.textContent = window.APP_CONFIG.CONTACT_ADDRESS;
        if (navBrand) navBrand.textContent = window.APP_CONFIG.SITE_NAME;
        if (copyrightText) copyrightText.textContent = `© ${new Date().getFullYear()} ${window.APP_CONFIG.OWNER_NAME}. כל הזכויות שמורות.`;

        // Update page title
        if (window.APP_CONFIG.SITE_TITLE) {
            document.title = window.APP_CONFIG.SITE_TITLE;
        }

        console.log('✅ Dynamic content initialized from config');
    }
});

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add notification to body
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    /* Mobile navigation styles */
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            flex-direction: column;
            padding: 1rem;
            margin: 0;
            min-width: 200px;
            transform: translateY(-10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links li {
            margin: 0.5rem 0;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
    
    /* Animation for elements on scroll */
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Stagger animation for benefit items */
    .benefit-item:nth-child(1) { transition-delay: 0.1s; }
    .benefit-item:nth-child(2) { transition-delay: 0.2s; }
    .benefit-item:nth-child(3) { transition-delay: 0.3s; }
    .benefit-item:nth-child(4) { transition-delay: 0.4s; }
    
    .benefit-card:nth-child(1) { transition-delay: 0.1s; }
    .benefit-card:nth-child(2) { transition-delay: 0.2s; }
    .benefit-card:nth-child(3) { transition-delay: 0.3s; }
    
    .gallery-img:nth-child(1) { transition-delay: 0.1s; }
    .gallery-img:nth-child(2) { transition-delay: 0.2s; }
    .gallery-img:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// Initialize floating CTA as hidden
document.addEventListener('DOMContentLoaded', function() {
    const floatingCta = document.getElementById('floatingCta');
    if (floatingCta) {
        floatingCta.style.opacity = '0';
        floatingCta.style.visibility = 'hidden';
        floatingCta.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
});

// Add magic sparkle effect to magic buttons
document.addEventListener('DOMContentLoaded', function() {
    const magicBtns = document.querySelectorAll('.magic-btn');

    magicBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = '12px';
            sparkle.style.top = (Math.random() * element.offsetHeight) + 'px';
            sparkle.style.left = (Math.random() * element.offsetWidth) + 'px';
            sparkle.style.animation = 'sparkle 0.8s ease-out forwards';
            sparkle.style.zIndex = '1000';

            element.style.position = 'relative';
            element.appendChild(sparkle);

            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 800);
        }, i * 100);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);
