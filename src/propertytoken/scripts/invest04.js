// Investment Flow - Step 4: Payment Methods
class InvestmentStep4 {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.finalOrder = null;
        this.selectedPaymentMethod = null;
        this.paymentDeadline = null;
        this.init();
    }

    init() {
        this.loadOrderData();
        this.setupLanguage();
        this.setupEventListeners();
        this.updatePaymentUI();
        this.setupPaymentDeadline();
        this.setupAnimations();
    }

    loadOrderData() {
        // Get final order data from localStorage
        const orderDataStr = localStorage.getItem('finalOrder');
        if (orderDataStr) {
            this.finalOrder = JSON.parse(orderDataStr);
        } else {
            // Fallback data
            this.finalOrder = {
                property: {
                    name: 'Villa Kulibul',
                    location: 'Canggu, Bali'
                },
                quantity: 100,
                totalPayment: 1000000,
                orderId: 'ORD-' + Date.now()
            };
        }
    }

    updatePaymentUI() {
        if (!this.finalOrder) return;

        // Update order description
        const orderDescription = document.querySelector('.order-description');
        if (orderDescription) {
            const description = `${this.finalOrder.property.name} (${this.finalOrder.quantity} tokens)`;
            const descriptionId = `${this.finalOrder.property.name} (${this.finalOrder.quantity} token)`;
            orderDescription.setAttribute('data-en', description);
            orderDescription.setAttribute('data-id', descriptionId);
        }

        // Update payment amount
        const amountElement = document.querySelector('.amount');
        if (amountElement) {
            amountElement.textContent = this.formatCurrency(this.finalOrder.totalPayment);
        }
    }

    setupPaymentDeadline() {
        // Set payment deadline (24 hours from now)
        this.paymentDeadline = new Date();
        this.paymentDeadline.setHours(this.paymentDeadline.getHours() + 24);
        
        const deadlineElement = document.querySelector('.deadline-text');
        if (deadlineElement) {
            const deadlineStr = this.paymentDeadline.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).toUpperCase();
            
            const deadlineStrId = this.paymentDeadline.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).toUpperCase();
            
            deadlineElement.setAttribute('data-en', `PAY BEFORE ${deadlineStr}`);
            deadlineElement.setAttribute('data-id', `BAYAR SEBELUM ${deadlineStrId}`);
        }

        // Start countdown timer
        this.startCountdown();
    }

    startCountdown() {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const deadline = this.paymentDeadline.getTime();
            const timeLeft = deadline - now;

            if (timeLeft > 0) {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                // Update deadline display with remaining time
                const deadlineElement = document.querySelector('.deadline-text');
                if (deadlineElement) {
                    const timeRemaining = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    const currentText = deadlineElement.textContent;
                    const baseText = currentText.split(' - ')[0];
                    deadlineElement.textContent = `${baseText} - ${timeRemaining}`;
                }
            } else {
                // Payment deadline expired
                this.handlePaymentExpired();
            }
        };

        // Update every second
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    handlePaymentExpired() {
        this.showToast(
            this.currentLanguage === 'id' ? 'Waktu pembayaran telah habis' : 'Payment time has expired',
            'error'
        );
        
        // Redirect back to previous step
        setTimeout(() => {
            window.location.href = 'invest03.html';
        }, 3000);
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
        // Language selector
        const languageSelect = document.querySelector('.language-selector select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                const selectedLang = e.target.value === 'Bahasa Indonesia' ? 'id' : 'en';
                this.switchLanguage(selectedLang);
            });
        }

        // Payment category toggles are handled by global function
        
        // View button
        const viewBtn = document.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                this.showOrderDetails();
            });
        }
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateLanguage();
    }

    togglePaymentCategory(headerElement) {
        const category = headerElement.closest('.payment-category');
        const options = category.querySelector('.payment-options');
        const isActive = category.classList.contains('active');

        // Close all other categories
        document.querySelectorAll('.payment-category').forEach(cat => {
            if (cat !== category) {
                cat.classList.remove('active');
                const otherOptions = cat.querySelector('.payment-options');
                if (otherOptions) {
                    otherOptions.classList.remove('active');
                }
            }
        });

        // Toggle current category
        category.classList.toggle('active');
        if (options) {
            options.classList.toggle('active');
        }

        // Update chevron
        const chevron = headerElement.querySelector('.fas.fa-chevron-up, .fas.fa-chevron-down');
        if (chevron) {
            chevron.className = category.classList.contains('active') 
                ? 'fas fa-chevron-up' 
                : 'fas fa-chevron-down';
        }
    }

    selectPaymentMethod(type, method) {
        this.selectedPaymentMethod = { type, method };
        
        // Show loading and process payment
        this.showToast(
            this.currentLanguage === 'id' ? `Memproses pembayaran dengan ${method}...` : `Processing payment with ${method}...`,
            'info'
        );

        // Simulate payment processing
        setTimeout(() => {
            this.processPayment();
        }, 2000);
    }

    processPayment() {
        // Update order status
        if (this.finalOrder) {
            this.finalOrder.paymentMethod = this.selectedPaymentMethod;
            this.finalOrder.paymentDate = new Date().toISOString();
            this.finalOrder.status = 'paid';
            localStorage.setItem('completedOrder', JSON.stringify(this.finalOrder));
        }

        // Redirect to success page
        window.location.href = 'invest05.html';
    }

    showOrderDetails() {
        if (!this.finalOrder) return;

        const modalHtml = `
            <div class="modal fade" id="orderDetailsModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" data-en="Order Details" data-id="Detail Pesanan">Order Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row mb-2">
                                <div class="col-6"><strong data-en="Property:" data-id="Properti:">Property:</strong></div>
                                <div class="col-6">${this.finalOrder.property.name}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6"><strong data-en="Location:" data-id="Lokasi:">Location:</strong></div>
                                <div class="col-6">${this.finalOrder.property.location}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6"><strong data-en="Tokens:" data-id="Token:">Tokens:</strong></div>
                                <div class="col-6">${this.finalOrder.quantity}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6"><strong data-en="Total:" data-id="Total:">Total:</strong></div>
                                <div class="col-6">${this.formatCurrency(this.finalOrder.totalPayment)}</div>
                            </div>
                            <div class="row">
                                <div class="col-6"><strong data-en="Order ID:" data-id="ID Pesanan:">Order ID:</strong></div>
                                <div class="col-6">${this.finalOrder.orderId}</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-en="Close" data-id="Tutup">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal
        const existingModal = document.getElementById('orderDetailsModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to document
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Update language in modal
        this.updateLanguage();
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
        modal.show();
    }

    setupAnimations() {
        // Add fade-in animation
        const container = document.querySelector('.payment-methods');
        if (container) {
            container.classList.add('fade-in');
        }

        // Animate payment options
        const ewalletOptions = document.querySelectorAll('.ewallet-option');
        ewalletOptions.forEach((option, index) => {
            setTimeout(() => {
                option.style.opacity = '0';
                option.style.transform = 'translateY(20px)';
                option.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    option.style.opacity = '1';
                    option.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }

    goBack() {
        window.history.back();
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
function togglePaymentCategory(element) {
    if (window.investmentStep4) {
        window.investmentStep4.togglePaymentCategory(element);
    }
}

function selectPaymentMethod(type, method) {
    if (window.investmentStep4) {
        window.investmentStep4.selectPaymentMethod(type, method);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.investmentStep4 = new InvestmentStep4();
    console.log('💳 Investment Step 4 initialized');
});