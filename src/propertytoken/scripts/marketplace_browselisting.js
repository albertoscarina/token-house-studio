// Marketplace Browse Listing JavaScript

class MarketplaceBrowseListing {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.sortColumn = '';
        this.sortDirection = 'asc';
        this.filteredData = [];
        this.allData = [];
        this.currentLanguage = 'en';
        
        this.init();
    }

    init() {
        this.loadPropertyData();
        this.setupEventListeners();
        this.setupSidebar();
        this.setupLanguage();
        this.setupBootstrapComponents();
    }

    // Load mock property data
    loadPropertyData() {
        this.allData = [
            {
                id: 1,
                name: "Villa Serene Bali",
                type: "villa",
                location: "Ubud, Bali",
                image: "images/villa-serene-bali.jpg",
                totalTokens: 21000,
                remainingTokens: 20045,
                irr: 12,
                ery: 10,
                bedrooms: 3,
                bathrooms: 3,
                area: 211
            },
            {
                id: 2,
                name: "Villa Gantari", 
                type: "villa",
                location: "Ubud, Bali",
                image: "images/villa-kulibul.jpg",
                totalTokens: 5025,
                remainingTokens: 4866,
                irr: 12,
                ery: 10,
                bedrooms: 4,
                bathrooms: 4,
                area: 1188
            },
            {
                id: 3,
                name: "Villa Kulibul",
                type: "villa", 
                location: "Canggu, Bali",
                image: "images/villa-serene-bali.jpg",
                totalTokens: 13095,
                remainingTokens: 12898,
                irr: 12,
                ery: 10,
                bedrooms: 3,
                bathrooms: 3,
                area: 510
            },
            {
                id: 4,
                name: "Bassura City Apartment D/32/BR",
                type: "apartment",
                location: "Jatinegara, Jakarta Timur", 
                image: "images/bassura-apartment.jpg",
                totalTokens: 32,
                remainingTokens: 30,
                irr: 9,
                ery: 8,
                bedrooms: 1,
                bathrooms: 1,
                area: 24
            },
            {
                id: 5,
                name: "Villa Parahyangan",
                type: "villa",
                location: "Bandung, Jawa Barat",
                image: "images/villa-kulibul.jpg", 
                totalTokens: 500,
                remainingTokens: 480,
                irr: 14,
                ery: 12,
                bedrooms: 4,
                bathrooms: 3,
                area: 250
            },
            {
                id: 6,
                name: "Jakarta Office Tower",
                type: "office",
                location: "SCBD, Jakarta",
                image: "images/jakarta-office.jpg",
                totalTokens: 800,
                remainingTokens: 550,
                irr: 11,
                ery: 9,
                bedrooms: 0,
                bathrooms: 4,
                area: 180
            },
            {
                id: 7,
                name: "Menteng Premium Apartment",
                type: "apartment",
                location: "Menteng, Jakarta",
                image: "images/mont-blanc-apartment.jpg",
                totalTokens: 1200,
                remainingTokens: 890,
                irr: 10,
                ery: 8,
                bedrooms: 2,
                bathrooms: 2,
                area: 95
            },
            {
                id: 8,
                name: "Ungasan Land Development",
                type: "land",
                location: "Ungasan, Bali",
                image: "images/ungasan-land1.jpg",
                totalTokens: 300,
                remainingTokens: 275,
                irr: 18,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 800
            },
            {
                id: 9,
                name: "Seminyak Beach Villa",
                type: "villa",
                location: "Seminyak, Bali", 
                image: "images/villa-serene-bali.jpg",
                totalTokens: 950,
                remainingTokens: 720,
                irr: 13,
                ery: 11,
                bedrooms: 5,
                bathrooms: 4,
                area: 420
            },
            {
                id: 10,
                name: "Kelapa Gading Office",
                type: "office",
                location: "Kelapa Gading, Jakarta",
                image: "images/jakarta-office.jpg",
                totalTokens: 650,
                remainingTokens: 445,
                irr: 8,
                ery: 6,
                bedrooms: 0,
                bathrooms: 3,
                area: 150
            },
            {
                id: 11,
                name: "Sanur Beachfront Land",
                type: "land",
                location: "Sanur, Bali",
                image: "images/ungasan-land2.jpg",
                totalTokens: 220,
                remainingTokens: 180,
                irr: 20,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 1200
            },
            {
                id: 12,
                name: "Bintaro Modern Villa",
                type: "villa",
                location: "Bintaro, Jakarta Selatan",
                image: "images/villa-kulibul.jpg",
                totalTokens: 750,
                remainingTokens: 590,
                irr: 11,
                ery: 9,
                bedrooms: 4,
                bathrooms: 3,
                area: 300
            },
            {
                id: 13,
                name: "Canggu Sunset Villa",
                type: "villa",
                location: "Canggu, Bali",
                image: "images/villa-serene-bali.jpg",
                totalTokens: 1100,
                remainingTokens: 850,
                irr: 15,
                ery: 13,
                bedrooms: 6,
                bathrooms: 5,
                area: 500
            },
            {
                id: 14,
                name: "Thamrin Executive Office",
                type: "office", 
                location: "Thamrin, Jakarta",
                image: "images/jakarta-office.jpg",
                totalTokens: 900,
                remainingTokens: 670,
                irr: 9,
                ery: 7,
                bedrooms: 0,
                bathrooms: 5,
                area: 220
            },
            {
                id: 15,
                name: "Kemang Luxury Apartment",
                type: "apartment",
                location: "Kemang, Jakarta",
                image: "images/mont-blanc-apartment.jpg", 
                totalTokens: 850,
                remainingTokens: 600,
                irr: 10,
                ery: 8,
                bedrooms: 3,
                bathrooms: 2,
                area: 120
            },
            {
                id: 16,
                name: "Denpasar Commercial Land",
                type: "land",
                location: "Denpasar, Bali",
                image: "images/ungasan-land1.jpg",
                totalTokens: 400,
                remainingTokens: 320,
                irr: 17,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 1500
            },
            {
                id: 17,
                name: "Ubud Hillside Villa",
                type: "villa",
                location: "Ubud, Bali",
                image: "images/villa-kulibul.jpg",
                totalTokens: 1250,
                remainingTokens: 980,
                irr: 14,
                ery: 12,
                bedrooms: 5,
                bathrooms: 4,
                area: 450
            },
            {
                id: 18,
                name: "PIK Modern Apartment",
                type: "apartment",
                location: "PIK, Jakarta",
                image: "images/bassura-apartment.jpg",
                totalTokens: 700,
                remainingTokens: 520,
                irr: 9,
                ery: 7,
                bedrooms: 2,
                bathrooms: 2,
                area: 85
            },
            {
                id: 19,
                name: "Sudirman Corporate Office",
                type: "office",
                location: "Sudirman, Jakarta", 
                image: "images/jakarta-office.jpg",
                totalTokens: 1500,
                remainingTokens: 1200,
                irr: 12,
                ery: 10,
                bedrooms: 0,
                bathrooms: 8,
                area: 400
            },
            {
                id: 20,
                name: "Jimbaran Bay Villa",
                type: "villa",
                location: "Jimbaran, Bali",
                image: "images/villa-serene-bali.jpg",
                totalTokens: 1800,
                remainingTokens: 1350,
                irr: 16,
                ery: 14,
                bedrooms: 7,
                bathrooms: 6,
                area: 600
            },
            {
                id: 21,
                name: "Gianyar Investment Land",
                type: "land",
                location: "Gianyar, Bali",
                image: "images/ungasan-land2.jpg",
                totalTokens: 250,
                remainingTokens: 190,
                irr: 19,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 2000
            },
            {
                id: 22,
                name: "Pondok Indah Residence",
                type: "villa",
                location: "Pondok Indah, Jakarta",
                image: "images/villa-kulibul.jpg",
                totalTokens: 950,
                remainingTokens: 750,
                irr: 10,
                ery: 8,
                bedrooms: 4,
                bathrooms: 3,
                area: 280
            },
            {
                id: 23,
                name: "Kuningan Business Center",
                type: "office",
                location: "Kuningan, Jakarta",
                image: "images/jakarta-office.jpg",
                totalTokens: 1100,
                remainingTokens: 890,
                irr: 11,
                ery: 9,
                bedrooms: 0,
                bathrooms: 6,
                area: 320
            },
            {
                id: 24,
                name: "Senayan City Apartment",
                type: "apartment",
                location: "Senayan, Jakarta",
                image: "images/mont-blanc-apartment.jpg",
                totalTokens: 1300,
                remainingTokens: 1100,
                irr: 8,
                ery: 6,
                bedrooms: 3,
                bathrooms: 3,
                area: 140
            }
        ];

        this.filteredData = [...this.allData];
        this.renderCards();
        this.renderPagination();
    }

    // Setup event listeners
    setupEventListeners() {
        // Filter button
        const applyFilterBtn = document.getElementById('applyFilter');
        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }

        // Invest buttons (will be added dynamically)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-invest')) {
                const propertyId = e.target.closest('.btn-invest').getAttribute('data-property-id');
                this.handleInvestAction(propertyId);
            }
        });

        // Pagination (will be added dynamically)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.page-link')) {
                e.preventDefault();
                const page = parseInt(e.target.closest('.page-link').getAttribute('data-page'));
                if (page && page !== this.currentPage) {
                    this.currentPage = page;
                    this.renderCards();
                    this.renderPagination();
                    this.scrollToTop();
                }
            }
        });

        // Enter key support for filter inputs
        const filterInputs = ['propertyFilter', 'minIRR', 'maxIRR'];
        filterInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.applyFilters();
                    }
                });
            }
        });
    }

    // Setup sidebar functionality
    setupSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.toggle('active');
                }
            });
        }

        // Close sidebar when clicking overlay
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        }

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove('active');
                }
            }
        });

        // Add submenu toggle functionality
        window.toggleSubmenu = function(element) {
            const submenu = element.parentNode.querySelector('.nav-submenu');
            const chevron = element.querySelector('.nav-chevron');
            
            if (submenu) {
                submenu.classList.toggle('show');
                if (chevron) {
                    chevron.classList.toggle('rotated');
                }
            }
        };
    }

    // Setup language functionality
    setupLanguage() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.switchLanguage(lang);
                
                // Update active states
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Load saved language
        const savedLang = localStorage.getItem('propertytoken_language') || 'en';
        this.switchLanguage(savedLang);
        
        // Set active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
        });
    }

    // Setup Bootstrap components
    setupBootstrapComponents() {
        // Initialize tooltips if any
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        if (window.bootstrap && window.bootstrap.Tooltip) {
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    }

    // Switch language
    switchLanguage(lang) {
        this.currentLanguage = lang;
        const currentLangElement = document.getElementById('currentLang');
        if (currentLangElement) {
            currentLangElement.textContent = lang.toUpperCase();
        }

        // Apply language to all elements with data-en and data-id attributes
        document.querySelectorAll('[data-en][data-id]').forEach(element => {
            const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-id');
            if (text) {
                element.textContent = text;
            }
        });

        // Save language preference
        localStorage.setItem('propertytoken_language', lang);
        
        // Re-render cards to update language
        this.renderCards();
        this.renderPagination();
    }

    // Apply filters
    applyFilters() {
        const propertyFilter = document.getElementById('propertyFilter')?.value.toLowerCase() || '';
        const minIRR = parseFloat(document.getElementById('minIRR')?.value) || 0;
        const maxIRR = parseFloat(document.getElementById('maxIRR')?.value) || Infinity;

        this.filteredData = this.allData.filter(property => {
            const matchesType = !propertyFilter || property.type.toLowerCase() === propertyFilter;
            const matchesIRR = property.irr >= minIRR && property.irr <= maxIRR;
            
            return matchesType && matchesIRR;
        });

        this.currentPage = 1;
        this.renderCards();
        this.renderPagination();

        const message = this.currentLanguage === 'en' 
            ? `Filter applied. Found ${this.filteredData.length} properties.`
            : `Filter diterapkan. Ditemukan ${this.filteredData.length} properti.`;
        
        this.showToast(message, 'success');
    }

    // Render property cards
    renderCards() {
        const grid = document.getElementById('propertiesGrid');
        if (!grid) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        if (pageData.length === 0) {
            grid.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        <i class="fas fa-home"></i>
                        <h6>${this.currentLanguage === 'en' ? 'No properties found' : 'Tidak ada properti ditemukan'}</h6>
                        <p class="text-muted">${this.currentLanguage === 'en' ? 'Try adjusting your filters' : 'Coba sesuaikan filter Anda'}</p>
                    </div>
                </div>
            `;
            return;
        }

        grid.innerHTML = pageData.map(property => {
            const progressPercentage = Math.round(((property.totalTokens - property.remainingTokens) / property.totalTokens) * 100);
            
            return `
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="property-card">
                        <div class="property-image">
                            <img src="${property.image}" alt="${property.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjZTJlOGYwIi8+CjxwYXRoIGQ9Ik0xMjAgMTIwaDYwdjYwaC02MHoiIGZpbGw9IiM5NGEzYjgiLz4KPHBhdGggZD0iTTkwIDkwaDEyMHY5MEg5MHoiIHN0cm9rZT0iIzY0NzQ4YiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPlByb3BlcnR5IEltYWdlPC90ZXh0Pgo8L3N2Zz4K'">
                            <div class="property-status">${this.currentLanguage === 'en' ? 'Available' : 'Tersedia'}</div>
                        </div>
                        
                        <div class="property-info">
                            <h3 class="property-name">${property.name}</h3>
                            <div class="property-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${property.location}
                            </div>
                            
                            ${this.renderPropertyDetails(property)}
                            
                            <div class="financial-metrics">
                                <div class="metric">
                                    <div class="metric-value">${property.irr}%</div>
                                    <div class="metric-label">IRR</div>
                                </div>
                                <div class="metric">
                                    <div class="metric-value">${property.ery}%</div>
                                    <div class="metric-label">ERY</div>
                                </div>
                            </div>
                            
                            <div class="token-info">
                                <div class="token-progress">
                                    <div class="token-stats">
                                        <span class="progress-percentage">${progressPercentage}%</span>
                                        <span class="tokens-left">${property.remainingTokens.toLocaleString()} ${this.currentLanguage === 'en' ? 'tokens left' : 'token tersisa'}</span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                                    </div>
                                </div>
                                <div class="token-details">
                                    <span>${this.currentLanguage === 'en' ? 'Total Tokens' : 'Total Token'}</span>
                                    <span>${property.totalTokens.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <button class="btn btn-invest" data-property-id="${property.id}">
                                <i class="fas fa-coins me-2"></i>
                                ${this.currentLanguage === 'en' ? 'Invest Now' : 'Investasi Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render property details based on type
    renderPropertyDetails(property) {
        if (property.type === 'land') {
            return `
                <div class="property-details">
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <div>
                            <div class="detail-value">${property.area}</div>
                            <div class="detail-label">sqm</div>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-seedling"></i>
                        <div>
                            <div class="detail-value">${this.currentLanguage === 'en' ? 'Land' : 'Tanah'}</div>
                            <div class="detail-label">${this.currentLanguage === 'en' ? 'Type' : 'Tipe'}</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (property.type === 'office') {
            return `
                <div class="property-details">
                    <div class="detail-item">
                        <i class="fas fa-toilet"></i>
                        <div>
                            <div class="detail-value">${property.bathrooms}</div>
                            <div class="detail-label">${this.currentLanguage === 'en' ? 'Bathrooms' : 'Kamar Mandi'}</div>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <div>
                            <div class="detail-value">${property.area}</div>
                            <div class="detail-label">sqm</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Villa or Apartment
            return `
                <div class="property-details">
                    <div class="detail-item">
                        <i class="fas fa-bed"></i>
                        <div>
                            <div class="detail-value">${property.bedrooms}</div>
                            <div class="detail-label">${this.currentLanguage === 'en' ? 'Bedrooms' : 'Kamar Tidur'}</div>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-toilet"></i>
                        <div>
                            <div class="detail-value">${property.bathrooms}</div>
                            <div class="detail-label">${this.currentLanguage === 'en' ? 'Bathrooms' : 'Kamar Mandi'}</div>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <div>
                            <div class="detail-value">${property.area}</div>
                            <div class="detail-label">sqm</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Render pagination
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        `;

        // Page numbers with smart truncation
        const showPages = this.getPageNumbers(this.currentPage, totalPages);
        showPages.forEach(page => {
            if (page === '...') {
                paginationHTML += `
                    <li class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>
                `;
            } else {
                paginationHTML += `
                    <li class="page-item ${page === this.currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${page}">${page}</a>
                    </li>
                `;
            }
        });

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        `;

        pagination.innerHTML = paginationHTML;
    }

    // Get page numbers for pagination with smart truncation
    getPageNumbers(current, total) {
        const pages = [];
        
        if (total <= 7) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (current <= 4) {
                // Show pages 2-5 and ellipsis
                for (let i = 2; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
            } else if (current >= total - 3) {
                // Show ellipsis and last 4 pages
                pages.push('...');
                for (let i = total - 4; i <= total - 1; i++) {
                    pages.push(i);
                }
            } else {
                // Show ellipsis, current-1, current, current+1, ellipsis
                pages.push('...');
                for (let i = current - 1; i <= current + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
            }
            
            // Always show last page
            if (total > 1) {
                pages.push(total);
            }
        }
        
        return pages;
    }

    // Handle invest action
    handleInvestAction(propertyId) {
        const property = this.allData.find(p => p.id == propertyId);
        if (property) {
            const message = this.currentLanguage === 'en' 
                ? `Investment action for ${property.name}. This is a demo - no actual investment will be processed.`
                : `Aksi investasi untuk ${property.name}. Ini adalah demo - tidak ada investasi sebenarnya yang akan diproses.`;
            
            this.showToast(message, 'info');
            
            // In a real application, this would redirect to the investment flow
            // window.location.href = `invest.html?property=${propertyId}`;
        }
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const toastElement = document.getElementById('toastNotification');
        const toastBody = document.getElementById('toastBody');
        
        if (toastElement && toastBody) {
            toastBody.textContent = message;
            
            // Reset classes
            toastElement.className = 'toast';
            
            // Add type-specific classes
            if (type === 'success') {
                toastElement.classList.add('text-bg-success');
            } else if (type === 'error') {
                toastElement.classList.add('text-bg-danger');
            } else if (type === 'warning') {
                toastElement.classList.add('text-bg-warning');
            }
            
            // Show toast using Bootstrap
            if (window.bootstrap && window.bootstrap.Toast) {
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
            }
        }
    }

    // Scroll to top smoothly
    scrollToTop() {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }

    // Utility method to format numbers
    formatNumber(num) {
        return new Intl.NumberFormat(this.currentLanguage === 'id' ? 'id-ID' : 'en-US').format(num);
    }

    // Utility method to format currency
    formatCurrency(amount, currency = 'IDR') {
        const locale = this.currentLanguage === 'id' ? 'id-ID' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Handle image loading errors
    handleImageError(img) {
        img.onerror = null; // Prevent infinite loop
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjZTJlOGYwIi8+CjxwYXRoIGQ9Ik0xMjAgMTIwaDYwdjYwaC02MHoiIGZpbGw9IiM5NGEzYjgiLz4KPHBhdGggZD0iTTkwIDkwaDEyMHY5MEg5MHoiIHN0cm9rZT0iIzY0NzQ4YiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPlByb3BlcnR5IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    }
}

// Initialize when DOM is loaded
let marketplace;
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the marketplace browse listing page
    if (document.getElementById('propertiesGrid')) {
        marketplace = new MarketplaceBrowseListing();
        window.marketplace = marketplace; // Make available globally for image error handling
    }
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarketplaceBrowseListing;
}
