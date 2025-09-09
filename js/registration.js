// ===== REGISTRATION PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initEventSelection();
    initPaymentDetails();
    initCampShirtToggle();
    initFormValidation();
});

// ===== EVENT SELECTION =====
function initEventSelection() {
    const eventCards = document.querySelectorAll('.event-card');
    const selectEventBtns = document.querySelectorAll('.select-event-btn');
    const registrationFormSection = document.getElementById('registrationForm');
    const selectedEventName = document.getElementById('selectedEventName');
    const selectedEventField = document.getElementById('selectedEventField');
    const eventDataField = document.getElementById('eventDataField');
    const changeEventBtn = document.getElementById('changeEventBtn');
    const registrationFormElement = document.getElementById('registrationFormElement');

    const eventData = {
        sept14: {
            title: 'September 14, 2025 - Rego Park, NY',
            formspreeUrl: 'https://formspree.io/f/mwpqzrwe',
            zelleEmail: 'csuhtkd@gmail.com'
        },
        sept27: {
            title: 'September 27, 2025 - Bakersfield, CA',
            formspreeUrl: 'https://formspree.io/f/xdklyjlg',
            zelleEmail: 'csuhtkd@gmail.com'
        },
        sept28: {
            title: 'September 28, 2025 - Chatsworth, CA',
            formspreeUrl: 'https://formspree.io/f/mjkejzey',
            zelleEmail: 'csuhtkd@gmail.com'
        }
    };

    function selectEvent(eventId) {
        const event = eventData[eventId];
        if (!event) return;

        // Update selected event display
        selectedEventName.textContent = event.title;
        selectedEventField.value = eventId;
        eventDataField.value = JSON.stringify(event);

        // Update form action
        registrationFormElement.action = event.formspreeUrl;

        // Show registration form
        registrationFormSection.style.display = 'block';
        registrationFormSection.scrollIntoView({ behavior: 'smooth' });

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('event', eventId);
        window.history.pushState({}, '', url);

        // Initialize form components
        initPaymentDetails();
        initCampShirtToggle();
    }

    function changeEvent() {
        // Hide registration form
        registrationFormSection.style.display = 'none';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Remove event from URL
        const url = new URL(window.location);
        url.searchParams.delete('event');
        window.history.pushState({}, '', url);
    }

    // Event listeners
    selectEventBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event');
            selectEvent(eventId);
        });
    });

    eventCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button
            if (e.target.closest('.select-event-btn')) return;
            
            const eventId = this.getAttribute('data-event');
            selectEvent(eventId);
        });
    });

    changeEventBtn.addEventListener('click', changeEvent);

    // Check for event in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const eventFromUrl = urlParams.get('event');
    if (eventFromUrl && eventData[eventFromUrl]) {
        selectEvent(eventFromUrl);
    }
}

// ===== PAYMENT DETAILS =====
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
        
        const note = details.querySelector('.payment-note');
        note.style.display = method ? 'block' : 'none';
        details.style.display = method ? 'block' : 'none';
    }
    
    // Initialize
    details.style.display = 'none';
    options.forEach(opt => (opt.style.display = 'none'));
    
    // Add event listener
    select.addEventListener('change', updateVisibility);
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

// ===== FORM VALIDATION =====
function initFormValidation() {
    const form = document.getElementById('registrationFormElement');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff6b35';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Submit form
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success - redirect to thank you page
                window.location.href = 'thank-you.html';
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your registration. Please try again.');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
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