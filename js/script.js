// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close all other items in the same category
            const parentCategory = item.closest('.faq-category');
            if (parentCategory) {
                parentCategory.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// FAQ Category Filter
const categoryButtons = document.querySelectorAll('.category-btn');
const faqCategories = document.querySelectorAll('.faq-category');

if (categoryButtons.length > 0 && faqCategories.length > 0) {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Show/hide categories based on selection
            faqCategories.forEach(cat => {
                if (category === 'all' || cat.id === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling with Formspree
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff6b6b';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        
        // Send to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                
                // Reset date input to today
                const dateInput = this.querySelector('input[type="date"]');
                if (dateInput) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInput.value = '';
                }
            } else {
                alert('There was a problem sending your message. Please try again or contact us directly.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again or contact us directly.');
        })
        .finally(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
});

// Set minimum date for booking to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + '-' + mm + '-' + dd;
    dateInput.setAttribute('min', formattedToday);
}

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// Newsletter form handling
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        }
    });
});

// Search form handling
const searchForms = document.querySelectorAll('.search-form');
searchForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('input[type="text"]').value;
        
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}\n\nThis is a demo feature. In a real implementation, this would search the blog.`);
        }
    });
});

// Add fade-in animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .blog-post');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Service price calculator (for booking page)
function calculateServicePrice() {
    const serviceSelect = document.getElementById('service');
    const durationSelect = document.getElementById('duration');
    const addons = document.querySelectorAll('input[name="addons"]:checked');
    
    if (serviceSelect && durationSelect) {
        // This would calculate the total price based on service, duration, and add-ons
        // In a real implementation, you would have price data for each service
        console.log('Service price calculation would happen here');
    }
}

// Initialize price calculator if on booking page
if (window.location.pathname.includes('booking.html')) {
    const serviceSelect = document.getElementById('service');
    const durationSelect = document.getElementById('duration');
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
    
    if (serviceSelect) {
        serviceSelect.addEventListener('change', calculateServicePrice);
    }
    if (durationSelect) {
        durationSelect.addEventListener('change', calculateServicePrice);
    }
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateServicePrice);
    });
}

console.log('Emily Frea Massage website loaded successfully!');