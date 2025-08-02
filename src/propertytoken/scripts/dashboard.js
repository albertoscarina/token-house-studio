// PropertyToken GapuraPrima - Dashboard JavaScript

class PropertyTokenDashboard {
   constructor() {
       this.currentPage = 'overview';
       this.sidebarActive = false;
       this.notificationActive = false;
       this.charts = {};
       this.userData = {
           balance: 69658,
           accountValue: 1222158,
           rentEarned: 175276,
           propertiesOwned: 2,
           totalPropertyValue: 1152500
       };
       
       this.init();
   }
   
   init() {
       console.log('🚀 PropertyToken Dashboard initializing...');
       
       // Initialize navigation
       this.initNavigation();
       
       // Initialize mobile sidebar
       this.initMobileSidebar();
       
       // Initialize notifications
       this.initNotifications();
       
       // Initialize charts
       this.initCharts();
       
       // Initialize property interactions
       this.initPropertyActions();
       
        // Initialize responsive behavior
        this.initResponsive();
        
        // Initialize language switcher
        this.initLanguageSwitch();
        
        // Load initial data
        this.loadDashboardData();
       
       console.log('✅ Dashboard initialized successfully');
   }
   
   // Navigation Management
   initNavigation() {
       const navLinks = document.querySelectorAll('.nav-link[data-page]');
       
       navLinks.forEach(link => {
           link.addEventListener('click', (e) => {
               e.preventDefault();
               const page = link.getAttribute('data-page');
               this.navigateToPage(page);
           });
       });
       
       // Handle logout
       const logoutLink = document.querySelector('.logout-link');
       if (logoutLink) {
           logoutLink.addEventListener('click', (e) => {
               e.preventDefault();
               this.handleLogout();
           });
       }
   }
   
   navigateToPage(page) {
       // Update active nav link
       document.querySelectorAll('.nav-link').forEach(link => {
           link.classList.remove('active');
       });
       
       document.querySelector(`[data-page="${page}"]`).classList.add('active');
       
       // Update page content
       document.querySelectorAll('.content-page').forEach(pageEl => {
           pageEl.classList.remove('active');
       });
       
       const targetPage = document.getElementById(`${page}Page`);
       if (targetPage) {
           targetPage.classList.add('active');
       }
       
       // Update page title
       const pageTitle = this.getPageTitle(page);
       document.getElementById('pageTitle').textContent = pageTitle;
       
       // Update current page
       this.currentPage = page;
       
       // Close mobile sidebar
       if (window.innerWidth <= 768) {
           this.closeMobileSidebar();
       }
       
       // Analytics tracking
       this.trackPageView(page);
       
       console.log(`📊 Navigated to: ${page}`);
   }
   
   getPageTitle(page) {
       const pageTitles = {
           'overview': 'Assets Overview',
           'portfolio': 'Portfolio Management',
           'marketplace': 'Marketplace',
           'transactions': 'Transaction History',
           'dividends': 'Dividend Tracking',
           'analytics': 'Investment Analytics',
           'referrals': 'Referral Program',
           'wallet': 'Wallet Management',
           'support': 'Customer Support'
       };
       
       return pageTitles[page] || 'Dashboard';
   }
   
   // Mobile Sidebar Management
   initMobileSidebar() {
       const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
       const sidebarToggle = document.getElementById('sidebarToggle');
       const sidebarOverlay = document.getElementById('sidebarOverlay');
       
       mobileSidebarToggle?.addEventListener('click', () => {
           this.toggleMobileSidebar();
       });
       
       sidebarToggle?.addEventListener('click', () => {
           this.closeMobileSidebar();
       });
       
       sidebarOverlay?.addEventListener('click', () => {
           this.closeMobileSidebar();
       });
   }
   
   toggleMobileSidebar() {
       const sidebar = document.querySelector('.dashboard-sidebar');
       const overlay = document.getElementById('sidebarOverlay');
       
       this.sidebarActive = !this.sidebarActive;
       
       if (this.sidebarActive) {
           sidebar.classList.add('active');
           overlay.classList.add('active');
           document.body.style.overflow = 'hidden';
       } else {
           sidebar.classList.remove('active');
           overlay.classList.remove('active');
           document.body.style.overflow = '';
       }
   }
   
   closeMobileSidebar() {
       const sidebar = document.querySelector('.dashboard-sidebar');
       const overlay = document.getElementById('sidebarOverlay');
       
       this.sidebarActive = false;
       sidebar.classList.remove('active');
       overlay.classList.remove('active');
       document.body.style.overflow = '';
   }
   
   // Notification System
   initNotifications() {
       const notificationBtn = document.getElementById('notificationBtn');
       const notificationDropdown = document.getElementById('notificationDropdown');
       const markAllRead = document.querySelector('.mark-all-read');
       
       notificationBtn?.addEventListener('click', (e) => {
           e.stopPropagation();
           this.toggleNotifications();
       });
       
       markAllRead?.addEventListener('click', () => {
           this.markAllNotificationsRead();
       });
       
       // Close notifications when clicking outside
       document.addEventListener('click', (e) => {
           if (this.notificationActive && 
               !notificationDropdown.contains(e.target) && 
               !notificationBtn.contains(e.target)) {
               this.closeNotifications();
           }
       });
       
       // Handle individual notification clicks
       document.querySelectorAll('.notification-item').forEach(item => {
           item.addEventListener('click', () => {
               this.markNotificationRead(item);
           });
       });
   }
   
   toggleNotifications() {
       const dropdown = document.getElementById('notificationDropdown');
       
       this.notificationActive = !this.notificationActive;
       
       if (this.notificationActive) {
           dropdown.classList.add('active');
       } else {
           dropdown.classList.remove('active');
       }
   }
   
   closeNotifications() {
       const dropdown = document.getElementById('notificationDropdown');
       this.notificationActive = false;
       dropdown.classList.remove('active');
   }
   
   markAllNotificationsRead() {
       const unreadItems = document.querySelectorAll('.notification-item.unread');
       const notificationCount = document.querySelector('.notification-count');
       
       unreadItems.forEach(item => {
           item.classList.remove('unread');
       });
       
       // Update notification count
       if (notificationCount) {
           notificationCount.textContent = '0';
           notificationCount.style.display = 'none';
       }
       
       this.showToast('Semua notifikasi telah ditandai sebagai dibaca', 'success');
   }
   
   markNotificationRead(notificationItem) {
       notificationItem.classList.remove('unread');
       
       // Update notification count
       const unreadCount = document.querySelectorAll('.notification-item.unread').length;
       const notificationCount = document.querySelector('.notification-count');
       
       if (notificationCount) {
           notificationCount.textContent = unreadCount;
           if (unreadCount === 0) {
               notificationCount.style.display = 'none';
           }
       }
   }
   
   // Charts Initialization
   initCharts() {
       this.initPortfolioChart();
       this.initAllocationChart();
       this.initChartTabs();
   }
   
   initPortfolioChart() {
       const ctx = document.getElementById('portfolioChart');
       if (!ctx) return;
       
       // Sample portfolio performance data
       const portfolioData = {
           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
           datasets: [{
               label: 'Portfolio Value',
               data: [950000, 980000, 1020000, 1050000, 1080000, 1165000, 1222158],
               borderColor: '#2563eb',
               backgroundColor: 'rgba(37, 99, 235, 0.1)',
               borderWidth: 3,
               fill: true,
               tension: 0.4,
               pointBackgroundColor: '#2563eb',
               pointBorderColor: '#ffffff',
               pointBorderWidth: 2,
               pointRadius: 6,
               pointHoverRadius: 8
           }]
       };
       
       this.charts.portfolio = new Chart(ctx, {
           type: 'line',
           data: portfolioData,
           options: {
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
                       borderColor: '#2563eb',
                       borderWidth: 1,
                       cornerRadius: 8,
                       displayColors: false,
                       callbacks: {
                           label: function(context) {
                               return 'IDR ' + context.parsed.y.toLocaleString('id-ID');
                           }
                       }
                   }
               },
               scales: {
                   x: {
                       border: {
                           display: false
                       },
                       grid: {
                           display: false
                       },
                       ticks: {
                           color: '#6b7280'
                       }
                   },
                   y: {
                       border: {
                           display: false
                       },
                       grid: {
                           color: '#f3f4f6'
                       },
                       ticks: {
                           color: '#6b7280',
                           callback: function(value) {
                               return 'IDR ' + Math.round(value / 1000) + 'K';
                           }
                       }
                   }
               },
               interaction: {
                   intersect: false,
                   mode: 'index'
               }
           }
       });
   }
   
   initAllocationChart() {
       const ctx = document.getElementById('allocationChart');
       if (!ctx) return;
       
       const allocationData = {
           labels: ['Villa Kulibul', 'Mont Blanc Bekasi'],
           datasets: [{
               data: [1000000, 152500],
               backgroundColor: ['#2563eb', '#667eea'],
               borderWidth: 0,
               hoverOffset: 8
           }]
       };
       
       this.charts.allocation = new Chart(ctx, {
           type: 'doughnut',
           data: allocationData,
           options: {
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
                       borderColor: '#2563eb',
                       borderWidth: 1,
                       cornerRadius: 8,
                       callbacks: {
                           label: function(context) {
                               const total = context.dataset.data.reduce((a, b) => a + b, 0);
                               const percentage = ((context.parsed / total) * 100).toFixed(1);
                               return context.label + ': ' + percentage + '% (IDR ' + context.parsed.toLocaleString('id-ID') + ')';
                           }
                       }
                   }
               },
               cutout: '60%'
           }
       });
   }
   
   initChartTabs() {
       const chartTabs = document.querySelectorAll('.chart-tab');
       
       chartTabs.forEach(tab => {
           tab.addEventListener('click', () => {
               // Update active tab
               chartTabs.forEach(t => t.classList.remove('active'));
               tab.classList.add('active');
               
               // Update chart data based on period
               const period = tab.getAttribute('data-period');
               this.updatePortfolioChart(period);
           });
       });
   }
   
   updatePortfolioChart(period) {
       if (!this.charts.portfolio) return;
       
       // Sample data for different periods
       const periodData = {
           '1M': {
               labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
               data: [1150000, 1165000, 1180000, 1222158]
           },
           '3M': {
               labels: ['May', 'Jun', 'Jul'],
               data: [1080000, 1165000, 1222158]
           },
           '6M': {
               labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
               data: [980000, 1020000, 1050000, 1080000, 1165000, 1222158]
           },
           '1Y': {
               labels: ['Q1', 'Q2', 'Q3', 'Q4'],
               data: [950000, 1050000, 1120000, 1222158]
           }
       };
       
       const newData = periodData[period] || periodData['1M'];
       
       this.charts.portfolio.data.labels = newData.labels;
       this.charts.portfolio.data.datasets[0].data = newData.data;
       this.charts.portfolio.update('active');
       
       console.log(`📊 Updated portfolio chart for period: ${period}`);
   }
   
   // Property Actions
   initPropertyActions() {
       // Swap buttons
       document.querySelectorAll('.swap-btn').forEach(btn => {
           btn.addEventListener('click', (e) => {
               const propertyName = e.target.closest('.property-item').querySelector('.property-name').textContent;
               this.handleSwap(propertyName);
           });
       });
       
       // Sell buttons
       document.querySelectorAll('.sell-btn').forEach(btn => {
           btn.addEventListener('click', (e) => {
               const propertyName = e.target.closest('.property-item').querySelector('.property-name').textContent;
               this.handleSell(propertyName);
           });
       });
       
       // Withdraw button
       document.querySelectorAll('.withdraw-btn').forEach(btn => {
           btn.addEventListener('click', () => {
               this.handleWithdraw();
           });
       });
       
       // Invest button
       document.querySelectorAll('.invest-btn').forEach(btn => {
           btn.addEventListener('click', () => {
               this.handleInvest();
           });
       });
       
       // Hide zero assets toggle
       const hideZeroAssetsBtn = document.querySelector('.hide-zero-assets');
       if (hideZeroAssetsBtn) {
           hideZeroAssetsBtn.addEventListener('click', () => {
               this.toggleZeroAssets();
           });
       }
   }
   
   handleSwap(propertyName) {
       this.showToast(`Fitur swap untuk ${propertyName} sedang dikembangkan`, 'info');
       console.log(`🔄 Swap initiated for: ${propertyName}`);
   }
   
   handleSell(propertyName) {
       this.showToast(`Fitur jual untuk ${propertyName} sedang dikembangkan`, 'info');
       console.log(`💰 Sell initiated for: ${propertyName}`);
   }
   
   handleWithdraw() {
       this.showToast('Fitur withdraw sedang dikembangkan', 'info');
       console.log('💳 Withdraw initiated');
   }
   
   handleInvest() {
       this.showToast('Mengarahkan ke halaman investasi...', 'success');
       setTimeout(() => {
           window.open('index.html#properti', '_blank');
       }, 1500);
       console.log('📈 Invest initiated');
   }
   
   toggleZeroAssets() {
       const propertyItems = document.querySelectorAll('.property-item');
       const hideBtn = document.querySelector('.hide-zero-assets');
       const isHiding = hideBtn.classList.contains('hiding-zero');
       
       propertyItems.forEach(item => {
           const availableTokens = item.querySelector('.stat-value.available');
           if (availableTokens && availableTokens.textContent.includes('0')) {
               if (isHiding) {
                   item.style.display = 'flex';
               } else {
                   item.style.display = 'none';
               }
           }
       });
       
       if (isHiding) {
           hideBtn.classList.remove('hiding-zero');
           hideBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide 0 Assets';
       } else {
           hideBtn.classList.add('hiding-zero');
           hideBtn.innerHTML = '<i class="fas fa-eye"></i> Show 0 Assets';
       }
   }
   
   // Data Loading and Updates
   loadDashboardData() {
       // Update stats cards
       this.updateStatsCards();
       this.updatePropertyData();
       
       // Set up periodic updates
       setInterval(() => {
           this.updateRealTimeData();
       }, 30000); // Update every 30 seconds
       
       console.log('📊 Dashboard data loaded');
   }
   
   updateStatsCards() {
       // Update balance
       const balanceElement = document.querySelector('.balance-card .stat-value');
       if (balanceElement) {
           balanceElement.textContent = `IDR ${this.userData.balance.toLocaleString('id-ID')}`;
       }
       
       // Update account value
       const accountValueElement = document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-value');
       if (accountValueElement) {
           accountValueElement.textContent = `IDR ${this.userData.accountValue.toLocaleString('id-ID')}`;
       }
       
       // Update rent earned
       const rentEarnedElement = document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-value');
       if (rentEarnedElement) {
           rentEarnedElement.textContent = `IDR ${this.userData.rentEarned.toLocaleString('id-ID')}`;
       }
       
       // Update properties owned
       const propertiesOwnedElement = document.querySelector('.stats-grid .stat-card:nth-child(4) .stat-value');
       if (propertiesOwnedElement) {
           propertiesOwnedElement.textContent = this.userData.propertiesOwned.toString();
       }
   }
   
   updatePropertyData() {
       // Add real-time property value updates
       const propertyItems = document.querySelectorAll('.property-item');
       
       propertyItems.forEach((item, index) => {
           // Simulate slight value fluctuations
           const currentValueElement = item.querySelector('.stat-group .stat-item:first-child .stat-value');
           if (currentValueElement && index === 0) { // Villa Kulibul
               const baseValue = 1000000;
               const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% fluctuation
               const newValue = Math.round(baseValue * (1 + fluctuation));
               currentValueElement.textContent = `IDR ${newValue.toLocaleString('id-ID')}`;
           }
       });
   }
   
   updateRealTimeData() {
       // Simulate real-time updates
       this.updatePropertyData();
       
       // Update last update timestamp
       console.log('🔄 Real-time data updated at', new Date().toLocaleTimeString());
   }
   
   // Responsive Behavior
   initResponsive() {
       window.addEventListener('resize', () => {
           this.handleResize();
       });
       
       this.handleResize(); // Initial call
   }
   
   handleResize() {
       const width = window.innerWidth;
       
       // Close mobile sidebar on desktop
       if (width > 1023 && this.sidebarActive) {
           this.closeMobileSidebar();
       }
       
       // Close notifications on small screens
       if (width <= 480 && this.notificationActive) {
           this.closeNotifications();
       }
       
       // Resize charts
       Object.values(this.charts).forEach(chart => {
           if (chart && typeof chart.resize === 'function') {
               chart.resize();
           }
       });
   }
   
   // Utility Methods
   showToast(message, type = 'info') {
       // Remove existing toast
       const existingToast = document.querySelector('.dashboard-toast');
       if (existingToast) {
           existingToast.remove();
       }
       
       const toast = document.createElement('div');
       toast.className = `dashboard-toast toast-${type}`;
       toast.innerHTML = `
           <div class="toast-content">
               <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
               <span>${message}</span>
               <button class="toast-close">
                   <i class="fas fa-times"></i>
               </button>
           </div>
       `;
       
       // Add styles
       toast.style.cssText = `
           position: fixed;
           top: 100px;
           right: 20px;
           background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
           color: white;
           padding: 16px 20px;
           border-radius: 8px;
           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
           z-index: 10000;
           max-width: 400px;
           transform: translateX(100%);
           transition: transform 0.3s ease;
       `;
       
       toast.querySelector('.toast-content').style.cssText = `
           display: flex;
           align-items: center;
           gap: 12px;
       `;
       
       toast.querySelector('.toast-close').style.cssText = `
           background: none;
           border: none;
           color: white;
           cursor: pointer;
           padding: 4px;
           margin-left: auto;
       `;
       
       document.body.appendChild(toast);
       
       // Animate in
       setTimeout(() => {
           toast.style.transform = 'translateX(0)';
       }, 100);
       
       // Close button
       toast.querySelector('.toast-close').addEventListener('click', () => {
           toast.style.transform = 'translateX(100%)';
           setTimeout(() => toast.remove(), 300);
       });
       
       // Auto close
       setTimeout(() => {
           if (document.body.contains(toast)) {
               toast.style.transform = 'translateX(100%)';
               setTimeout(() => toast.remove(), 300);
           }
       }, 5000);
   }
   
   handleLogout() {
       if (confirm('Apakah Anda yakin ingin keluar?')) {
           this.showToast('Logging out...', 'info');
           
           // Clear any stored data
           localStorage.removeItem('propertytoken_session');
           sessionStorage.clear();
           
           // Redirect to main page
           setTimeout(() => {
               window.location.href = 'index.html';
           }, 1500);
           
           console.log('👋 User logged out');
       }
   }
   
    trackPageView(page) {
        // Analytics tracking
        console.log('📊 Page view tracked:', page);
        
        // In production, send to analytics service
        // gtag('event', 'page_view', { page_title: page });
    }
    
    // Language Switch Function
    switchLanguage(lang) {
        const translations = {
            en: {
                // Sidebar menu items
                'overview': 'Overview',
                'portfolio': 'Portfolio',
                'marketplace': 'Marketplace',
                'transactions': 'Transactions',
                'dividends': 'Dividends',
                'analytics': 'Analytics',
                'referrals': 'Referrals',
                'wallet': 'Wallet',
                'support': 'Support',
                'logOut': 'Log Out',
                
                // Page title
                'assetsOverview': 'Assets Overview',
                'welcome': 'Welcome back, Demo User!',
                'portfolioPerformance': 'Your portfolio performance has increased by 12.5% this month',
                
                // Stats cards
                'balance': 'Available Balance',
                'accountValue': 'Account Value',
                'rentEarned': 'Rent Earned',
                'properties': 'Properties',
                
                // Quick actions
                'quickActions': 'Quick Actions',
                'withdraw': 'Withdraw',
                'invest': 'Invest',
                'portfolio': 'Portfolio',
                'hideZeroAssets': 'Hide Zero Assets',
                
                // Portfolio section
                'portfolioValue': 'Portfolio Value',
                'allocation': 'Allocation',
                'yourProperties': 'Your Properties',
                'totalValue': 'Total Value',
                'growth': 'Growth',
                'monthlyCashflow': 'Monthly Cashflow',
                
                // Property cards
                'swap': 'Swap',
                'sell': 'Sell',
                
                // Profile dropdown
                'profile': 'Profile',
                'settings': 'Settings',
                'help': 'Help',
                'logout': 'Logout',
                
                // Notifications
                'notifications': 'Notifications',
                'markAllRead': 'Mark all as read',
                'viewAll': 'View all notifications',
                
                // Crowdfunding promo
                'crowdfundingTitle': 'New Crowdfunding',
                'crowdfundingSubtitle': 'Invest in properties starting from IDR 100,000',
                'learnMore': 'Learn More'
            },
            id: {
                // Sidebar menu items
                'overview': 'Ikhtisar',
                'portfolio': 'Portofolio',
                'marketplace': 'Marketplace',
                'transactions': 'Transaksi',
                'dividends': 'Dividen',
                'analytics': 'Analitik',
                'referrals': 'Referral',
                'wallet': 'Dompet',
                'support': 'Dukungan',
                'logOut': 'Keluar',
                
                // Page title
                'assetsOverview': 'Ikhtisar Aset',
                'welcome': 'Selamat datang kembali, Demo User!',
                'portfolioPerformance': 'Performa portofolio Anda meningkat 12,5% bulan ini',
                
                // Stats cards
                'balance': 'Saldo Tersedia',
                'accountValue': 'Nilai Akun',
                'rentEarned': 'Rental Diterima',
                'properties': 'Properti',
                
                // Quick actions
                'quickActions': 'Aksi Cepat',
                'withdraw': 'Tarik',
                'invest': 'Investasi',
                'portfolio': 'Portofolio',
                'hideZeroAssets': 'Sembunyikan Aset Kosong',
                
                // Portfolio section
                'portfolioValue': 'Nilai Portofolio',
                'allocation': 'Alokasi',
                'yourProperties': 'Properti Anda',
                'totalValue': 'Total Nilai',
                'growth': 'Pertumbuhan',
                'monthlyCashflow': 'Arus Kas Bulanan',
                
                // Property cards
                'swap': 'Tukar',
                'sell': 'Jual',
                
                // Profile dropdown
                'profile': 'Profil',
                'settings': 'Pengaturan',
                'help': 'Bantuan',
                'logout': 'Keluar',
                
                // Notifications
                'notifications': 'Notifikasi',
                'markAllRead': 'Tandai semua dibaca',
                'viewAll': 'Lihat semua notifikasi',
                
                // Crowdfunding promo
                'crowdfundingTitle': 'Crowdfunding Baru',
                'crowdfundingSubtitle': 'Investasi properti mulai dari IDR 100,000',
                'learnMore': 'Pelajari Lebih Lanjut'
            }
        };
        
        const currentTranslations = translations[lang];
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        
        // Apply translations
        Object.keys(currentTranslations).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = currentTranslations[key];
            });
        });
        
        // Store language preference
        localStorage.setItem('preferred_language', lang);
        
        // Show toast notification
        const message = lang === 'en' ? 'Language changed to English' : 'Bahasa diubah ke Indonesia';
        this.showToast(message, 'success');
        
        console.log(`🌐 Language switched to: ${lang}`);
    }
    
    // Language Switch Initialization
    initLanguageSwitch() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
        
        // Load saved language preference
        const savedLang = localStorage.getItem('preferred_language') || 'id';
        this.switchLanguage(savedLang);
    }
    
    // Public API Methods
    navigateTo(page) {
       this.navigateToPage(page);
   }
   
   refreshData() {
       this.loadDashboardData();
       this.showToast('Data refreshed successfully', 'success');
   }
   
   updateBalance(newBalance) {
       this.userData.balance = newBalance;
       this.updateStatsCards();
   }
}

// Initialize Dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
   // Check if user is authenticated (simple check)
   const isAuthenticated = localStorage.getItem('propertytoken_session') || 
                         sessionStorage.getItem('demo_login') || 
                         true; // Allow demo access
   
   if (!isAuthenticated) {
       console.log('🔒 User not authenticated, redirecting to login');
       window.location.href = 'index.html';
       return;
   }
   
   // Initialize dashboard
   window.dashboard = new PropertyTokenDashboard();
   
   // Add some demo session data
   sessionStorage.setItem('demo_login', 'true');
   sessionStorage.setItem('user_data', JSON.stringify({
       name: 'Demo User',
       email: 'demo@propertytoken.com',
       verified: true
   }));
   
   console.log('🎉 PropertyToken Dashboard loaded successfully!');
   
   // Add global keyboard shortcuts
   document.addEventListener('keydown', function(e) {
       // ESC to close modals/dropdowns
       if (e.key === 'Escape') {
           if (window.dashboard.notificationActive) {
               window.dashboard.closeNotifications();
           }
           if (window.dashboard.sidebarActive) {
               window.dashboard.closeMobileSidebar();
           }
       }
       
       // Alt + N for notifications
       if (e.altKey && e.key === 'n') {
           e.preventDefault();
           window.dashboard.toggleNotifications();
       }
       
       // Alt + M for mobile menu
       if (e.altKey && e.key === 'm') {
           e.preventDefault();
           window.dashboard.toggleMobileSidebar();
       }
   });
   
   // Add connection status monitoring
   window.addEventListener('online', () => {
       window.dashboard.showToast('Koneksi internet tersambung kembali', 'success');
   });
   
   window.addEventListener('offline', () => {
       window.dashboard.showToast('Koneksi internet terputus', 'error');
   });
});

// Add service worker for offline functionality (future enhancement)
if ('serviceWorker' in navigator) {
   window.addEventListener('load', function() {
       // navigator.serviceWorker.register('/sw.js')
       //     .then(registration => console.log('SW registered: ', registration))
       //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
   });
}
