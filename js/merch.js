/**
 * TEAM NEXT USA — Jersey order (Formspree)
 * Paste your merch Formspree endpoint below when ready.
 */
const MERCH_FORMSPREE_URL = 'https://formspree.io/f/xdabrygw';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('merchOrderForm');
    if (!form) return;

    if (MERCH_FORMSPREE_URL) {
        form.action = MERCH_FORMSPREE_URL;
    }

    // Initialize payment details toggle
    initPaymentDetails();

    // Initialize shipping calculation
    initShippingCalculation();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.merch-submit');
        const originalHtml = submitBtn ? submitBtn.innerHTML : '';

        if (!form.action) {
            alert('Merch orders are not connected yet. Add your Formspree URL at the top of js/merch.js (MERCH_FORMSPREE_URL).');
            return;
        }

        const required = form.querySelectorAll('[required]');
        let ok = true;
        required.forEach(function (field) {
            if (!String(field.value || '').trim()) {
                field.style.borderColor = '#ff6b35';
                ok = false;
            } else {
                field.style.borderColor = '';
            }
        });
        if (!ok) {
            alert('Please fill in all required fields.');
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        const fd = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: fd,
            headers: { Accept: 'application/json' }
        })
            .then(function (res) {
                if (res.ok) {
                    window.location.href = 'thank-you.html';
                } else {
                    throw new Error('submit failed');
                }
            })
            .catch(function () {
                alert('Something went wrong. Please try again or contact us.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalHtml;
                }
            });
    });
});

function initPaymentDetails() {
    const select = document.getElementById('merchPaymentMethod');
    const details = document.getElementById('merchPaymentDetails');
    
    if (!select || !details) return;
    
    const options = details.querySelectorAll('.payment-option');
    
    function updateVisibility() {
        const method = select.value;
        
        options.forEach(opt => {
            const isActive = opt.getAttribute('data-method') === method;
            opt.style.display = isActive ? 'flex' : 'none';
            opt.classList.toggle('active', isActive);
        });
        
        const note = details.querySelector('.payment-note');
        note.style.display = method ? 'block' : 'none';
        details.style.display = method ? 'block' : 'none';
    }
    
    // Initialize
    details.style.display = 'none';
    options.forEach(opt => {
        opt.style.display = 'none';
        opt.classList.remove('active');
    });
    
    // Add event listener
    select.addEventListener('change', updateVisibility);
}

function initShippingCalculation() {
    const shippingCheckbox = document.getElementById('merchShipping');
    const qtyInput = document.getElementById('merchQty');
    const totalDisplays = [
        document.getElementById('merchFormTotal'),
        document.getElementById('totalPriceDisplay')
    ].filter(Boolean);

    if (!shippingCheckbox || !qtyInput || totalDisplays.length === 0) return;
    
    const basePrice = 45;
    
    function updatePrice() {
        const qty = parseInt(qtyInput.value) || 1;
        const hasShipping = shippingCheckbox.checked;
        const shippingFee = hasShipping ? 5 : 0;
        const subtotal = basePrice * qty;
        const total = subtotal + shippingFee;
        
        let priceText = `Total: $${total}`;
        if (qty > 1) {
            priceText = `Subtotal: $${subtotal}`;
            if (hasShipping) {
                priceText += ` + $${shippingFee} shipping = $${total} total`;
            } else {
                priceText += ` = $${total} total`;
            }
        } else if (hasShipping) {
            priceText = `$${subtotal} + $${shippingFee} shipping = $${total} total`;
        }
        
        totalDisplays.forEach(function (el) {
            el.textContent = priceText;
        });
    }
    
    shippingCheckbox.addEventListener('change', updatePrice);
    qtyInput.addEventListener('change', updatePrice);
    qtyInput.addEventListener('input', updatePrice);
    
    // Initialize
    updatePrice();
}
