document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // 1. Sticky Header
    // =========================

    const header = document.querySelector('header');

    const handleScroll = () => {

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();



    // =========================
    // 2. Active Navigation
    // =========================

    const sections =
        document.querySelectorAll('section, .hero-section');

    const navLinks =
        document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {

        let current = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= sectionTop - 150) {

                current = section.getAttribute('id');

            }

        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            if (
                link.getAttribute('href').substring(1) === current
            ) {
                link.classList.add('active');
            }

        });

    });



    // =========================
    // 3. Mobile Menu
    // =========================

    const mobileMenuBtn =
        document.querySelector('.mobile-menu-btn');

    const navContainer =
        document.querySelector('nav');

    if (mobileMenuBtn && navContainer) {

        mobileMenuBtn.addEventListener('click', () => {

            mobileMenuBtn.classList.toggle('active');

            navContainer.classList.toggle('active');

        });

    }

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            if (mobileMenuBtn && navContainer) {

                mobileMenuBtn.classList.remove('active');

                navContainer.classList.remove('active');

            }

        });

    });



    // =========================
    // 4. Hero Slideshow
    // =========================

    const slides =
        document.querySelectorAll('.hero-slide');

    const dots =
        document.querySelectorAll('.slider-dot');

    let currentSlide = 0;

    let slideInterval;

    const showSlide = (index) => {

        slides.forEach(slide =>
            slide.classList.remove('active')
        );

        dots.forEach(dot =>
            dot.classList.remove('active')
        );

        if (slides[index]) {

            slides[index].classList.add('active');

        }

        if (dots[index]) {

            dots[index].classList.add('active');

        }

        currentSlide = index;

    };

    const nextSlide = () => {

        let next =
            (currentSlide + 1) % slides.length;

        showSlide(next);

    };

    const startSlideShow = () => {

        slideInterval =
            setInterval(nextSlide, 5000);

    };

    const stopSlideShow = () => {

        clearInterval(slideInterval);

    };

    dots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            stopSlideShow();

            showSlide(index);

            startSlideShow();

        });

    });

    if (slides.length > 0) {

        startSlideShow();

    }



    // =========================
    // 5. Academic Tabs
    // =========================

    const tabButtons =
        document.querySelectorAll('.academic-tab-btn');

    const panes =
        document.querySelectorAll('.academic-pane');

    tabButtons.forEach(button => {

        button.addEventListener('click', () => {

            const targetPaneId =
                button.getAttribute('data-tab');

            tabButtons.forEach(btn =>
                btn.classList.remove('active')
            );

            panes.forEach(pane =>
                pane.classList.remove('active')
            );

            button.classList.add('active');

            const targetPane =
                document.getElementById(targetPaneId);

            if (targetPane) {

                targetPane.classList.add('active');

            }

        });

    });



    // =========================
    // 6. Testimonial Slider
    // =========================

    const testSlides =
        document.querySelectorAll('.testimonial-slide');

    const prevBtn =
        document.querySelector('.arrow-prev');

    const nextBtn =
        document.querySelector('.arrow-next');

    let currentTest = 0;

    let testInterval;

    const showTestimonial = (index) => {

        testSlides.forEach(slide =>
            slide.classList.remove('active')
        );

        if (testSlides[index]) {

            testSlides[index].classList.add('active');

        }

        currentTest = index;

    };

    const nextTestimonial = () => {

        let next =
            (currentTest + 1) % testSlides.length;

        showTestimonial(next);

    };

    const prevTestimonial = () => {

        let prev =
            (currentTest - 1 + testSlides.length)
            % testSlides.length;

        showTestimonial(prev);

    };

    const startTestimonials = () => {

        testInterval =
            setInterval(nextTestimonial, 7000);

    };

    const stopTestimonials = () => {

        clearInterval(testInterval);

    };

    if (testSlides.length > 0) {

        if (prevBtn) {

            prevBtn.addEventListener('click', () => {

                stopTestimonials();

                prevTestimonial();

                startTestimonials();

            });

        }

        if (nextBtn) {

            nextBtn.addEventListener('click', () => {

                stopTestimonials();

                nextTestimonial();

                startTestimonials();

            });

        }

        startTestimonials();

    }



    // =========================
    // 7. Admission Form
    // =========================

    const enquiryForm =
        document.getElementById('enquiry-form');

    if (enquiryForm) {

        const successAlert =
            document.getElementById('form-success');

        const submitBtn =
            enquiryForm.querySelector(
                '.enquiry-submit-btn'
            );

        const originalBtnText =
            submitBtn.innerHTML;

        enquiryForm.addEventListener(
            'submit',
            function (e) {

                const studentName =
                    document.getElementById(
                        'student-name'
                    ).value.trim();

                const parentName =
                    document.getElementById(
                        'parent-name'
                    ).value.trim();

                const desiredClass =
                    document.getElementById(
                        'desired-class'
                    ).value;

                const phoneNumber =
                    document.getElementById(
                        'phone-number'
                    ).value.trim();

                // Validation

                if (
                    !studentName ||
                    !parentName ||
                    !desiredClass ||
                    !phoneNumber
                ) {

                    e.preventDefault();

                    alert(
                        'Please fill all required fields.'
                    );

                    return;

                }

                // Phone Validation

                const phoneRegex =
                    /^[0-9]{10}$/;

                if (
                    !phoneRegex.test(
                        phoneNumber.replace(
                            /[^0-9]/g,
                            ''
                        )
                    )
                ) {

                    e.preventDefault();

                    alert(
                        'Please enter a valid 10-digit mobile number.'
                    );

                    return;

                }

                // Button Loading

                submitBtn.disabled = true;

                submitBtn.innerHTML =
                    'Submitting...';

                // Success Message

                setTimeout(() => {

                    submitBtn.disabled = false;

                    submitBtn.innerHTML =
                        originalBtnText;

                    if (successAlert) {

                        successAlert.querySelector(
                            '.success-text'
                        ).innerHTML = `
                            <strong>
                                Thank you, ${parentName}!
                            </strong>
                            Admission enquiry for
                            <strong>
                                ${studentName}
                            </strong>
                            has been submitted successfully.
                        `;

                        successAlert.style.display =
                            'flex';

                        setTimeout(() => {

                            successAlert.style.display =
                                'none';

                        }, 8000);

                    }

                }, 1500);

            }
        );

    }



    // =========================
    // 8. Spin Animation
    // =========================

    const style =
        document.createElement('style');

    style.innerHTML = `
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    document.head.appendChild(style);

});