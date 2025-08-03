// Marketplace Browse Listing JavaScript

class MarketplaceBrowseListing {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
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
        // Array of Unsplash property images
        const propertyImages = [
            'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
            'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a',
            'https://images.unsplash.com/photo-1472396961693-142e6e269027',
            'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
            'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
        ];

        this.allData = [
            {
                id: 1,
                name: "Villa Serene Bali",
                type: "Villa",
                location: "Ubud, Bali",
                image: propertyImages[0],
                totalTokens: 500,
                remainingTokens: 215,
                irr: 12,
                ery: 10,
                bedrooms: 5,
                bathrooms: 5,
                area: 705,
                seller: "J.D.",
                sellerRating: 4.8
            },
            {
                id: 2,
                name: "Jakarta City Tower",
                type: "Apartment",
                location: "Sudirman, Jakarta",
                image: propertyImages[1],
                totalTokens: 1000,
                remainingTokens: 670,
                irr: 10,
                ery: 8,
                bedrooms: 3,
                bathrooms: 2,
                area: 120,
                seller: "A.S.",
                sellerRating: 4.6
            },
            {
                id: 3,
                name: "Bassura Apartment",
                type: "Apartment",
                location: "Bassura, Jakarta",
                image: propertyImages[2],
                totalTokens: 750,
                remainingTokens: 320,
                irr: 8,
                ery: 7,
                bedrooms: 2,
                bathrooms: 2,
                area: 85,
                seller: "M.R.",
                sellerRating: 4.5
            },
            {
                id: 4,
                name: "Mont Blanc Office",
                type: "Office",
                location: "Kemang, Jakarta",
                image: propertyImages[3],
                totalTokens: 300,
                remainingTokens: 45,
                irr: 15,
                ery: 12,
                bedrooms: 0,
                bathrooms: 4,
                area: 280,
                seller: "K.L.",
                sellerRating: 4.9
            },
            {
                id: 5,
                name: "Ungasan Land Plot",
                type: "Land",
                location: "Ungasan, Bali",
                image: propertyImages[4],
                totalTokens: 200,
                remainingTokens: 180,
                irr: 18,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 500,
                seller: "D.P.",
                sellerRating: 4.7
            },
            {
                id: 6,
                name: "Villa Kulibul Bali",
                type: "Villa",
                location: "Canggu, Bali",
                image: propertyImages[5],
                totalTokens: 400,
                remainingTokens: 156,
                irr: 14,
                ery: 11,
                bedrooms: 4,
                bathrooms: 4,
                area: 450,
                seller: "R.H.",
                sellerRating: 4.8
            },
            {
                id: 7,
                name: "Jakarta Office Center",
                type: "Office",
                location: "SCBD, Jakarta",
                image: propertyImages[0],
                totalTokens: 600,
                remainingTokens: 234,
                irr: 11,
                ery: 9,
                bedrooms: 0,
                bathrooms: 6,
                area: 350,
                seller: "S.W.",
                sellerRating: 4.6
            },
            {
                id: 8,
                name: "Bali Beachfront Land",
                type: "Land",
                location: "Sanur, Bali",
                image: propertyImages[1],
                totalTokens: 150,
                remainingTokens: 95,
                irr: 20,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 800,
                seller: "T.K.",
                sellerRating: 4.9
            },
            {
                id: 9,
                name: "Menteng Luxury Apartment",
                type: "Apartment",
                location: "Menteng, Jakarta",
                image: propertyImages[2],
                totalTokens: 800,
                remainingTokens: 445,
                irr: 9,
                ery: 8,
                bedrooms: 3,
                bathrooms: 3,
                area: 150,
                seller: "L.M.",
                sellerRating: 4.7
            },
            {
                id: 10,
                name: "Seminyak Villa Resort",
                type: "Villa",
                location: "Seminyak, Bali",
                image: propertyImages[3],
                totalTokens: 350,
                remainingTokens: 98,
                irr: 13,
                ery: 10,
                bedrooms: 4,
                bathrooms: 5,
                area: 380,
                seller: "N.B.",
                sellerRating: 4.8
            },
            {
                id: 11,
                name: "Kelapa Gading Mall Office",
                type: "Office",
                location: "Kelapa Gading, Jakarta",
                image: propertyImages[4],
                totalTokens: 450,
                remainingTokens: 267,
                irr: 7,
                ery: 6,
                bedrooms: 0,
                bathrooms: 3,
                area: 200,
                seller: "P.S.",
                sellerRating: 4.5
            },
            {
                id: 12,
                name: "Denpasar Commercial Land",
                type: "Land",
                location: "Denpasar, Bali",
                image: propertyImages[5],
                totalTokens: 250,
                remainingTokens: 89,
                irr: 16,
                ery: 0,
                bedrooms: 0,
                bathrooms: 0,
                area: 600,
                seller: "G.A.",
                sellerRating: 4.6
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

        // Sort headers
        document.querySelectorAll('.sortable').forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-column');
                this.sortTable(column);
            });
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
        const minIRR = parseInt(document.getElementById('minPrice').value) || 0;
        const maxIRR = parseInt(document.getElementById('maxPrice').value) || Infinity;

        this.filteredData = this.allData.filter(property => {
            const matchesType = !propertyFilter || property.type.toLowerCase().includes(propertyFilter);
            const matchesIRR = property.irr >= minIRR && property.irr <= maxIRR;
            
            return matchesType && (minIRR === 0 && maxIRR === Infinity ? true : matchesIRR);
        });

        this.currentPage = 1;
        this.renderCards();
        this.renderPagination();

        this.showToast(`Filter applied. Found ${this.filteredData.length} properties.`, 'success');
    }

    // Sort table
    sortTable(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        // Update sort icons
        document.querySelectorAll('.sortable').forEach(header => {
            header.classList.remove('asc', 'desc');
            if (header.getAttribute('data-column') === column) {
                header.classList.add(this.sortDirection);
            }
        });

        // Sort data
        this.filteredData.sort((a, b) => {
            let aValue = a[column];
            let bValue = b[column];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (this.sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        this.renderCards();
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
            
            return `
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="property-card">
                        <div class="property-image">
                            <img src="${property.image}?w=400&h=240&fit=crop" alt="${property.name}">
                            <div class="property-status" data-en="Available" data-id="Tersedia">Available</div>
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
                                        <span class="tokens-left">${property.remainingTokens.toLocaleString()} <span data-en="tokens left" data-id="token tersisa">tokens left</span></span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                                    </div>
                                </div>
                                <div class="token-details">
                                    <span data-en="Total Tokens" data-id="Total Token">Total Tokens</span>
                                    <span>${property.totalTokens.toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <button class="btn btn-invest" data-property-id="${property.id}">
                                <i class="fas fa-coins me-2"></i>
                                <span data-en="Invest Now" data-id="Investasi Sekarang">Invest Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Apply current language to newly rendered content
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.applyLanguageToElements(currentLang);
    }

    // Render property details based on type
    renderPropertyDetails(property) {
        if (property.type === 'Land') {
            return `
                <div class="property-details">
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <div class="detail-value">${property.area}</div>
                        <div class="detail-label">sqm</div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-seedling"></i>
                        <div class="detail-value">${property.type}</div>
                        <div class="detail-label">Type</div>
                    </div>
                </div>
            `;
        } else if (property.type === 'Office') {
            return `
                <div class="property-details">
                    <div class="detail-item">
                        <i class="fas fa-toilet"></i>
                        <div class="detail-value">${property.bathrooms}</div>
                        <div class="detail-label">Bathrooms</div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <div class="detail-value">${property.area}</div>
                        <div class="detail-label">sqm</div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-building"></i>
                        <div class="detail-value">${property.type}</div>
                        <div class="detail-label">Type</div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="property-details">
                    <div class="detail-item">
                        <i class="fas fa-bed"></i>
                        <div class="detail-value">${property.bedrooms}</div>
                        <div class="detail-label">Bedrooms</div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-toilet"></i>
                        <div class="detail-value">${property.bathrooms}</div>
                        <div class="detail-label">Bathrooms</div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <div class="detail-value">${property.area}</div>
                        <div class="detail-label">sqm</div>
                    </div>
                </div>
            `;
        }
    }

    // Apply language to specific elements
    applyLanguageToElements(lang) {
        document.querySelectorAll('[data-en][data-id]').forEach(element => {
            if (lang === 'en' && element.getAttribute('data-en')) {
                element.textContent = element.getAttribute('data-en');
            } else if (lang === 'id' && element.getAttribute('data-id')) {
                element.textContent = element.getAttribute('data-id');
            }
        });
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
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">
                    <i class="fas fa-chevron-left"></i>
                </a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
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
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">
                    <i class="fas fa-chevron-right"></i>
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
            const message = currentLang === 'id' 
                ? `Anda akan berinvestasi pada ${property.name}. Tersisa ${property.remainingTokens} token.` 
                : `You are about to invest in ${property.name}. ${property.remainingTokens} tokens remaining.`;
            
            this.showToast(message, 'info');
            
            // Simulate investment process
            setTimeout(() => {
                const successMessage = currentLang === 'id' 
                    ? 'Investasi berhasil! Token telah ditambahkan ke portofolio Anda.' 
                    : 'Investment successful! Tokens have been added to your portfolio.';
                this.showToast(successMessage, 'success');
            }, 1500);
        }
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const toast = document.getElementById('toastNotification');
        const toastBody = document.getElementById('toastBody');
        
        if (toast && toastBody) {
            toastBody.textContent = message;
            
            // Update toast header icon based on type
            const toastHeader = toast.querySelector('.toast-header i');
            toastHeader.className = `fas me-2 ${this.getToastIcon(type)} ${this.getToastColor(type)}`;
            
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
        }
    }

    // Get toast icon based on type
    getToastIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    // Get toast color based on type
    getToastColor(type) {
        switch (type) {
            case 'success': return 'text-success';
            case 'error': return 'text-danger';
            case 'warning': return 'text-warning';
            default: return 'text-primary';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.marketplaceBrowseListing = new MarketplaceBrowseListing();
});