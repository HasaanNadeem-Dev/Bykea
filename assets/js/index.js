const sliderData = {
    ride: {
        title: "Ride",
        description: "Bykea offers rides on motorbikes, rickshaws, and cars at the lowest fares in Karachi, Lahore and Islamabad. No matter what your destination is, a Bykea is always there for you. Let’s get moving.",
        image: "./assets/img/index/slider/1.png"
    },
    delivery: {
        title: "Delivery",
        description: "Need something delivered? From food and groceries to documents and packages, Bykea's reliable delivery service ensures your items reach their destination safely and on time. Speed and trust, delivered.",
        image: "./assets/img/index/slider/2.png"
    },
    shops: {
        title: "Shops",
        description: "Shop from your favorite local stores without leaving your home. Bykea connects you with a wide range of shops, making it easier than ever to get what you need, when you need it. Convenience at your doorstep.",
        image: "./assets/img/index/slider/3.png"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // --- Top Slider ---
    const topTabs = document.querySelectorAll('#slider-tabs li');
    const sliderTitle = document.getElementById('slider-title');
    const sliderDesc = document.getElementById('slider-description');
    const sliderImg = document.getElementById('slider-image');
    const sliderInnerContent = document.getElementById('slider-inner-content');

    if (topTabs.length > 0) {
        const updateTopSlider = (tab) => {
            topTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const data = sliderData[tab.getAttribute('data-tab')];
            sliderInnerContent.classList.remove('fade-in');
            void sliderInnerContent.offsetWidth;
            sliderInnerContent.classList.add('fade-in');

            sliderTitle.innerText = data.title;
            sliderDesc.innerText = data.description;
            sliderImg.src = data.image;
        };

        topTabs.forEach(tab => tab.addEventListener('click', () => updateTopSlider(tab)));
    }

    // --- App Showcase Slider (Infinite + Auto-Scroll) ---
    const track = document.getElementById('showcase-track');
    const prevBtn = document.getElementById('showcase-prev');
    const nextBtn = document.getElementById('showcase-next');

    if (track && prevBtn && nextBtn) {
        const originalSlides = Array.from(track.children);
        const slideCount = originalSlides.length;

        // Clone slides for infinite loop
        originalSlides.forEach(slide => {
            const cloneBefore = slide.cloneNode(true);
            const cloneAfter = slide.cloneNode(true);
            track.appendChild(cloneAfter);
            track.insertBefore(cloneBefore, track.firstChild);
        });

        let currentIndex = slideCount; // Start at the first original slide
        const scrollInterval = 6000;
        let autoScrollTimer;

        const getItemsPerView = () => {
            if (window.innerWidth <= 650) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        };

        const updateCarousel = (instant = false) => {
            const items = getItemsPerView();
            const itemWidth = 100 / items;
            track.style.transition = instant ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        };

        const checkIndex = () => {
            // If we overshoot the forward clones
            if (currentIndex >= slideCount * 2) {
                currentIndex = slideCount;
                updateCarousel(true);
            }
            // If we overshoot the backward clones
            if (currentIndex < slideCount) {
                currentIndex = slideCount * 2 - 1;
                updateCarousel(true);
            }
        };

        const handleNext = () => {
            currentIndex++;
            updateCarousel();
            setTimeout(checkIndex, 600);
            resetTimer();
        };

        const handlePrev = () => {
            currentIndex--;
            updateCarousel();
            setTimeout(checkIndex, 600);
            resetTimer();
        };

        const startTimer = () => {
            autoScrollTimer = setInterval(handleNext, scrollInterval);
        };

        const resetTimer = () => {
            clearInterval(autoScrollTimer);
            startTimer();
        };

        nextBtn.addEventListener('click', handleNext);
        prevBtn.addEventListener('click', handlePrev);

        window.addEventListener('resize', () => {
            updateCarousel(true);
        });

        // Initialize
        updateCarousel(true);
        startTimer();

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoScrollTimer));
        track.addEventListener('mouseleave', startTimer);
    }

    // --- Flywheel Slider Logic (100% Design Match) ---
    const flyTrack = document.getElementById('flywheel-track');
    const flyPrev = document.getElementById('flywheel-prev');
    const flyNext = document.getElementById('flywheel-next');
    const flyDots = document.querySelectorAll('.dot');

    // Check if elements exist to avoid errors
    if (flyTrack && flyPrev && flyNext) {
        const flySlides = Array.from(flyTrack.children);
        let flyIndex = 0; // Restored variable

        // Initialize first slide
        if (flySlides.length > 0) {
            flySlides[flyIndex].classList.add('active');
            flyDots[flyIndex].classList.add('active');
        }

        const updateFlywheel = () => {
            // Update Slides (Show/Hide)
            flySlides.forEach((slide, index) => {
                if (index === flyIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Update Dots
            flyDots.forEach((dot, index) => {
                if (index === flyIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        flyNext.addEventListener('click', () => {
            if (flyIndex < flySlides.length - 1) {
                flyIndex++;
            } else {
                flyIndex = 0; // Loop back to start
            }
            updateFlywheel();
        });

        flyPrev.addEventListener('click', () => {
            if (flyIndex > 0) {
                flyIndex--;
            } else {
                flyIndex = flySlides.length - 1; // Loop to end
            }
            updateFlywheel();
        });

        // Add click events to dots
        flyDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                flyIndex = index;
                updateFlywheel();
            });
        });
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Prevent background scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Mobile dropdown toggle
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = toggle.parentElement;
                    parent.classList.toggle('active');
                }
            });
        });
    }
});