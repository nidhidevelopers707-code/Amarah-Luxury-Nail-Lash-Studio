// Mobile Menu Functions
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (!navbar.contains(event.target)) {
        closeMobileMenu();
    }
});

// Slider Variables
let currentSlideIndex = 1;
let slideTimer;

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlideIndex);
    startAutoSlide();
    initializeIntersectionObserver();
});

// Auto-advance slides every 5 seconds
function startAutoSlide() {
    slideTimer = setInterval(function() {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 5000);
}

// Reset timer on manual navigation
function resetAutoSlide() {
    clearInterval(slideTimer);
    startAutoSlide();
}

// Next/Previous slide control
function changeSlide(n) {
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Goto specific slide
function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Show specific slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    // Wrap around if index goes beyond slides
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    // Show current slide
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }

    // Highlight current indicator
    if (indicators[currentSlideIndex - 1]) {
        indicators[currentSlideIndex - 1].classList.add('active');
    }
}

// Gallery Modal Functions
function openGalleryModal(imageSrc) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    modal.classList.add('active');
    modalImage.src = imageSrc;
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Toggle FAQ items
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    
    // Close other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        }
    });

    // Toggle current item
    faqItem.classList.toggle('active');
    answer.classList.toggle('active');
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const message = form.querySelector('textarea').value;

    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    console.log('Message sent:', {
        name: name,
        email: email,
        phone: phone,
        message: message
    });

    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    form.reset();
}

// Send contact form details to client's WhatsApp
function handleContactWhatsApp(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const message = formData.get('message') || '';

    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in name, email and message.', 'error');
        return;
    }

    const text = `New contact from website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`;
    const encoded = encodeURIComponent(text);

    // Client's WhatsApp number (India) without + or dashes
    const clientNumber = '919100550030'; // +91 9100550030

    // Redirect to WhatsApp Web / App
    window.location.href = `https://wa.me/${clientNumber}?text=${encoded}`;

    // Optionally reset the form (this will not run if user is taken to WhatsApp immediately in some browsers)
    try { form.reset(); } catch (e) {}
}

// Handle booking form submission
function handleBooking(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const date = formData.get('date');
    const time = formData.get('time');
    const notes = formData.get('notes');
    
    // Create WhatsApp message
    const message = `Hello! I would like to book an appointment at Amarah Luxury.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nTime: ${time}\nNotes: ${notes || 'None'}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Replace with your owner's WhatsApp number (include country code, no spaces or dashes)
    // Example: 919876543210 for India +91-9876543210
    const whatsappNumber = '919100550030'; // Owner's WhatsApp number
    
    // Redirect to WhatsApp
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    form.reset();
}

// Handle newsletter subscription
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    console.log('Newsletter subscription:', { email: email });
    showNotification('Thank you for subscribing! Check your email for special offers.', 'success');
    form.reset();
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 9999;
        animation: slideInRight 0.4s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Intersection Observer for animations on scroll
function initializeIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.service-card, .pricing-card, .gallery-item, .team-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add keyboard navigation for slider
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (event.key === 'ArrowRight') {
        changeSlide(1);
    } else if (event.key === 'Escape') {
        closeGalleryModal();
    }
});

// Close gallery modal when clicking outside image
document.getElementById('galleryModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeGalleryModal();
    }
});

// Add scroll-to-top button
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) {
        const btn = document.createElement('button');
        btn.id = 'scrollTopBtn';
        btn.innerHTML = '↑';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #C41E3A 0%, #E85D6F 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
            z-index: 999;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(196, 30, 58, 0.3);
        `;
        document.body.appendChild(btn);
        
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const btn = document.getElementById('scrollTopBtn');
    if (window.pageYOffset > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});

// Before & After slider
function initBeforeAfter() {
    const range = document.getElementById('baRange');
    const before = document.getElementById('baBefore');
    if (!range || !before) return;

    function updateBefore() {
        const val = Number(range.value);
        before.style.width = val + '%';
    }

    range.addEventListener('input', updateBefore);
    // initialize
    updateBefore();
}

// Gift modal functions
function openGiftModal() {
    const modal = document.getElementById('giftModal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleGiftPurchase(e) {
    e.preventDefault();
    const form = e.target;
    const recipient = form.recipient.value;
    const email = form.recipientEmail.value;
    const amount = form.amount.value;

    if (!recipient || !email || !amount) {
        showNotification('Please complete all gift card fields', 'error');
        return;
    }

    // simulate purchase
    console.log('Gift purchase:', { recipient, email, amount });
    showNotification(`Gift card $${amount} sent to ${recipient}`, 'success');
    closeGiftModal();
    form.reset();
}

// Membership CTA (placeholder)
function openMembership() {
    showNotification('Membership signup coming soon — we will contact you!', 'success');
    // optionally scroll to booking
    const booking = document.getElementById('booking');
    if (booking) booking.scrollIntoView({ behavior: 'smooth' });
}

// Quick CTA: scroll to booking and show confirmation
function goToBooking() {
    const booking = document.getElementById('booking');
    if (booking) {
        booking.scrollIntoView({ behavior: 'smooth' });
        showNotification('Great! Please choose your service and preferred date/time on the booking form.', 'success');
    } else {
        showNotification('Booking section not available right now.', 'error');
    }
}

// Close gift modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('giftModal');
    if (!modal) return;
    if (modal.classList.contains('active') && e.target === modal) {
        closeGiftModal();
    }
});

// Initialize before/after on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initBeforeAfter();
    // ensure gift form listener
    const giftForm = document.getElementById('giftForm');
    if (giftForm) giftForm.addEventListener('submit', handleGiftPurchase);
});

// Hero video controls
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const playBtn = document.getElementById('heroPlayBtn');
    const muteBtn = document.getElementById('heroMuteBtn');

    if (!video) return;

    // Ensure video starts muted for autoplay compatibility
    video.muted = true;

    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '⏸';
            } else {
                video.pause();
                playBtn.innerHTML = '▶';
            }
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', function() {
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? '🔈' : '🔊';
        });
    }

    // Update UI state based on video playback
    video.addEventListener('play', function() { if (playBtn) playBtn.innerHTML = '⏸'; });
    video.addEventListener('pause', function() { if (playBtn) playBtn.innerHTML = '▶'; });
});
