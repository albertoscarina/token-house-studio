// PropertyToken - My Properties Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 My Properties page initializing...');
    
    // Initialize all components
    initLanguageSwitcher();
    initSidebar();
    initPropertyFilters();
    initAnimations();
    initPropertyActions();
    
    console.log('✅ My Properties page initialized successfully');
});

// Sidebar Management
function initSidebar() {
    console.log('🔧 Initializing sidebar...');
    
    // Toggle Sidebar (Mobile)
    window.toggleSidebar = function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('show');
            console.log('📱 Sidebar toggled');
        }
    }

    // Toggle Submenu
    window.toggleSubmenu = function(element) {
        const submenu = element.nextElementSibling;
        const arrow = element.querySelector('.menu-arrow');
        
        if (!submenu || !arrow) {
            console.warn('⚠️ Submenu or arrow not found');
            return;
        }
        
        // Close other submenus
        document.querySelectorAll('.submenu.show').forEach(menu => {
            if (menu !== submenu) {
                menu.classList.remove('show');
                const otherArrow = menu.previousElementSibling.querySelector('.menu-arrow');
                if (otherArrow) {
                    otherArrow.classList.remove('rotated');
                }
            }
        });
        
        // Toggle current submenu
        submenu.classList.toggle('show');
        arrow.classList.toggle('rotated');
        
        console.log('📂 Submenu toggled');
    }

    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.querySelector('.sidebar-toggle');
        
        if (window.innerWidth <= 768 && sidebar && toggleBtn) {
            if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
                sidebar.classList.remove('show');
                console.log('📱 Sidebar closed (outside click)');
            }
        }
    });
    
    console.log('✅ Sidebar initialized');
}

// Language Switcher
function initLanguageSwitcher() {
    console.log('🌐 Initializing language switcher...');
    
    const langOptions = document.querySelectorAll('.lang-option');
    const elementsWithLang = document.querySelectorAll('[data-en][data-id]');

    if (langOptions.length === 0) {
        console.warn('⚠️ No language options found');
        return;
    }

    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            console.log(`🌐 Language changed to: ${selectedLang}`);
            
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
            
            // Store preference in sessionStorage
            sessionStorage.setItem('preferredLanguage', selectedLang);
        });
    });

    // Load saved language preference
    const savedLang = sessionStorage.getItem('preferredLanguage') || 'en';
    const savedLangOption = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedLangOption) {
        savedLangOption.click();
        console.log(`🌐 Loaded saved language: ${savedLang}`);
    }
    
    console.log('✅ Language switcher initialized');
}

// Property Filter functionality
function initPropertyFilters() {
    console.log('🔍 Initializing property filters...');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    if (filterBtns.length === 0) {
        console.warn('⚠️ No filter buttons found');
        return;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            console.log(`🔍 Filter applied: ${filter}`);
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter properties
            let visibleCount = 0;
            propertyCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    if (card.dataset.category === filter) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
            
            console.log(`🔍 ${visibleCount} properties visible after filter`);
        });
    });
    
    console.log('✅ Property filters initialized');
}

// Animations
function initAnimations() {
    console.log('✨ Initializing animations...');
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn-action').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('no-animation')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });

    // Property card hover animations
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = '';
            }
        });
    });

    // Fade in animation for property cards
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

    // Observe property cards for animation
    document.querySelectorAll('.property-card').forEach(card => {
        observer.observe(card);
    });
    
    console.log('✅ Animations initialized');
}

// Property Actions
function initPropertyActions() {
    console.log('🎯 Initializing property actions...');
    
    // View Details buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('View Details') || btn.textContent.includes('Lihat Detail')) {
            btn.addEventListener('click', function() {
                const propertyCard = this.closest('.property-card');
                const propertyTitle = propertyCard.querySelector('.property-title').textContent;
                handleViewDetails(propertyTitle);
            });
        }
    });

    // Secondary action buttons (Buy More, Sell Shares, etc.)
    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', function() {
            const propertyCard = this.closest('.property-card');
            const propertyTitle = propertyCard.querySelector('.property-title').textContent;
            const actionText = this.textContent.trim();
            handleSecondaryAction(propertyTitle, actionText);
        });
    });

    // Add Property button
    const addPropertyBtn = document.querySelector('.btn.btn-primary');
    if (addPropertyBtn && (addPropertyBtn.textContent.includes('Add Property') || addPropertyBtn.textContent.includes('Tambah Properti'))) {
        addPropertyBtn.addEventListener('click', function() {
            handleAddProperty();
        });
    }
    
    console.log('✅ Property actions initialized');
}

// Action Handlers
function handleViewDetails(propertyTitle) {
    console.log(`👀 View details for: ${propertyTitle}`);
    showNotification(`Viewing details for ${propertyTitle}`, 'info');
    // Here you could redirect to a details page or open a modal
    // window.location.href = `property-details.html?property=${encodeURIComponent(propertyTitle)}`;
}

function handleSecondaryAction(propertyTitle, action) {
    console.log(`🎯 ${action} for: ${propertyTitle}`);
    
    if (action.includes('Buy More') || action.includes('Beli Lagi')) {
        showNotification(`Buy more shares feature for ${propertyTitle} coming soon`, 'info');
    } else if (action.includes('Sell Shares') || action.includes('Jual Saham')) {
        showNotification(`Sell shares feature for ${propertyTitle} coming soon`, 'info');
    } else if (action.includes('Track Status') || action.includes('Lacak Status')) {
        showNotification(`Tracking status for ${propertyTitle}`, 'info');
    } else if (action.includes('Cancel Order') || action.includes('Batalkan Pesanan')) {
        showNotification(`Cancel order feature for ${propertyTitle} coming soon`, 'warning');
    } else {
        showNotification(`${action} feature coming soon`, 'info');
    }
}

function handleAddProperty() {
    console.log('➕ Add new property');
    showNotification('Redirecting to property marketplace...', 'success');
    // Redirect to marketplace or property search
    setTimeout(() => {
        window.location.href = 'index.html#properti';
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    console.log(`📢 Notification: ${message} (${type})`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.875rem;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.top-navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.backgroundColor = 'white';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('🚨 JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`🚀 My Properties page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Track analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_complete', {
            event_category: 'performance',
            event_label: 'my_properties_page',
            value: Math.round(loadTime)
        });
    }
});

// Utility Functions
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

function formatPercentage(value) {
    return `${value.toFixed(1)}%`;
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLanguageSwitcher,
        initSidebar,
        initPropertyFilters,
        initAnimations,
        showNotification,
        formatCurrency,
        formatNumber,
        formatPercentage
    };
}