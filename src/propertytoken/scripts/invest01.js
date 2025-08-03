// Investment Flow - Step 1: Property Details
class InvestmentStep1 {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.setupLanguage();
        this.setupEventListeners();
        this.loadPropertyData();
        this.setupAnimations();
    }

    setupLanguage() {
        this.updateLanguage();
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-en][data-id]');
        elements.forEach(element => {
            if (this.currentLanguage === 'id') {
                element.textContent = element.getAttribute('data-id');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
        });
    }

    setupEventListeners() {
        // Language switcher if exists
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLanguage(btn.getAttribute('data-lang'));
            });
        });

        // Tooltip initialization
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipElements.forEach(element => {
            new bootstrap.Tooltip(element);
        });
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateLanguage();
        
        // Update active language button
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    loadPropertyData() {
        // Get property data from URL params or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = urlParams.get('property') || localStorage.getItem('selectedProperty') || '3';
        
        // Mock property data (would come from API in real app)
        const propertyData = {
            id: propertyId,
            name: 'Villa Kulibul',
            location: 'Canggu, Bali',
            image: 'images/villa-kulibul.jpg',
            bedrooms: 3,
            bathrooms: 3,
            area: 152,
            irr: 13,
            ery: 11,
            availability: 81,
            tokensLeft: 56916,
            totalTokens: 70000
        };

        // Store property data for next steps
        localStorage.setItem('currentProperty', JSON.stringify(propertyData));
        
        // Update UI with property data
        this.updatePropertyUI(propertyData);
    }

    updatePropertyUI(property) {
        // Update property name
        const nameElements = document.querySelectorAll('.property-name');
        nameElements.forEach(el => {
            el.setAttribute('data-en', property.name);
            el.setAttribute('data-id', property.name);
        });

        // Update location
        const locationElements = document.querySelectorAll('.property-location span');
        locationElements.forEach(el => {
            el.setAttribute('data-en', property.location);
            el.setAttribute('data-id', property.location);
        });

        // Update image
        const imageElement = document.querySelector('.property-image img');
        if (imageElement) {
            imageElement.src = property.image;
            imageElement.alt = property.name;
        }

        // Update features
        const bedroomElement = document.querySelector('.feature:nth-child(1) span');
        if (bedroomElement) {
            bedroomElement.innerHTML = `${property.bedrooms} <small data-en="Bedrooms" data-id="Kamar Tidur">Bedrooms</small>`;
        }

        const bathroomElement = document.querySelector('.feature:nth-child(2) span');
        if (bathroomElement) {
            bathroomElement.innerHTML = `${property.bathrooms} <small data-en="Bathrooms" data-id="Kamar Mandi">Bathrooms</small>`;
        }

        const areaElement = document.querySelector('.feature:nth-child(3) span');
        if (areaElement) {
            areaElement.innerHTML = `${property.area} <small>sqm</small>`;
        }

        // Update financial info
        const irrElement = document.querySelector('.return-item:nth-child(1) .return-value');
        if (irrElement) {
            irrElement.textContent = `${property.irr}%`;
        }

        const eryElement = document.querySelector('.return-item:nth-child(2) .return-value');
        if (eryElement) {
            eryElement.textContent = `${property.ery}%`;
        }

        // Update availability
        const availabilityFill = document.querySelector('.availability-fill');
        if (availabilityFill) {
            availabilityFill.style.width = `${property.availability}%`;
        }

        const percentageElement = document.querySelector('.percentage');
        if (percentageElement) {
            percentageElement.textContent = `${property.availability}%`;
        }

        const tokensLeftElement = document.querySelector('.tokens-left');
        if (tokensLeftElement) {
            tokensLeftElement.setAttribute('data-en', `${property.tokensLeft.toLocaleString()} tokens left`);
            tokensLeftElement.setAttribute('data-id', `${property.tokensLeft.toLocaleString()} token tersisa`);
        }

        // Re-apply language
        this.updateLanguage();
    }

    setupAnimations() {
        // Add fade-in animation
        const container = document.querySelector('.property-container');
        if (container) {
            container.classList.add('fade-in');
        }
    }

    // Navigation methods
    goBack() {
        window.history.back();
    }

    proceedToInvest() {
        // Show loading state
        const buyBtn = document.querySelector('.btn-buy');
        if (buyBtn) {
            buyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-en="Loading..." data-id="Memuat...">Loading...</span>';
            buyBtn.disabled = true;
        }

        // Simulate loading and proceed to next step
        setTimeout(() => {
            window.location.href = 'invest02.html';
        }, 1000);
    }

    // Utility methods
    formatCurrency(amount, currency = 'IDR') {
        return `${currency}${amount.toLocaleString()}`;
    }

    showToast(message, type = 'info') {
        // Create toast element if not exists
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }

        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="fas fa-info-circle text-${type} me-2"></i>
                    <strong class="me-auto">Notification</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
}

// Global functions for HTML onclick handlers
function proceedToInvest() {
    if (window.investmentStep1) {
        window.investmentStep1.proceedToInvest();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.investmentStep1 = new InvestmentStep1();
    console.log('🏠 Investment Step 1 initialized');
});