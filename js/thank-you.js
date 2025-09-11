// ===== THANK YOU PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Get event data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventData = urlParams.get('eventData');
    
    // Parse and display event information
    if (eventData) {
        try {
            const event = JSON.parse(decodeURIComponent(eventData));
            updateEventInfo(event);
        } catch (e) {
            console.log('No event data found');
        }
    }
    
    // Add particle effects
    createParticles();
    
    // Add sound effects (optional)
    addSoundEffects();
    
    // Add social sharing functionality
    initSocialSharing();
});

function updateEventInfo(event) {
    const eventDate = document.getElementById('eventDate');
    const eventLocation = document.getElementById('eventLocation');
    
    if (eventDate && event.title) {
        // Extract date from title (e.g., "September 14, 2025 - Rego Park, NY")
        const dateMatch = event.title.match(/(\w+ \d+, \d+)/);
        if (dateMatch) {
            eventDate.textContent = dateMatch[1];
        }
    }
    
    if (eventLocation && event.title) {
        // Extract location from title
        const locationMatch = event.title.match(/- (.+)$/);
        if (locationMatch) {
            eventLocation.textContent = locationMatch[1];
        }
    }
}

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['#00b4d8', '#ff6b35', '#ffd23f'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function addSoundEffects() {
    // Add click sound effects (optional)
    const buttons = document.querySelectorAll('.share-btn, .back-home-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Create a subtle click sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('instagram') ? 'instagram' :
                           this.classList.contains('facebook') ? 'facebook' : 'twitter';
            
            const text = "I just registered for Team USA Taekwondo training! 🥋 Ready to train with the best! #TeamNextUSA #Taekwondo";
            const url = window.location.origin;
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'instagram':
                    // Instagram doesn't support direct sharing, so we'll copy to clipboard
                    navigator.clipboard.writeText(text + ' ' + url).then(() => {
                        showNotification('Text copied! Paste it in your Instagram story!');
                    });
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 180, 216, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1000;
        animation: notificationSlide 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notificationSlide {
            0% { transform: translateX(-50%) translateY(-50px); opacity: 0; }
            100% { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationSlide 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some extra gaming-style effects
function addGamingEffects() {
    // Add screen shake effect on success
    setTimeout(() => {
        document.body.style.animation = 'screenShake 0.5s ease-in-out';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes screenShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                75% { transform: translateX(2px); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }, 4000);
}

// Initialize gaming effects
addGamingEffects();

// Add achievement sound effect
setTimeout(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Achievement sound: ascending notes
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}, 4000);