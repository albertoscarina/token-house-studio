// Dividends Page JavaScript - Updated for consistency
class PropertyTokenDividends {
    constructor() {
        this.currentSortColumn = null;
        this.currentSortDirection = 'asc';
        this.dividendChart = null;
        this.initializeComponents();
    }

    initializeComponents() {
        this.initializeMobileMenu();
        this.initializeLanguageSwitcher();
        this.initializeChart();
        this.initializeTableSorting();
        this.initializeTableFilters();
        this.initializeActionButtons();
        this.initializeChartControls();
    }

    // Mobile Menu - consistent with dashboard
    initializeMobileMenu() {
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('show');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && 
                    !sidebar.contains(e.target) && 
                    !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
            });
        }
    }

    // Language Switcher - same as dashboard
    initializeLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        const translations = {
            en: {
                pageTitle: 'Dividends',
                totalDividends: 'Total Dividends Received',
                currentBalance: 'Current Dividend Balance',
                withdraw: 'Withdraw',
                share: 'Share',
                nextPayout: 'Next Payout Date'
            },
            id: {
                pageTitle: 'Dividen',
                totalDividends: 'Total Dividen Diterima',
                currentBalance: 'Saldo Dividen Saat Ini',
                withdraw: 'Tarik',
                share: 'Bagikan',
                nextPayout: 'Tanggal Pembayaran Berikutnya'
            }
        };

        // Update page title
        const pageTitle = document.querySelector('.top-navbar h5');
        if (pageTitle) {
            pageTitle.textContent = translations[lang].pageTitle;
        }

        this.showToast(`Language switched to ${lang.toUpperCase()}`, 'info');
    }

    // Rest of the methods remain the same...
    // Chart, table sorting, filtering, etc.

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed`;
        toast.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 250px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dividends functionality
    window.propertyTokenDividends = new PropertyTokenDividends();
});
