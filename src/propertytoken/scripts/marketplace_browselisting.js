// Marketplace Browse Listing JavaScript

class MarketplaceBrowseListing {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.sortColumn = '';
        this.sortDirection = 'asc';
        this.filteredData = [];
        this.allData = [];
        
        this.init();
    }

    init() {
        this.loadPropertyData();
        this.setupEventListeners();
        this.setupSidebar();
        this.setupLanguage();
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
                totalTokens: 500,
                remainingTokens: 215,
                irr: 12.5,
                ery: 10.2,
                bedrooms: 5,
                bathrooms: 5,
                area: 705
            },
            {
                id: 2,
                name: "Jakarta City Tower",
                type: "apartment",
                location: "Sudirman, Jakarta",
                image: "images/jakarta-city-tower.jpg",
                totalTokens: 1000,
                remainingTokens: 670,
                irr: 10.8,
                ery: 8.5,
                bedrooms: 3,
                bathrooms: 2,
                area: 120
            },
            {
                id: 3,
                name: "Bassura Apartment",
                type: "apartment",
                location: "Bassura, Jakarta",
                image: "images/bassura-apartment.jpg",
                totalTokens: 750,
                remainingTokens: 320,
                irr: 8.2,
                ery: 7.1,
                bedrooms: 2,
                bathrooms: 2,
                area: 85
            },
            {
                id: 4,
                name: "Mont Blanc Office",
                type: "office",
                location: "Kemang, Jakarta",
                image: "images/mont-blanc.jpg",
                totalTokens: 300,
                remainingTokens: 45,
                irr: 15.3,
                ery: 12.7,
                bedrooms: 0,
                bathrooms: 4,
                area: 280
            },
            {
                id: 5,
                name: "Ungasan Land Plot",
                type: "land",
                location: "Ungasan, Bali",
                image: "images/ungasan-land1.jpg",
                totalTokens: 200,
                remainingTokens: 180,
                irr: 18.5,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 500
            },
            {
                id: 6,
                name: "Villa Kulibul Bali",
                type: "villa",
                location: "Canggu, Bali",
                image: "images/villa-kulibul.jpg",
                totalTokens: 400,
                remainingTokens: 156,
                irr: 14.2,
                ery: 11.8,
                bedrooms: 4,
                bathrooms: 4,
                area: 450
            },
            {
                id: 7,
                name: "Jakarta Office Center",
                type: "office",
                location: "SCBD, Jakarta",
                image: "images/jakarta-office.jpg",
                totalTokens: 600,
                remainingTokens: 234,
                irr: 11.7,
                ery: 9.3,
                bedrooms: 0,
                bathrooms: 6,
                area: 350
            },
            {
                id: 8,
                name: "Bali Beachfront Land",
                type: "land",
                location: "Sanur, Bali",
                image: "images/ungasan-land2.jpg",
                totalTokens: 150,
                remainingTokens: 95,
                irr: 20.1,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 800
            },
            {
                id: 9,
                name: "Menteng Luxury Apartment",
                type: "apartment",
                location: "Menteng, Jakarta",
                image: "images/mont-blanc-apartment.jpg",
                totalTokens: 800,
                remainingTokens: 445,
                irr: 9.6,
                ery: 8.2,
                bedrooms: 3,
                bathrooms: 3,
                area: 150
            }
        ];

        this.filteredData = [...this.allData];
        this.renderCards();
        this.renderPagination();
    }

    // Setup event listeners
    setupEventListeners() {
        // Filter button
        document.getElementById('applyFilter').addEventListener('click', () => {
            this.applyFilters();
        });

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
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    }

    // Setup sidebar functionality
    setupSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    }

    // Setup language functionality
    setupLanguage() {
        const languageOptions = document.querySelectorAll('.language-option');
        
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });

        // Load saved language
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        this.switchLanguage(savedLang);
    }

    // Switch language
    switchLanguage(lang) {
        const currentLangElement = document.getElementById('currentLang');
        if (currentLangElement) {
            currentLangElement.textContent = lang.toUpperCase();
        }

        // Apply language to all elements with data-en and data-id attributes
        document.querySelectorAll('[data-en][data-id]').forEach(element => {
            if (lang === 'en' && element.getAttribute('data-en')) {
                element.textContent = element.getAttribute('data-en');
            } else if (lang === 'id' && element.getAttribute('data-id')) {
                element.textContent = element.getAttribute('data-id');
            }
        });

        // Save language preference
        localStorage.setItem('selectedLanguage', lang);
        
        // Re-render cards to update language
        this.renderCards();
        this.renderPagination();
    }

    // Apply filters
    applyFilters() {
        const propertyFilter = document.getElementById('propertyFilter').value.toLowerCase();
        const minIRR = parseFloat(document.getElementById('minIRR').value) || 0;
        const maxIRR = parseFloat(document.getElementById('maxIRR').value) || Infinity;

        this.filteredData = this.allData.filter(property => {
            const matchesType = !propertyFilter || property.type.toLowerCase() === propertyFilter;
            const matchesIRR = property.irr >= minIRR && property.irr <= maxIRR;
            
            return matchesType && matchesIRR;
        });

        this.currentPage = 1;
        this.renderCards();
        this.renderPagination();

        this.showToast(`Filter applied. Found ${this.filteredData.length} properties.`, 'success');
    }

    // Render property cards
    renderCards() {
        const grid = document.getElementById('propertiesGrid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        if (pageData.length === 0) {
            grid.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        <i class="fas fa-home"></i>
                        <h6 data-en="No properties found" data-id="Tidak ada properti ditemukan">No properties found</h6>
                        <p class="text-muted" data-en="Try adjusting your filters" data-id="Coba sesuaikan filter Anda">Try adjusting your filters</p>
                    </div>
                </div>
            `;
            return;
        }

        grid.innerHTML = pageData.map(property => {
            const progressPercentage = Math.round(((property.totalTokens - property.remainingTokens) / property.totalTokens) * 100);
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            
            return `
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="property-card">
                        <div class="property-image">
                            <img src="${property.image}" alt="${property.name}" onerror="this.src='images/property-placeholder.jpg'">
                            <div class="property-status">${currentLang === 'en' ? 'Available' : 'Tersedia'}</div>
                        </div>
                        
                        <div class="property-info">
                            <h3 class="property-name">${property.name}</h3>
                            <div class="property-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${property.location}
                            </div>
                            
                            ${this.renderPropertyDetails(property, currentLang)}
                            
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
                                        <span class="tokens-left">${property.remainingTokens.toLocaleString()} ${currentLang === 'en' ? 'tokens left' : 'token tersisa'}</span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                                    </div>
                                </div>
                                <div class="token-details">
                                    <span>${currentLang === 'en' ? 'Total Tokens' : 'Total Token'}</span>
                                    <span>${property.totalTokens.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <button class="btn btn-invest" data-property-id="${property.id}">
                                <i class="fas fa-coins me-2"></i>
                                ${currentLang === 'en' ? 'Invest Now' : 'Investasi Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render property details based on type
    renderPropertyDetails(property, lang) {
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
                            <div class="detail-value">${lang === 'en' ? 'Land' : 'Tanah'}</div>
                            <div class="detail-label">${lang === 'en' ? 'Type' : 'Tipe'}</div>
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
                            <div class="detail-label">${lang === 'en' ? 'Bathrooms' : 'Kamar Mandi'}</div>
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
                            <div class="detail-label">${lang === 'en' ? 'Bedrooms' : 'Kamar Tidur'}</div>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-toilet"></i>
                        <div>
                            <div class="detail-value">${property.bathrooms}</div>
                            <div class="detail-label">${lang === 'en' ? 'Bathrooms' : 'Kamar Mandi'}</div>
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

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                paginationHTML += `
                    <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += `
                    <li class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>
                `;
            }
        }

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

    // Handle invest action
    handleInvestAction(propertyId) {
        const property = this.allData.find(p => p.id == propertyId);
        if (property) {
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            const message = currentLang === 'en' 
                ? `Investment action for ${property.name}. This is a demo - no actual investment will be processed.`
                : `Aksi investasi untuk ${property.name}. Ini adalah demo - tidak ada investasi sebenarnya yang akan diproses.`;
            
            this.showToast(message, 'info');
        }
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const toastElement = document.getElementById('toastNotification');
        const toastBody = document.getElementById('toastBody');
        
        if (toastElement && toastBody) {
            toastBody.textContent = message;
            
            // Change toast style based on type
            toastElement.className = `toast ${type === 'success' ? 'bg-success text-white' : type === 'error' ? 'bg-danger text-white' : ''}`;
            
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarketplaceBrowseListing();
});