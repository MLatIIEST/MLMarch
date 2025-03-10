// Animations Module - Handles visual animations and effects that don't require authentication

// Loading Animation
function setupLoadingAnimation() {
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.loader-wrapper').classList.add('fade-out');
        }, 2000);
    });
}

// Navigation Bar Scroll Effect
function setupScrollEffect() {
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Mobile Navigation
function setupMobileNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Toggle Burger Animation
            burger.classList.toggle('toggle');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Skip certain elements
            if (this.getAttribute('href') === '#') return;
            
            // Skip dashboard UI elements
            if (this.id === 'dashboard-link' || 
                this.id === 'logout-btn' || 
                this.id === 'show-register' || 
                this.id === 'show-login' ||
                this.hasAttribute('data-tab')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100 && itemBottom > 0) {
            item.classList.add('fade-in');
        }
    });
}

function setupTimelineAnimation() {
    // Run animation on page load
    window.addEventListener('load', animateTimeline);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateTimeline);
}

// Image Slider
function setupImageSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let autoSlideInterval = null;
    const slideWidth = 100; // percentage

    // If slider elements exist
    if (slider && slides.length > 0) {
        function goToSlide(index) {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            slider.style.transform = `translateX(-${index * slideWidth}%)`;
            currentSlide = index;
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
            
            nextBtn.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }

        // Auto slide
        startAutoSlide();

        // Pause auto slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        // Resume auto slide on mouse leave
        slider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Start auto slide
        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        }
    }
}

// Active navigation based on scroll position
function setupActiveNavOnScroll() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === current) {
                link.classList.add('active');
            }
        });
    });
}

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Toggle theme function
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Toggle icon
            themeIcon.classList.toggle('fa-moon');
            themeIcon.classList.toggle('fa-sun');
        }
        
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }
}

// Initialize all animations
function initAnimations() {
    setupLoadingAnimation();
    setupScrollEffect();
    setupMobileNavigation();
    setupSmoothScroll();
    setupTimelineAnimation();
    setupImageSlider();
    setupActiveNavOnScroll();
    setupThemeToggle();
}

// Execute animations initialization
document.addEventListener('DOMContentLoaded', initAnimations);