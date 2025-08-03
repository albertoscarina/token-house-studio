// Investment Flow - Step 5: Success
class InvestmentStep5 {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.completedOrder = null;
        this.referralLink = '';
        this.init();
    }

    init() {
        this.loadOrderData();
        this.setupLanguage();
        this.setupEventListeners();
        this.updateSuccessUI();
        this.generateReferralLink();
        this.setupAnimations();
        this.setupConfetti();
    }

    loadOrderData() {
        // Get completed order data from localStorage
        const orderDataStr = localStorage.getItem('completedOrder');
        if (orderDataStr) {
            this.completedOrder = JSON.parse(orderDataStr);
        } else {
            // Fallback data
            this.completedOrder = {
                property: {
                    name: 'Villa Kulibul',
                    location: 'Canggu, Bali',
                    image: 'images/villa-kulibul.jpg'
                },
                quantity: 100,
                totalPayment: 1000000,
                orderId: 'ORD-' + Date.now()
            };
        }
    }

    updateSuccessUI() {
        if (!this.completedOrder) return;

        // Update success description
        const description = document.querySelector('.success-description');
        if (description) {
            const descText = `You are now officially an owner of ${this.completedOrder.property.name} (${this.completedOrder.property.location})`;
            const descTextId = `Anda sekarang resmi menjadi pemilik ${this.completedOrder.property.name} (${this.completedOrder.property.location})`;
            description.setAttribute('data-en', descText);
            description.setAttribute('data-id', descTextId);
        }

        // Update property image
        const propertyImage = document.querySelector('.property-image-container img');
        if (propertyImage) {
            propertyImage.src = this.completedOrder.property.image || 'images/villa-kulibul.jpg';
            propertyImage.alt = this.completedOrder.property.name;
        }
    }

    generateReferralLink() {
        // Generate a referral link (in real app, this would come from API)
        const userId = 'user_' + Math.random().toString(36).substr(2, 9);
        this.referralLink = `https://propertytoken.gapuraprima.com/ref/${userId}`;
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
        const container = document.querySelector('.success-container');
        if (container) {
            container.classList.add('fade-in');
        }

        // Animate success icon
        setTimeout(() => {
            const icon = document.querySelector('.success-icon i');
            if (icon) {
                icon.style.transform = 'scale(0)';
                icon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 300);
            }
        }, 500);

        // Animate property image
        setTimeout(() => {
            const imageContainer = document.querySelector('.property-image-container');
            if (imageContainer) {
                imageContainer.style.transform = 'translateY(20px)';
                imageContainer.style.opacity = '0';
                imageContainer.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    imageContainer.style.transform = 'translateY(0)';
                    imageContainer.style.opacity = '1';
                }, 100);
            }
        }, 1000);

        // Animate action buttons
        setTimeout(() => {
            const buttons = document.querySelectorAll('.success-actions button');
            buttons.forEach((button, index) => {
                button.style.transform = 'translateY(30px)';
                button.style.opacity = '0';
                button.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    button.style.transform = 'translateY(0)';
                    button.style.opacity = '1';
                }, index * 200);
            });
        }, 1500);
    }

    setupConfetti() {
        // Simple confetti effect
        setTimeout(() => {
            this.createConfetti();
        }, 800);
    }

    createConfetti() {
        const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            confettiContainer.appendChild(confetti);
        }

        // Add CSS animation
        if (!document.getElementById('confetti-styles')) {
            const style = document.createElement('style');
            style.id = 'confetti-styles';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Clean up confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    copyReferralLink() {
        // Copy referral link to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(this.referralLink).then(() => {
                this.showReferralToast();
            }).catch(() => {
                this.fallbackCopyToClipboard();
            });
        } else {
            this.fallbackCopyToClipboard();
        }
    }

    fallbackCopyToClipboard() {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = this.referralLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showReferralToast();
        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showToast(
                this.currentLanguage === 'id' ? 'Gagal menyalin link' : 'Failed to copy link',
                'error'
            );
        }
        
        document.body.removeChild(textArea);
    }

    showReferralToast() {
        const toast = document.getElementById('referralToast');
        if (toast) {
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
        }
    }

    goToPortfolio() {
        // Add portfolio data to localStorage
        const portfolioData = {
            properties: [
                {
                    id: this.completedOrder.property.id || Date.now(),
                    name: this.completedOrder.property.name,
                    location: this.completedOrder.property.location,
                    image: this.completedOrder.property.image,
                    tokens: this.completedOrder.quantity,
                    purchaseDate: new Date().toISOString(),
                    currentValue: this.completedOrder.totalPayment
                }
            ]
        };
        
        // Add to existing portfolio or create new
        const existingPortfolio = localStorage.getItem('userPortfolio');
        if (existingPortfolio) {
            const portfolio = JSON.parse(existingPortfolio);
            portfolio.properties.push(portfolioData.properties[0]);
            localStorage.setItem('userPortfolio', JSON.stringify(portfolio));
        } else {
            localStorage.setItem('userPortfolio', JSON.stringify(portfolioData));
        }

        // Show loading state
        const portfolioBtn = document.querySelector('.btn-portfolio');
        if (portfolioBtn) {
            const originalText = portfolioBtn.innerHTML;
            portfolioBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-en="Loading..." data-id="Memuat...">Loading...</span>';
            portfolioBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'my-properties.html';
            }, 1000);
        }
    }

    goToDashboard() {
        // Clean up investment flow data
        localStorage.removeItem('currentProperty');
        localStorage.removeItem('currentOrder');
        localStorage.removeItem('finalOrder');
        
        // Show loading state
        const dashboardBtn = document.querySelector('.btn-dashboard');
        if (dashboardBtn) {
            const originalText = dashboardBtn.innerHTML;
            dashboardBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-en="Loading..." data-id="Memuat...">Loading...</span>';
            dashboardBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    }

    // Utility methods
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
function copyReferralLink() {
    if (window.investmentStep5) {
        window.investmentStep5.copyReferralLink();
    }
}

function goToPortfolio() {
    if (window.investmentStep5) {
        window.investmentStep5.goToPortfolio();
    }
}

function goToDashboard() {
    if (window.investmentStep5) {
        window.investmentStep5.goToDashboard();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.investmentStep5 = new InvestmentStep5();
    console.log('🎉 Investment Step 5 initialized');
});