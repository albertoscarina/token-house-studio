// Investment Flow - Step 3: Order Summary
class InvestmentStep3 {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.orderData = null;
        this.init();
    }

    init() {
        this.loadOrderData();
        this.setupLanguage();
        this.setupEventListeners();
        this.updateSummaryUI();
        this.setupAnimations();
    }

    loadOrderData() {
        // Get order data from localStorage
        const orderDataStr = localStorage.getItem('currentOrder');
        if (orderDataStr) {
            this.orderData = JSON.parse(orderDataStr);
        } else {
            // Fallback data
            this.orderData = {
                property: {
                    name: 'Villa Kulibul',
                    location: 'Canggu, Bali'
                },
                quantity: 100,
                pricePerToken: 10000,
                orderTotal: 1000000,
                useBalance: false,
                totalPayment: 1000000
            };
        }
    }

    updateSummaryUI() {
        if (!this.orderData) return;

        // Update property name in first row
        const propertyRow = document.querySelector('.summary-row:first-child .detail-label');
        if (propertyRow) {
            propertyRow.setAttribute('data-en', this.orderData.property.name);
            propertyRow.setAttribute('data-id', this.orderData.property.name);
        }

        // Update price per token
        const priceRow = document.querySelector('.summary-row:first-child .detail-value');
        if (priceRow) {
            const priceText = `IDR${this.orderData.pricePerToken.toLocaleString()}/token`;
            priceRow.setAttribute('data-en', priceText);
            priceRow.setAttribute('data-id', priceText);
        }

        // Update number of tokens
        const tokensElement = document.getElementById('summaryTokens');
        if (tokensElement) {
            tokensElement.textContent = this.orderData.quantity;
        }

        // Update order total
        const orderTotalElement = document.getElementById('summaryOrderTotal');
        if (orderTotalElement) {
            orderTotalElement.textContent = this.formatCurrency(this.orderData.orderTotal);
        }

        // Update total payment
        const totalPaymentElement = document.getElementById('summaryTotalPayment');
        if (totalPaymentElement) {
            totalPaymentElement.textContent = this.formatCurrency(this.orderData.totalPayment);
        }

        // Update rent distribution date
        const rentDate = new Date();
        rentDate.setMonth(rentDate.getMonth() + 1);
        const rentDistribution = document.querySelector('.rent-info');
        if (rentDistribution) {
            const dateStr = rentDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            const dateStrId = rentDate.toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            
            rentDistribution.setAttribute('data-en', `Next expected rent distribution: ${dateStr}`);
            rentDistribution.setAttribute('data-id', `Distribusi sewa selanjutnya: ${dateStrId}`);
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

    setupAnimations() {
        // Add fade-in animation
        const container = document.querySelector('.summary-container');
        if (container) {
            container.classList.add('fade-in');
        }

        // Animate progress steps
        setTimeout(() => {
            const completedStep = document.querySelector('.step.completed .step-number');
            if (completedStep) {
                completedStep.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    completedStep.style.transform = 'scale(1)';
                }, 300);
            }
        }, 300);

        setTimeout(() => {
            const activeStep = document.querySelector('.step.active .step-number');
            if (activeStep) {
                activeStep.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    activeStep.style.transform = 'scale(1)';
                }, 300);
            }
        }, 600);
    }

    goToPrevious() {
        window.history.back();
    }

    proceedToPayment() {
        // Validate order data
        if (!this.orderData || this.orderData.quantity < 1) {
            this.showToast(
                this.currentLanguage === 'id' ? 'Data pesanan tidak valid' : 'Invalid order data',
                'error'
            );
            return;
        }

        // Show loading state
        const proceedBtn = document.querySelector('.btn-proceed');
        if (proceedBtn) {
            const originalText = proceedBtn.innerHTML;
            proceedBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-en="Processing..." data-id="Memproses...">Processing...</span>';
            proceedBtn.disabled = true;
            
            // Store final order for payment processing
            const finalOrder = {
                ...this.orderData,
                orderDate: new Date().toISOString(),
                orderId: this.generateOrderId(),
                status: 'pending'
            };
            localStorage.setItem('finalOrder', JSON.stringify(finalOrder));
            
            // Proceed to payment
            setTimeout(() => {
                window.location.href = 'invest04.html';
            }, 1000);
        }
    }

    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `ORD-${timestamp}-${random}`;
    }

    // Utility methods
    formatCurrency(amount, currency = 'IDR') {
        return `${currency} ${amount.toLocaleString()}`;
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
function goToPrevious() {
    if (window.investmentStep3) {
        window.investmentStep3.goToPrevious();
    }
}

function proceedToPayment() {
    if (window.investmentStep3) {
        window.investmentStep3.proceedToPayment();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.investmentStep3 = new InvestmentStep3();
    console.log('📋 Investment Step 3 initialized');
});