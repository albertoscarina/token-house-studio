// Investment Flow - Step 2: Order Details
class InvestmentStep2 {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.tokenQuantity = 1;
        this.pricePerToken = 10000;
        this.useBalance = false;
        this.property = null;
        this.init();
    }

    init() {
        this.loadPropertyData();
        this.setupLanguage();
        this.setupEventListeners();
        this.updatePricing();
        this.setupAnimations();
    }

    loadPropertyData() {
        // Get property data from localStorage
        const propertyData = localStorage.getItem('currentProperty');
        if (propertyData) {
            this.property = JSON.parse(propertyData);
            this.updatePropertyUI();
        } else {
            // Fallback data
            this.property = {
                name: 'Villa Kulibul',
                location: 'Canggu, Bali',
                image: 'images/villa-kulibul.jpg',
                tokensLeft: 56913
            };
            this.updatePropertyUI();
        }
    }

    updatePropertyUI() {
        if (!this.property) return;

        // Update property image
        const imageElement = document.querySelector('.property-thumbnail img');
        if (imageElement) {
            imageElement.src = this.property.image;
            imageElement.alt = this.property.name;
        }

        // Update property name
        const nameElement = document.querySelector('.property-details .property-name');
        if (nameElement) {
            nameElement.setAttribute('data-en', this.property.name);
            nameElement.setAttribute('data-id', this.property.name);
        }

        // Update location
        const locationElement = document.querySelector('.property-details .property-location');
        if (locationElement) {
            locationElement.setAttribute('data-en', this.property.location);
            locationElement.setAttribute('data-id', this.property.location);
        }

        // Update tokens available
        const tokensElement = document.querySelector('.tokens-available');
        if (tokensElement) {
            const tokensText = `(${this.property.tokensLeft.toLocaleString()} tokens available)`;
            const tokensTextId = `(${this.property.tokensLeft.toLocaleString()} token tersedia)`;
            tokensElement.setAttribute('data-en', tokensText);
            tokensElement.setAttribute('data-id', tokensTextId);
        }
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
        // Quantity selector buttons are handled by global functions
        
        // Balance toggle
        const balanceCheckbox = document.getElementById('useBalance');
        if (balanceCheckbox) {
            balanceCheckbox.addEventListener('change', (e) => {
                this.toggleBalance();
            });
        }

        // Language switcher if exists
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLanguage(btn.getAttribute('data-lang'));
            });
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

    adjustQuantity(change) {
        const newQuantity = this.tokenQuantity + change;
        
        // Validate quantity
        if (newQuantity < 1) {
            this.showToast(
                this.currentLanguage === 'id' ? 'Minimal 1 token' : 'Minimum 1 token',
                'warning'
            );
            return;
        }
        
        if (newQuantity > this.property.tokensLeft) {
            this.showToast(
                this.currentLanguage === 'id' ? 'Melebihi token yang tersedia' : 'Exceeds available tokens',
                'warning'
            );
            return;
        }

        this.tokenQuantity = newQuantity;
        this.updateQuantityDisplay();
        this.updatePricing();
        
        // Add animation to quantity change
        const quantityDisplay = document.getElementById('tokenQuantity');
        if (quantityDisplay) {
            quantityDisplay.style.transform = 'scale(1.1)';
            setTimeout(() => {
                quantityDisplay.style.transform = 'scale(1)';
            }, 150);
        }
    }

    updateQuantityDisplay() {
        const quantityElement = document.getElementById('tokenQuantity');
        if (quantityElement) {
            quantityElement.textContent = this.tokenQuantity;
        }
    }

    updatePricing() {
        const orderTotal = this.tokenQuantity * this.pricePerToken;
        
        // Update order total
        const orderTotalElement = document.getElementById('orderTotal');
        if (orderTotalElement) {
            orderTotalElement.textContent = this.formatCurrency(orderTotal);
        }

        // Update total payment (considering balance usage)
        const totalPayment = this.useBalance ? Math.max(0, orderTotal - 50000) : orderTotal; // Assuming 50k balance
        const totalPaymentElement = document.getElementById('totalPayment');
        if (totalPaymentElement) {
            totalPaymentElement.textContent = this.formatCurrency(totalPayment);
        }

        // Store order data for next step
        const orderData = {
            property: this.property,
            quantity: this.tokenQuantity,
            pricePerToken: this.pricePerToken,
            orderTotal: orderTotal,
            useBalance: this.useBalance,
            totalPayment: totalPayment
        };
        localStorage.setItem('currentOrder', JSON.stringify(orderData));
    }

    toggleBalance() {
        this.useBalance = !this.useBalance;
        const checkbox = document.getElementById('useBalance');
        if (checkbox) {
            checkbox.checked = this.useBalance;
        }
        this.updatePricing();
        
        // Show feedback
        const message = this.useBalance 
            ? (this.currentLanguage === 'id' ? 'Saldo akan digunakan' : 'Balance will be used')
            : (this.currentLanguage === 'id' ? 'Saldo tidak digunakan' : 'Balance will not be used');
        this.showToast(message, 'info');
    }

    setupAnimations() {
        // Add slide-in animation
        const container = document.querySelector('.order-container');
        if (container) {
            container.classList.add('slide-in-right');
        }

        // Animate progress step
        setTimeout(() => {
            const activeStep = document.querySelector('.step.active .step-number');
            if (activeStep) {
                activeStep.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    activeStep.style.transform = 'scale(1)';
                }, 300);
            }
        }, 500);
    }

    proceedToSummary() {
        // Validate order
        if (this.tokenQuantity < 1) {
            this.showToast(
                this.currentLanguage === 'id' ? 'Pilih jumlah token' : 'Select token quantity',
                'warning'
            );
            return;
        }

        // Show loading state
        const nextBtn = document.querySelector('.btn-next');
        if (nextBtn) {
            const originalText = nextBtn.innerHTML;
            nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-en="Processing..." data-id="Memproses...">Processing...</span>';
            nextBtn.disabled = true;
            
            // Proceed to next step
            setTimeout(() => {
                window.location.href = 'invest03.html';
            }, 1000);
        }
    }

    goBack() {
        window.history.back();
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
function adjustQuantity(change) {
    if (window.investmentStep2) {
        window.investmentStep2.adjustQuantity(change);
    }
}

function toggleBalance() {
    if (window.investmentStep2) {
        window.investmentStep2.toggleBalance();
    }
}

function proceedToSummary() {
    if (window.investmentStep2) {
        window.investmentStep2.proceedToSummary();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.investmentStep2 = new InvestmentStep2();
    console.log('💰 Investment Step 2 initialized');
});