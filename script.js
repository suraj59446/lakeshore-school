document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    // 2. Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section, .hero-section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    // 3. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navContainer.classList.toggle('active');
    });
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navContainer.classList.remove('active');
        });
    });
    // 4. Hero Background Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;
    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };
    const nextSlide = () => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };
    const startSlideShow = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };
    const stopSlideShow = () => {
        clearInterval(slideInterval);
    };
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });
    // Start slideshow automatically
    if (slides.length > 0) {
        startSlideShow();
    }
    // 5. Academics Interactive Tabs
    const tabButtons = document.querySelectorAll('.academic-tab-btn');
    const panes = document.querySelectorAll('.academic-pane');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPaneId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            panes.forEach(pane => pane.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(targetPaneId).classList.add('active');
        });
    });
    // 6. Testimonial Carousel
    const testSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.arrow-prev');
    const nextBtn = document.querySelector('.arrow-next');
    let currentTest = 0;
    let testInterval;
    const showTestimonial = (index) => {
        testSlides.forEach(slide => slide.classList.remove('active'));
        testSlides[index].classList.add('active');
        currentTest = index;
    };
    const nextTestimonial = () => {
        let next = (currentTest + 1) % testSlides.length;
        showTestimonial(next);
    };
    const prevTestimonial = () => {
        let prev = (currentTest - 1 + testSlides.length) % testSlides.length;
        showTestimonial(prev);
    };
    const startTestimonials = () => {
        testInterval = setInterval(nextTestimonial, 7000);
    };
    const stopTestimonials = () => {
        clearInterval(testInterval);
    };
    if (testSlides.length > 0) {
        // Event Listeners
        prevBtn.addEventListener('click', () => {
            stopTestimonials();
            prevTestimonial();
            startTestimonials();
        });
        nextBtn.addEventListener('click', () => {
            stopTestimonials();
            nextTestimonial();
            startTestimonials();
        });
        startTestimonials();
    }
    // 7. Interactive Form Validation & Submission
    const enquiryForm = document.getElementById('enquiry-form');
    const successAlert = document.getElementById('form-success');
    const submitBtn = enquiryForm.querySelector('.enquiry-submit-btn');
    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get Form Values
        const studentName = document.getElementById('student-name').value.trim();
        const parentName = document.getElementById('parent-name').value.trim();
        const desiredClass = document.getElementById('desired-class').value;
        const phoneNumber = document.getElementById('phone-number').value.trim();
        const message = document.getElementById('message').value.trim();
        // Simple validation
        if (!studentName || !parentName || !desiredClass || !phoneNumber) {
            alert('Please fill out all required fields.');
            return;
        }
        // Phone Validation (must be dynamic numeric)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber.replace(/[^0-9]/g, ''))) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        // Disable button & show sending state
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <svg class="animate-spin" style="width:20px;height:20px;animation:spin 1s linear infinite;margin-right:8px;display:inline-block;vertical-align:middle;" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity:0.25;"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
        `;
        // Simulate API call (1.5 seconds)
        setTimeout(() => {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            // Update Success Alert Content
            successAlert.querySelector('.success-text').innerHTML = `
                <strong>Thank you, ${parentName}!</strong> Admission enquiry for <strong>${studentName}</strong> (Class: ${desiredClass}) has been submitted successfully. Our admission team will contact you shortly on <strong>${phoneNumber}</strong>.
            `;
            
            // Show alert
            successAlert.style.display = 'flex';
            
            // Reset Form
            enquiryForm.reset();
            // Auto scroll to success message
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Hide alert after 8 seconds
            setTimeout(() => {
                successAlert.style.display = 'none';
            }, 10000);
        }, 1500);
    });
    // Add inline keyframe spin styles for form loading
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});