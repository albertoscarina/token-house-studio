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
        this.allData = [
            {
                id: 1,
                name: "Villa Serene Bali",
                type: "Villa",
                location: "Ubud, Bali",
                tokens: 500,
                pricePerToken: 2500000,
                totalPrice: 1250000000,
                seller: "J.D.",
                sellerRating: 4.8
            },
            {
                id: 2,
                name: "Jakarta City Tower",
                type: "Apartment",
                location: "Sudirman, Jakarta",
                tokens: 1000,
                pricePerToken: 1800000,
                totalPrice: 1800000000,
                seller: "A.S.",
                sellerRating: 4.6
            },
            {
                id: 3,
                name: "Bassura Apartment",
                type: "Apartment",
                location: "Bassura, Jakarta",
                tokens: 750,
                pricePerToken: 1200000,
                totalPrice: 900000000,
                seller: "M.R.",
                sellerRating: 4.5
            },
            {
                id: 4,
                name: "Mont Blanc Office",
                type: "Office",
                location: "Kemang, Jakarta",
                tokens: 300,
                pricePerToken: 3000000,
                totalPrice: 900000000,
                seller: "K.L.",
                sellerRating: 4.9
            },
            {
                id: 5,
                name: "Ungasan Land Plot",
                type: "Land",
                location: "Ungasan, Bali",
                tokens: 200,
                pricePerToken: 5000000,
                totalPrice: 1000000000,
                seller: "D.P.",
                sellerRating: 4.7
            },
            {
                id: 6,
                name: "Villa Kulibul Bali",
                type: "Villa",
                location: "Canggu, Bali",
                tokens: 400,
                pricePerToken: 3200000,
                totalPrice: 1280000000,
                seller: "R.H.",
                sellerRating: 4.8
            },
            {
                id: 7,
                name: "Jakarta Office Center",
                type: "Office",
                location: "SCBD, Jakarta",
                tokens: 600,
                pricePerToken: 2800000,
                totalPrice: 1680000000,
                seller: "S.W.",
                sellerRating: 4.6
            },
            {
                id: 8,
                name: "Bali Beachfront Land",
                type: "Land",
                location: "Sanur, Bali",
                tokens: 150,
                pricePerToken: 6500000,
                totalPrice: 975000000,
                seller: "T.K.",
                sellerRating: 4.9
            },
            {
                id: 9,
                name: "Menteng Luxury Apartment",
                type: "Apartment",
                location: "Menteng, Jakarta",
                tokens: 800,
                pricePerToken: 2200000,
                totalPrice: 1760000000,
                seller: "L.M.",
                sellerRating: 4.7
            },
            {
                id: 10,
                name: "Seminyak Villa Resort",
                type: "Villa",
                location: "Seminyak, Bali",
                tokens: 350,
                pricePerToken: 4000000,
                totalPrice: 1400000000,
                seller: "N.B.",
                sellerRating: 4.8
            },
            {
                id: 11,
                name: "Kelapa Gading Mall Office",
                type: "Office",
                location: "Kelapa Gading, Jakarta",
                tokens: 450,
                pricePerToken: 2600000,
                totalPrice: 1170000000,
                seller: "P.S.",
                sellerRating: 4.5
            },
            {
                id: 12,
                name: "Denpasar Commercial Land",
                type: "Land",
                location: "Denpasar, Bali",
                tokens: 250,
                pricePerToken: 4500000,
                totalPrice: 1125000000,
                seller: "G.A.",
                sellerRating: 4.6
            }
        ];

        this.filteredData = [...this.allData];
        this.renderTable();
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

        // Buy buttons (will be added dynamically)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-buy')) {
                const propertyId = e.target.closest('.btn-buy').getAttribute('data-property-id');
                this.handleBuyAction(propertyId);
            }
        });

        // Pagination (will be added dynamically)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.page-link')) {
                e.preventDefault();
                const page = parseInt(e.target.closest('.page-link').getAttribute('data-page'));
                if (page && page !== this.currentPage) {
                    this.currentPage = page;
                    this.renderTable();
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
        
        // Re-render table to update language
        this.renderTable();
        this.renderPagination();
    }

    // Apply filters
    applyFilters() {
        const propertyFilter = document.getElementById('propertyFilter').value.toLowerCase();
        const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;

        this.filteredData = this.allData.filter(property => {
            const matchesType = !propertyFilter || property.type.toLowerCase().includes(propertyFilter);
            const matchesPrice = property.pricePerToken >= minPrice && property.pricePerToken <= maxPrice;
            
            return matchesType && matchesPrice;
        });

        this.currentPage = 1;
        this.renderTable();
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

        this.renderTable();
    }

    // Render table
    renderTable() {
        const tbody = document.getElementById('propertiesTableBody');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        if (pageData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <i class="fas fa-home"></i>
                        <div class="mt-2">
                            <h6 data-en="No properties found" data-id="Tidak ada properti ditemukan">No properties found</h6>
                            <p class="text-muted" data-en="Try adjusting your filters" data-id="Coba sesuaikan filter Anda">Try adjusting your filters</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = pageData.map(property => `
            <tr>
                <td>
                    <div class="property-name">${property.name}</div>
                    <small class="property-type badge-property-type">${property.type}</small>
                </td>
                <td class="location-text">${property.location}</td>
                <td class="token-amount">${property.tokens.toLocaleString()} tokens</td>
                <td class="price-text price-idr">Rp ${property.pricePerToken.toLocaleString()}</td>
                <td class="price-text price-idr">Rp ${property.totalPrice.toLocaleString()}</td>
                <td>
                    <div class="seller-name">${property.seller}</div>
                    <div class="seller-rating">
                        <i class="fas fa-star"></i> ${property.sellerRating}
                    </div>
                </td>
                <td>
                    <button class="btn btn-buy btn-sm" data-property-id="${property.id}">
                        <i class="fas fa-shopping-cart me-1"></i>
                        <span data-en="Buy" data-id="Beli">Buy</span>
                    </button>
                </td>
            </tr>
        `).join('');

        // Apply current language to newly rendered content
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        this.applyLanguageToElements(currentLang);
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

    // Handle buy action
    handleBuyAction(propertyId) {
        const property = this.allData.find(p => p.id == propertyId);
        if (property) {
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            const message = currentLang === 'id' 
                ? `Anda akan membeli ${property.tokens} token dari ${property.name}` 
                : `You are about to buy ${property.tokens} tokens of ${property.name}`;
            
            this.showToast(message, 'info');
            
            // Simulate buy process
            setTimeout(() => {
                const successMessage = currentLang === 'id' 
                    ? 'Pembelian berhasil! Token telah ditambahkan ke portofolio Anda.' 
                    : 'Purchase successful! Tokens have been added to your portfolio.';
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