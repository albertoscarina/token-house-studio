// PropertyToken Crowdfunding Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLanguageSwitcher();
    initImageGallery();
    initInvestmentCalculator();
    initAnimations();
    initFormValidation();
    initSmoothScrolling();
    initSidebar();

    // Animate elements on scroll
    observeElements();
});

// Sidebar Management
function initSidebar() {
    // Toggle Sidebar (Mobile)
    window.toggleSidebar = function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('show');
    }

    // Toggle Submenu
    window.toggleSubmenu = function(element) {
        const submenu = element.nextElementSibling;
        const arrow = element.querySelector('.menu-arrow');
        
        // Close other submenus
        document.querySelectorAll('.submenu.show').forEach(menu => {
            if (menu !== submenu) {
                menu.classList.remove('show');
                menu.previousElementSibling.querySelector('.menu-arrow').classList.remove('rotated');
            }
        });
        
        // Toggle current submenu
        submenu.classList.toggle('show');
        arrow.classList.toggle('rotated');
    }

    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.querySelector('.sidebar-toggle');
        
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// Language Switcher
function initLanguageSwitcher() {
    const langOptions = document.querySelectorAll('.lang-option');
    const elementsWithLang = document.querySelectorAll('[data-en][data-id]');

    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            
            // Update active language
            langOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update text content
            elementsWithLang.forEach(element => {
                if (selectedLang === 'en') {
                    element.textContent = element.dataset.en;
                } else {
                    element.textContent = element.dataset.id;
                }
            });
            
            // Store preference in sessionStorage (not localStorage)
            sessionStorage.setItem('preferredLanguage', selectedLang);
        });
    });

    // Load saved language preference
    const savedLang = sessionStorage.getItem('preferredLanguage') || 'en';
    const savedLangOption = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedLangOption) {
        savedLangOption.click();
    }
}

// Image Gallery
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImages = document.querySelectorAll('.main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const targetIndex = this.dataset.target;
            
            // Remove active class from all thumbnails and main images
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            mainImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked thumbnail and corresponding main image
            this.classList.add('active');
            const targetImage = document.querySelector(`[data-gallery="${targetIndex}"]`);
            if (targetImage) {
                targetImage.classList.add('active');
            }
        });
    });

    // Auto-rotate showcase cards
    let currentShowcase = 1;
    const showcaseCards = document.querySelectorAll('.showcase-card');

    setInterval(() => {
        showcaseCards.forEach(card => card.classList.remove('active'));
        currentShowcase = currentShowcase === 1 ? 2 : 1;
        const nextCard = document.querySelector(`[data-property="${currentShowcase}"]`);
        if (nextCard) {
            nextCard.classList.add('active');
        }
    }, 4000);
}

// Investment Calculator
function initInvestmentCalculator() {
    const investmentInput = document.getElementById('investmentAmount');
    const returnSlider = document.getElementById('returnRate');
    const sliderValue = document.querySelector('.slider-value');
    const displayInvestment = document.getElementById('displayInvestment');
    const displayAnnualReturn = document.getElementById('displayAnnualReturn');
    const displayTotalValue = document.getElementById('displayTotalValue');

    function updateCalculations() {
        const investment = parseInt(investmentInput.value) || 0;
        const returnRate = parseInt(returnSlider.value) || 0;
        
        const annualReturn = investment * (returnRate / 100);
        const fiveYearValue = investment * Math.pow(1 + returnRate / 100, 5);
        
        // Update slider display
        sliderValue.textContent = returnRate + '%';
        
        // Update result displays
        displayInvestment.textContent = formatCurrency(investment);
        displayAnnualReturn.textContent = formatCurrency(annualReturn);
        displayTotalValue.textContent = formatCurrency(fiveYearValue);
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Event listeners
    if (investmentInput) {
        investmentInput.addEventListener('input', updateCalculations);
    }

    if (returnSlider) {
        returnSlider.addEventListener('input', updateCalculations);
    }

    // Initial calculation
    updateCalculations();
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Add smooth scrolling to anchor links
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

// Global scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form Validation
function initFormValidation() {
    const proposalForm = document.getElementById('projectProposalForm');

    if (proposalForm) {
        proposalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const projectData = {
                projectName: formData.get('projectName'),
                location: formData.get('projectLocation'),
                fundingAmount: formData.get('fundingAmount'),
                expectedReturn: formData.get('expectedReturn'),
                description: formData.get('projectDescription'),
                developerName: formData.get('developerName'),
                contactEmail: formData.get('contactEmail')
            };
            
            // Validate form data
            if (validateProjectProposal(projectData)) {
                submitProjectProposal(projectData);
            }
        });
    }
}

function validateProjectProposal(data) {
    const errors = [];

    if (!data.projectName || data.projectName.length < 5) {
        errors.push('Project name must be at least 5 characters long');
    }

    if (!data.location || data.location.length < 3) {
        errors.push('Location must be provided');
    }

    if (!data.fundingAmount || data.fundingAmount < 1000000) {
        errors.push('Minimum funding amount is IDR 1,000,000');
    }

    if (!data.expectedReturn || data.expectedReturn < 10 || data.expectedReturn > 30) {
        errors.push('Expected return must be between 10% and 30%');
    }

    if (!data.description || data.description.length < 50) {
        errors.push('Project description must be at least 50 characters long');
    }

    if (!data.developerName || data.developerName.length < 3) {
        errors.push('Developer name must be provided');
    }

    if (!data.contactEmail || !isValidEmail(data.contactEmail)) {
        errors.push('Valid email address is required');
    }

    if (errors.length > 0) {
        showAlert('error', 'Please fix the following errors:\n• ' + errors.join('\n• '));
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitProjectProposal(data) {
    // Show loading state
    const submitBtn = document.querySelector('#projectProposalForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('proposeProjectModal'));
        modal.hide();
        
        // Show success message
        showAlert('success', 'Your project proposal has been submitted successfully! Our team will review it and contact you within 48 hours.');
        
        // Reset form
        document.getElementById('projectProposalForm').reset();
        
        // Track analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'project_proposal_submitted', {
                event_category: 'engagement',
                event_label: 'crowdfunding_page'
            });
        }
    }, 2000);
}

// Alert System
function showAlert(type, message) {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '100px';
    alertContainer.style.right = '20px';
    alertContainer.style.zIndex = '9999';
    alertContainer.style.maxWidth = '400px';

    alertContainer.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2"></i>
            <div>${message}</div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertContainer);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, 5000);
}

// Animations
function initAnimations() {
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('no-animation')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

// Intersection Observer for scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe benefit cards, timeline items, and other elements
    document.querySelectorAll('.benefit-card, .timeline-item, .project-details, .management-card').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.top-navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Progress bar animation for timeline
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Call progress bar animation when timeline section is visible
const timelineSection = document.querySelector('.construction-progress-section');
if (timelineSection) {
    const timelineObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateProgressBars();
            timelineObserver.unobserve(timelineSection);
        }
    }, { threshold: 0.3 });
    timelineObserver.observe(timelineSection);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could also send this to an error tracking service
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Track analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_complete', {
            event_category: 'performance',
            value: Math.round(loadTime)
        });
    }
});
