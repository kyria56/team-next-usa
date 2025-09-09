// ===== MAIN JAVASCRIPT FILE =====
// TEAM NEXT USA - National Excellence in Taekwondo

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initEventSelection();
    initForms();
    initParticles();
    initSmoothScrolling();
    initMobileMenu();
    initTermsToggle();
    initFormValidation();
    initMobileCTA();
    initPaymentDetails();
    initCampShirtToggle();
    initEventSelection();
    initClickableEventCards();
    initMobilePosterCards();
    initFloatingRegisterButton();
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        // Initialize particles for loading screen
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#00b4d8', '#ff6b35', '#ffd23f']
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00b4d8',
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }

        // Hide loading screen after 3 seconds
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Trigger entrance animations
                triggerEntranceAnimations();
            }, 500);
        }, 3000);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.nav-toggle')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.schedule-card, .highlight-item, .contact-card, .info-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===== ENTRANCE ANIMATIONS =====
function triggerEntranceAnimations() {
    const elements = document.querySelectorAll('.schedule-card, .highlight-item, .contact-card, .info-card');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 100);
    });
}

// ===== EVENT SELECTION =====
function initEventSelection() {
    const eventCards = document.querySelectorAll('.event-card');
    const eventOptions = document.querySelectorAll('.event-option input[type="radio"]');
    
    // Handle event card selection
    eventCards.forEach(card => {
        const selectBtn = card.querySelector('.select-event');
        const eventId = card.dataset.event;
        
        selectBtn.addEventListener('click', () => {
            // Scroll to registration section
            const registrationSection = document.getElementById('registration');
            registrationSection.scrollIntoView({ behavior: 'smooth' });
            
            // Select the corresponding radio button
            const radioBtn = document.getElementById(eventId);
            if (radioBtn) {
                radioBtn.checked = true;
                // Trigger change event to update styling
                radioBtn.dispatchEvent(new Event('change'));
            }
        });
    });
    
    // Handle radio button selection
    eventOptions.forEach(radio => {
        radio.addEventListener('change', () => {
            // Update visual feedback
            eventOptions.forEach(r => {
                const label = r.nextElementSibling;
                if (label) {
                    label.classList.remove('selected');
                }
            });
            
            const selectedLabel = radio.nextElementSibling;
            if (selectedLabel) {
                selectedLabel.classList.add('selected');
            }
        });
    });
}

// ===== FORM FUNCTIONALITY =====
function initForms() {
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// ===== FORM SUBMISSION HANDLER =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    console.log('Submitting form to:', form.action);
    console.log('Form data:', Object.fromEntries(formData));
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    })
    .then(data => {
        console.log('Success response:', data);
        showNotification('Registration submitted successfully! Check your email for confirmation.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset event selection
        const eventOptions = form.querySelectorAll('input[name="selectedEvent"]');
        eventOptions.forEach(option => option.checked = false);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove focused classes
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
    })
    .catch(error => {
        console.error('Submission error:', error);
        showNotification('Submission failed. Please try again or contact us directly.', 'error');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    
    // Remove existing error
    clearFieldError(e);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const existingError = fieldGroup.querySelector('.field-error');
    
    if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#ff6b35';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        
        fieldGroup.appendChild(errorDiv);
        field.style.borderColor = '#ff6b35';
    }
}

function clearFieldError(e) {
    const field = e.target;
    const fieldGroup = field.closest('.form-group');
    const errorDiv = fieldGroup.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
        field.style.borderColor = '';
    }
}

// ===== TERMS TOGGLE =====
function initTermsToggle() {
    const termsToggles = document.querySelectorAll('.terms-toggle');
    
    termsToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const termsContent = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            termsContent.classList.toggle('active');
            
            if (termsContent.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// ===== PAYMENT DETAILS HANDLER =====
function initPaymentDetails() {
    const select = document.getElementById('paymentMethod');
    const details = document.getElementById('paymentDetails');
    if (!select || !details) return;

    const options = details.querySelectorAll('.payment-option');

    function updateVisibility() {
        const method = select.value;
        options.forEach(opt => {
            const isActive = opt.getAttribute('data-method') === method;
            opt.style.display = isActive ? 'flex' : 'none';
        });

        // Show helper note only when a valid method is chosen
        const note = details.querySelector('.payment-note');
        note.style.display = method ? 'block' : 'none';

        // Reveal container when user interacts
        details.style.display = method ? 'block' : 'none';
    }

    // Initialize hidden
    details.style.display = 'none';
    options.forEach(opt => (opt.style.display = 'none'));

    // Bind change
    select.addEventListener('change', updateVisibility);

    // If a value is prefilled, reflect it
    updateVisibility();
}

// ===== CAMP SHIRT TOGGLE =====
function initCampShirtToggle() {
    const checkbox = document.getElementById('addShirt');
    const sizeRow = document.getElementById('campShirtSizeRow');
    const sizeSelect = document.getElementById('campShirtSize');
    if (!checkbox || !sizeRow || !sizeSelect) return;

    function updateShirtState() {
        const enabled = checkbox.checked;
        sizeRow.style.display = enabled ? 'grid' : 'none';
        sizeSelect.disabled = !enabled;
        sizeSelect.required = enabled;
        if (!enabled) sizeSelect.value = '';
    }

    checkbox.addEventListener('change', updateShirtState);
    updateShirtState();
}

// ===== EVENT SELECTION SYSTEM =====
function initEventSelection() {
    const eventCards = document.querySelectorAll('.event-card');
    const eventSelectBtns = document.querySelectorAll('.event-select-btn');
    const selectedEventSummary = document.getElementById('selectedEventSummary');
    const selectedEventText = document.getElementById('selectedEventText');
    const changeEventBtn = document.getElementById('changeEventBtn');
    const registrationFormsContainer = document.getElementById('registrationFormsContainer');
    const formsScrollContainer = document.getElementById('formsScrollContainer');
    const eventSelectionCards = document.querySelector('.event-selection-cards');
    
    if (!eventCards.length) return;
    
    // Event data mapping
    const eventData = {
        'sept14': {
            title: 'September 14, 2025 - New York',
            date: 'September 14, 2025',
            time: '11:00 AM – 4:00 PM',
            location: 'Vision Taekwondo Rego Park, 62-98 Woodhaven Blvd Unit S4, Rego Park, NY 11374'
        },
        'sept27': {
            title: 'September 27, 2025 - Bakersfield',
            date: 'September 27, 2025',
            time: '11:00 AM – 4:00 PM',
            location: '4302 Gosford Rd, Bakersfield, CA 93313'
        },
        'sept28': {
            title: 'September 28, 2025 - Chatsworth',
            date: 'September 28, 2025',
            time: '11:00 AM – 4:00 PM',
            location: '9400 Lurline Ave, Unit A1, Chatsworth, CA 91311'
        }
    };
    
    function selectEvent(eventId) {
        // Update selected event text
        selectedEventText.textContent = eventData[eventId].title;
        
        // Show selected event summary
        selectedEventSummary.style.display = 'flex';
        
        // Hide event selection cards
        eventSelectionCards.style.display = 'none';
        
        // Show registration forms container
        registrationFormsContainer.classList.add('active');
        
        // Scroll to the correct form
        const targetForm = document.querySelector(`.registration-form[data-event="${eventId}"]`);
        if (targetForm) {
            formsScrollContainer.scrollTo({
                left: targetForm.offsetLeft,
                behavior: 'smooth'
            });
        }
        
        // Update URL without page reload
        const url = new URL(window.location);
        url.searchParams.set('event', eventId);
        window.history.pushState({}, '', url);
        
        // Initialize payment details for the selected form after a short delay
        setTimeout(() => {
            initPaymentDetailsForForm(eventId);
            initCampShirtToggleForForm(eventId);
        }, 100);
    }
    
    function changeEvent() {
        // Hide selected event summary
        selectedEventSummary.style.display = 'none';
        
        // Hide registration forms container
        registrationFormsContainer.classList.remove('active');
        
        // Always scroll to top to show poster cards
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Remove event from URL
        const url = new URL(window.location);
        url.searchParams.delete('event');
        window.history.pushState({}, '', url);
    }
    
    // Event listeners
    eventSelectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event');
            selectEvent(eventId);
        });
    });
    
    changeEventBtn.addEventListener('click', changeEvent);
    
    // Initialize payment details for all forms on page load
    initPaymentDetailsForForm('sept14');
    initPaymentDetailsForForm('sept27');
    initPaymentDetailsForForm('sept28');
    
    // Check for event in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const eventFromUrl = urlParams.get('event');
    if (eventFromUrl && eventData[eventFromUrl]) {
        selectEvent(eventFromUrl);
    }
    
    // Initialize payment details for all forms
    function initPaymentDetailsForForm(eventId) {
        const selectId = eventId === 'sept14' ? 'paymentMethod' : `paymentMethod${eventId}`;
        const detailsId = eventId === 'sept14' ? 'paymentDetails' : `paymentDetails${eventId}`;
        const select = document.getElementById(selectId);
        const details = document.getElementById(detailsId);
        
        console.log('Trying to init payment for:', eventId, 'Select:', selectId, 'Details:', detailsId);
        console.log('Found select:', select, 'Found details:', details);
        
        if (!select || !details) {
            console.log('Missing elements for:', eventId);
            return;
        }
        
        const options = details.querySelectorAll('.payment-option');
        
        function updateVisibility() {
            const method = select.value;
            console.log('Payment method changed to:', method, 'for event:', eventId);
            
            options.forEach(opt => {
                const isActive = opt.getAttribute('data-method') === method;
                opt.style.display = isActive ? 'flex' : 'none';
                console.log('Option', opt.getAttribute('data-method'), 'isActive:', isActive);
            });
            
            const note = details.querySelector('.payment-note');
            note.style.display = method ? 'block' : 'none';
            details.style.display = method ? 'block' : 'none';
            
            console.log('Details display set to:', details.style.display);
        }
        
        details.style.display = 'none';
        options.forEach(opt => (opt.style.display = 'none'));
        select.addEventListener('change', updateVisibility);
    }
    
    function initCampShirtToggleForForm(eventId) {
        const checkboxId = eventId === 'sept14' ? 'addShirt' : `addShirt${eventId}`;
        const sizeRowId = eventId === 'sept14' ? 'campShirtSizeRow' : `campShirtSizeRow${eventId}`;
        const sizeSelectId = eventId === 'sept14' ? 'campShirtSize' : `campShirtSize${eventId}`;
        const checkbox = document.getElementById(checkboxId);
        const sizeRow = document.getElementById(sizeRowId);
        const sizeSelect = document.getElementById(sizeSelectId);
        if (!checkbox || !sizeRow || !sizeSelect) return;
        
        function updateShirtState() {
            const enabled = checkbox.checked;
            sizeRow.style.display = enabled ? 'grid' : 'none';
            sizeSelect.disabled = !enabled;
            sizeSelect.required = enabled;
            if (!enabled) sizeSelect.value = '';
        }
        
        checkbox.addEventListener('change', updateShirtState);
        updateShirtState();
    }
}

// ===== CLICKABLE EVENT CARDS =====
function initClickableEventCards() {
    const clickableCards = document.querySelectorAll('.clickable-event-card');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button
            if (e.target.closest('.select-event')) {
                return;
            }
            
            const eventId = this.getAttribute('data-event');
            
            // Navigate to registration section
            const registrationSection = document.getElementById('registration');
            if (registrationSection) {
                const offsetTop = registrationSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Auto-select the event after a short delay
                setTimeout(() => {
                    // Trigger the event selection
                    const eventSelectBtn = document.querySelector(`.event-select-btn[data-event="${eventId}"]`);
                    if (eventSelectBtn) {
                        eventSelectBtn.click();
                    }
                }, 800); // Wait for scroll to complete
            }
        });
    });
}

// ===== MOBILE POSTER CARDS (Top Section) =====
function initMobilePosterCards() {
    const mobilePosterCards = document.querySelectorAll('.mobile-poster-card');
    if (!mobilePosterCards || mobilePosterCards.length === 0) return;

    mobilePosterCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If the inner CTA button was clicked, let its handler proceed
            if (e.target.closest('.mobile-poster-cta')) return;

            const eventId = this.getAttribute('data-event');
            const registrationSection = document.getElementById('registration');
            if (registrationSection) {
                const offsetTop = registrationSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                setTimeout(() => {
                    const eventSelectBtn = document.querySelector(`.event-select-btn[data-event="${eventId}"]`);
                    if (eventSelectBtn) {
                        eventSelectBtn.click();
                    }
                }, 600);
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    // Add subtle particles to sections
    const sections = document.querySelectorAll('.about-section, .schedule-section, .registration-section');
    
    sections.forEach(section => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'section-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        section.appendChild(particlesContainer);
        
        // Add floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(0, 180, 216, 0.3);
                border-radius: 50%;
                animation: float-particle 8s infinite linear;
                animation-delay: ${i * 0.4}s;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            particlesContainer.appendChild(particle);
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00b4d8' : '#ff6b35'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
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

// Debounce scroll events for better performance
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== MOBILE CTA BAR =====
function initMobileCTA() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    const cta = document.createElement('a');
    cta.href = '#registration';
    cta.className = 'mobile-cta';
    cta.innerHTML = '<i class="fas fa-clipboard-list" style="margin-right:10px"></i> Register Now';
    document.body.appendChild(cta);
    document.body.classList.add('has-mobile-cta');
}

// ===== ADDITIONAL CSS ANIMATIONS =====
const additionalStyles = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        color: #00b4d8;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: #00b4d8;
        box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
    }
    
    .notification {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
        }
        to {
            transform: translateX(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== FLOATING REGISTER BUTTON =====
function initFloatingRegisterButton() {
    const floatingBtn = document.getElementById('floatingRegisterBtn');
    
    if (!floatingBtn) return;
    
    let isVisible = false;
    let scrollTimeout;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show button after scrolling 200px or when near bottom
        const shouldShow = scrollY > 200 || (scrollY + windowHeight) > (documentHeight - 100);
        
        if (shouldShow && !isVisible) {
            floatingBtn.classList.add('show');
            isVisible = true;
        } else if (!shouldShow && isVisible) {
            floatingBtn.classList.remove('show');
            isVisible = false;
        }
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Hide button after 3 seconds of no scrolling (mobile optimization)
        scrollTimeout = setTimeout(() => {
            if (isVisible && scrollY > 200) {
                floatingBtn.classList.remove('show');
                isVisible = false;
            }
        }, 3000);
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }
    
    function onScroll() {
        ticking = false;
        requestTick();
    }
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Show button immediately on mobile if user has scrolled
    if (window.innerWidth <= 768 && window.scrollY > 100) {
        floatingBtn.classList.add('show');
        isVisible = true;
    }
}

// ===== INITIALIZATION COMPLETE =====
console.log('TEAM NEXT USA Website - JavaScript initialized successfully! 🥋✨'); 
