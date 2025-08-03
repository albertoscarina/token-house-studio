// PropertyToken Top Up Wallet JavaScript
class TopUpWallet {
    constructor() {
        this.currentMethod = 'bank';
        this.currentAmount = 0;
        this.minAmount = 100000;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializePage();
        this.formatCurrency();
    }

    initializePage() {
        // Set initial wallet balance
        this.updateWalletBalance();
        
        // Set default payment method
        this.showPaymentInstructions('bank');
        
        // Check if confirm button should be enabled
        this.validateForm();
    }

    setupEventListeners() {
        // Payment method tabs
        document.querySelectorAll('.method-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const method = e.currentTarget.getAttribute('data-method');
                this.switchPaymentMethod(method);
            });
        });

        // Quick amount buttons
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.currentTarget.getAttribute('data-amount'));
                this.setAmount(amount);
            });
        });

        // Amount input
        const amountInput = document.getElementById('topupAmount');
        amountInput.addEventListener('input', (e) => {
            this.handleAmountInput(e);
        });

        amountInput.addEventListener('blur', (e) => {
            this.formatAmountInput(e);
        });

        // Copy buttons
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const textToCopy = e.currentTarget.getAttribute('data-copy');
                this.copyToClipboard(textToCopy);
            });
        });

        // Confirm payment button
        document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
            this.confirmPayment();
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('active');
            });
        }

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('active');
            });
        }

        // Notification panel
        this.setupNotifications();
    }

    setupNotifications() {
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        const closeNotifications = document.getElementById('closeNotifications');

        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', () => {
                notificationPanel.classList.toggle('active');
            });
        }

        if (closeNotifications && notificationPanel) {
            closeNotifications.addEventListener('click', () => {
                notificationPanel.classList.remove('active');
            });
        }

        // Close notification panel when clicking outside
        document.addEventListener('click', (e) => {
            if (notificationPanel && 
                !notificationPanel.contains(e.target) && 
                !notificationBtn.contains(e.target)) {
                notificationPanel.classList.remove('active');
            }
        });
    }

    switchPaymentMethod(method) {
        this.currentMethod = method;

        // Update active tab appearance
        document.querySelectorAll('.method-tab').forEach(tab => {
            if (tab.getAttribute('data-method') === method) {
                tab.style.background = '#667eea';
                tab.style.color = 'white';
            } else {
                tab.style.background = 'transparent';
                tab.style.color = '#6c757d';
            }
        });

        // Show corresponding instructions
        this.showPaymentInstructions(method);

        // Show success message
        const methodNames = {
            'bank': window.languageManager?.currentLang === 'id' ? 'Transfer Bank' : 'Bank Transfer',
            'usdt': 'USDT',
            'btc': 'Bitcoin'
        };
        
        const message = window.languageManager?.currentLang === 'id' 
            ? `Metode ${methodNames[method]} dipilih`
            : `${methodNames[method]} method selected`;
        
        this.showToast(message, 'info');
    }

    showPaymentInstructions(method) {
        // Hide all instruction contents
        document.querySelectorAll('.instruction-content').forEach(content => {
            content.style.display = 'none';
        });

        // Show selected method instructions
        const instructionId = method + 'Instructions';
        const instructionElement = document.getElementById(instructionId);
        if (instructionElement) {
            instructionElement.style.display = 'block';
        }
    }

    setAmount(amount) {
        this.currentAmount = amount;
        const amountInput = document.getElementById('topupAmount');
        amountInput.value = this.formatNumber(amount);
        this.validateForm();
    }

    handleAmountInput(e) {
        let value = e.target.value.replace(/[^\d]/g, '');
        
        if (value) {
            this.currentAmount = parseInt(value);
            e.target.value = this.formatNumber(this.currentAmount);
        } else {
            this.currentAmount = 0;
            e.target.value = '';
        }
        
        this.validateForm();
    }

    formatAmountInput(e) {
        if (this.currentAmount > 0) {
            e.target.value = this.formatNumber(this.currentAmount);
        }
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    formatCurrency() {
        const balanceElement = document.getElementById('walletBalance');
        if (balanceElement) {
            const balance = parseInt(balanceElement.textContent.replace(/[^\d]/g, ''));
            balanceElement.textContent = this.formatNumber(balance);
        }
    }

    updateWalletBalance() {
        // This would typically fetch from an API
        const mockBalance = 2500000;
        const balanceElement = document.getElementById('walletBalance');
        if (balanceElement) {
            balanceElement.textContent = this.formatNumber(mockBalance);
        }
    }

    validateForm() {
        const confirmBtn = document.getElementById('confirmPaymentBtn');
        const isValid = this.currentAmount >= this.minAmount;
        
        confirmBtn.disabled = !isValid;
        
        if (isValid) {
            confirmBtn.classList.remove('disabled');
        } else {
            confirmBtn.classList.add('disabled');
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            const message = window.languageManager?.currentLang === 'id' 
                ? 'Berhasil disalin ke clipboard' 
                : 'Copied to clipboard';
            this.showToast(message, 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const message = window.languageManager?.currentLang === 'id' 
                ? 'Berhasil disalin ke clipboard' 
                : 'Copied to clipboard';
            this.showToast(message, 'success');
        });
    }

    confirmPayment() {
        if (this.currentAmount < this.minAmount) {
            const message = window.languageManager?.currentLang === 'id' 
                ? `Jumlah minimum adalah IDR ${this.formatNumber(this.minAmount)}`
                : `Minimum amount is IDR ${this.formatNumber(this.minAmount)}`;
            this.showToast(message, 'error');
            return;
        }

        // Create confirmation data
        const confirmationData = {
            method: this.currentMethod,
            amount: this.currentAmount,
            currency: 'IDR',
            timestamp: new Date().toISOString()
        };

        // Show confirmation modal or process
        this.showConfirmationModal(confirmationData);
    }

    showConfirmationModal(data) {
        const methodNames = {
            'bank': window.languageManager?.currentLang === 'id' ? 'Transfer Bank' : 'Bank Transfer',
            'usdt': 'USDT (TRC20/Polygon)',
            'btc': 'Bitcoin (BTC)'
        };

        const isIndonesian = window.languageManager?.currentLang === 'id';
        
        const title = isIndonesian ? 'Konfirmasi Top Up' : 'Confirm Top Up';
        const amountText = isIndonesian ? 'Jumlah' : 'Amount';
        const methodText = isIndonesian ? 'Metode' : 'Method';
        const confirmText = isIndonesian ? 'Ya, Saya Sudah Transfer' : 'Yes, I Have Transferred';
        const cancelText = isIndonesian ? 'Batal' : 'Cancel';
        const instructionText = isIndonesian 
            ? 'Pastikan Anda telah melakukan transfer sesuai dengan instruksi di atas sebelum mengkonfirmasi.'
            : 'Please ensure you have completed the transfer according to the instructions above before confirming.';

        const modalHTML = `
            <div class="modal fade" id="confirmationModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="border-radius: 15px; border: none;">
                        <div class="modal-header" style="border-bottom: 1px solid #e9ecef; padding: 1.5rem;">
                            <h5 class="modal-title" style="font-weight: 600; color: #2c3e50;">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" style="padding: 1.5rem;">
                            <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-weight: 600; color: #6c757d;">${methodText}:</span>
                                    <span style="font-weight: 600; color: #2c3e50;">${methodNames[data.method]}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="font-weight: 600; color: #6c757d;">${amountText}:</span>
                                    <span style="font-weight: 600; color: #667eea; font-size: 1.1rem;">IDR ${this.formatNumber(data.amount)}</span>
                                </div>
                            </div>
                            <p style="color: #6c757d; margin-bottom: 0; font-size: 0.9rem;">${instructionText}</p>
                        </div>
                        <div class="modal-footer" style="border-top: 1px solid #e9ecef; padding: 1.5rem; gap: 0.5rem;">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="border-radius: 10px;">${cancelText}</button>
                            <button type="button" class="btn btn-primary" id="finalConfirmBtn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 10px;">${confirmText}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('confirmationModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();

        // Handle final confirmation
        document.getElementById('finalConfirmBtn').addEventListener('click', () => {
            this.processConfirmation(data);
            modal.hide();
        });
    }

    processConfirmation(data) {
        // Simulate processing
        const processingMessage = window.languageManager?.currentLang === 'id' 
            ? 'Konfirmasi top up berhasil! Tim kami akan memproses dalam 1x24 jam.'
            : 'Top up confirmation successful! Our team will process within 24 hours.';
        
        this.showToast(processingMessage, 'success');

        // Add to notifications (mock)
        this.addNotification({
            type: 'info',
            title: window.languageManager?.currentLang === 'id' ? 'Top Up Diproses' : 'Top Up Processing',
            message: window.languageManager?.currentLang === 'id' 
                ? `Top up sebesar IDR ${this.formatNumber(data.amount)} sedang diproses`
                : `Top up of IDR ${this.formatNumber(data.amount)} is being processed`,
            timestamp: new Date()
        });

        // Reset form
        setTimeout(() => {
            this.resetForm();
        }, 2000);
    }

    addNotification(notification) {
        // This would typically send to backend
        console.log('New notification:', notification);
        
        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + 1;
        }
    }

    resetForm() {
        this.currentAmount = 0;
        document.getElementById('topupAmount').value = '';
        this.validateForm();
    }

    showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.copy-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `copy-toast ${type}`;
        toast.textContent = message;

        // Set background color based on type
        if (type === 'success') {
            toast.style.background = '#28a745';
        } else if (type === 'error') {
            toast.style.background = '#dc3545';
        } else {
            toast.style.background = '#667eea';
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Public methods for external access
    refreshData() {
        this.updateWalletBalance();
    }

    getCurrentAmount() {
        return this.currentAmount;
    }

    getCurrentMethod() {
        return this.currentMethod;
    }
}

// Initialize Top Up Wallet when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Basic authentication check
    const isAuthenticated = localStorage.getItem('propertytoken_auth') === 'true';
    
    if (!isAuthenticated) {
        console.log('User not authenticated, redirecting...');
        // Uncomment below line for production
        // window.location.href = 'index.html';
        return;
    }

    // Initialize Top Up Wallet
    window.topUpWallet = new TopUpWallet();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TopUpWallet;
}