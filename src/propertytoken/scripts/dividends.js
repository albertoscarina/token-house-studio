// Dividends Page JavaScript
class PropertyTokenDividends {
    constructor() {
        this.currentSortColumn = null;
        this.currentSortDirection = 'asc';
        this.dividendChart = null;
        this.initializeComponents();
    }

    initializeComponents() {
        this.initializeMobileMenu();
        this.initializeNotifications();
        this.initializeLanguageSwitcher();
        this.initializeChart();
        this.initializeTableSorting();
        this.initializeTableFilters();
        this.initializeActionButtons();
        this.initializeChartControls();
    }

    // Mobile Menu
    initializeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const sidebar = document.getElementById('sidebar');

        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-active');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && 
                    !sidebar.contains(e.target) && 
                    !mobileMenuToggle.contains(e.target)) {
                    sidebar.classList.remove('mobile-active');
                }
            });
        }
    }

    // Notifications
    initializeNotifications() {
        const notificationBtn = document.getElementById('notification-btn');
        const notificationMenu = document.getElementById('notification-menu');
        const markAllReadBtn = document.querySelector('.mark-all-read');

        if (notificationBtn && notificationMenu) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationMenu.classList.toggle('show');
            });

            // Close notifications when clicking outside
            document.addEventListener('click', () => {
                notificationMenu.classList.remove('show');
            });

            notificationMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                const badge = document.querySelector('.notification-badge');
                if (badge) {
                    badge.style.display = 'none';
                }
                this.showToast('All notifications marked as read', 'success');
            });
        }
    }

    // Language Switcher
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
        // Language switching logic
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
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.textContent = translations[lang].pageTitle;
        }

        this.showToast(`Language switched to ${lang.toUpperCase()}`, 'info');
    }

    // Chart Initialization
    initializeChart() {
        const ctx = document.getElementById('dividendChart');
        if (!ctx) return;

        const chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Dividends (IDR)',
                data: [1800000, 2100000, 1950000, 2200000, 2400000, 2145000],
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderColor: '#667eea',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `IDR ${context.parsed.y.toLocaleString('id-ID')}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'IDR ' + (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        };

        this.dividendChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }

    // Chart Controls
    initializeChartControls() {
        const periodButtons = document.querySelectorAll('[data-period]');
        
        periodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                periodButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const period = btn.dataset.period;
                this.updateChartData(period);
            });
        });
    }

    updateChartData(period) {
        if (!this.dividendChart) return;

        const chartData = {
            '6m': {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [1800000, 2100000, 1950000, 2200000, 2400000, 2145000]
            },
            '1y': {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [5850000, 6245000, 6800000, 7200000]
            },
            'all': {
                labels: ['2023', '2024', '2025'],
                data: [18500000, 24800000, 28600000]
            }
        };

        const data = chartData[period];
        this.dividendChart.data.labels = data.labels;
        this.dividendChart.data.datasets[0].data = data.data;
        this.dividendChart.update();

        this.showToast(`Chart updated for ${period.toUpperCase()} period`, 'info');
    }

    // Table Sorting
    initializeTableSorting() {
        const sortableHeaders = document.querySelectorAll('[data-sort]');
        
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.sort;
                this.sortTable(column, header);
            });
        });
    }

    sortTable(column, headerElement) {
        const table = document.getElementById('dividendTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // Update sort direction
        if (this.currentSortColumn === column) {
            this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSortDirection = 'asc';
            this.currentSortColumn = column;
        }

        // Update header icons
        document.querySelectorAll('[data-sort] i').forEach(icon => {
            icon.className = 'fas fa-sort';
        });

        const icon = headerElement.querySelector('i');
        icon.className = this.currentSortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';

        // Sort rows
        const columnIndex = {
            'date': 0,
            'property': 1,
            'amount': 2,
            'status': 3
        }[column];

        rows.sort((a, b) => {
            let aValue = a.cells[columnIndex].textContent.trim();
            let bValue = b.cells[columnIndex].textContent.trim();

            if (column === 'amount') {
                aValue = parseInt(aValue.replace(/[^\d]/g, ''));
                bValue = parseInt(bValue.replace(/[^\d]/g, ''));
            } else if (column === 'date') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (aValue < bValue) return this.currentSortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.currentSortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        // Re-append sorted rows
        rows.forEach(row => tbody.appendChild(row));
    }

    // Table Filters
    initializeTableFilters() {
        const searchInput = document.querySelector('.search-input');
        const filterSelect = document.querySelector('.filter-select');

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.filterTable();
            });
        }

        if (filterSelect) {
            filterSelect.addEventListener('change', () => {
                this.filterTable();
            });
        }
    }

    filterTable() {
        const searchTerm = document.querySelector('.search-input').value.toLowerCase();
        const filterValue = document.querySelector('.filter-select').value;
        const table = document.getElementById('dividendTable');
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const propertyName = row.cells[1].textContent.toLowerCase();
            const amount = row.cells[2].textContent.toLowerCase();
            const status = row.cells[3].textContent.toLowerCase();

            const matchesSearch = propertyName.includes(searchTerm) || 
                                amount.includes(searchTerm) || 
                                status.includes(searchTerm);

            let matchesFilter = true;
            if (filterValue !== 'all') {
                if (filterValue === 'bassura') {
                    matchesFilter = propertyName.includes('bassura');
                } else if (filterValue === 'villa') {
                    matchesFilter = propertyName.includes('villa');
                }
            }

            row.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
        });
    }

    // Action Buttons
    initializeActionButtons() {
        const withdrawBtn = document.querySelector('.withdraw-btn');
        const shareBtn = document.querySelector('.share-btn');

        if (withdrawBtn) {
            withdrawBtn.addEventListener('click', () => {
                this.handleWithdraw();
            });
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.handleShare();
            });
        }

        // View Details buttons
        const viewDetailBtns = document.querySelectorAll('.btn-outline-primary');
        viewDetailBtns.forEach(btn => {
            if (btn.textContent.includes('View Details')) {
                btn.addEventListener('click', (e) => {
                    const row = e.target.closest('tr');
                    const propertyName = row.cells[1].textContent;
                    this.showDividendDetails(propertyName);
                });
            }
        });
    }

    handleWithdraw() {
        // Simulate withdraw process
        this.showToast('Withdrawal request submitted successfully', 'success');
        
        // You could open a modal here for withdraw form
        console.log('Withdraw functionality would be implemented here');
    }

    handleShare() {
        // Simulate share functionality
        if (navigator.share) {
            navigator.share({
                title: 'My PropertyToken Dividend Performance',
                text: 'Check out my dividend earnings from PropertyToken investments!',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            this.showToast('Link copied to clipboard', 'success');
        }
    }

    showDividendDetails(propertyName) {
        this.showToast(`Showing details for ${propertyName}`, 'info');
        // You could open a modal with detailed dividend information here
    }

    // Utility Functions
    showToast(message, type = 'info') {
        // Create toast element
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

        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);

        // Hide and remove toast
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Public API
    refreshData() {
        this.showToast('Refreshing dividend data...', 'info');
        // Implement data refresh logic here
        setTimeout(() => {
            this.showToast('Data refreshed successfully', 'success');
        }, 1000);
    }

    updateBalance(newBalance) {
        const balanceElement = document.querySelector('.overview-stat h3');
        if (balanceElement) {
            balanceElement.textContent = this.formatCurrency(newBalance);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Basic auth check (replace with actual authentication)
    const isAuthenticated = localStorage.getItem('propertytoken_auth') || true;
    
    if (!isAuthenticated) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize dividends functionality
    window.propertyTokenDividends = new PropertyTokenDividends();

    // Global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals/dropdowns
        if (e.key === 'Escape') {
            document.querySelectorAll('.show').forEach(element => {
                element.classList.remove('show');
            });
        }
        
        // Ctrl/Cmd + R for refresh
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            window.propertyTokenDividends.refreshData();
        }
    });

    // Handle online/offline status
    window.addEventListener('online', function() {
        window.propertyTokenDividends.showToast('Connection restored', 'success');
    });

    window.addEventListener('offline', function() {
        window.propertyTokenDividends.showToast('Connection lost', 'warning');
    });
});