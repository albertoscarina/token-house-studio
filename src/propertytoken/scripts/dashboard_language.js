// PropertyToken Dashboard Language Support
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('propertytoken_language') || 'en';
        this.init();
    }

    init() {
        // Apply saved language on page load
        this.applyLanguage(this.currentLang);
        
        // Setup language switcher event listeners
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        this.applyLanguage(lang);
        localStorage.setItem('propertytoken_language', lang);
        
        // Update active button
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        
        // Show notification
        const message = lang === 'en' ? 'Language switched to English' : 'Bahasa diubah ke Indonesia';
        this.showToast(message, 'success');
    }

    applyLanguage(lang) {
        document.querySelectorAll('[data-en][data-id]').forEach(element => {
            const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-id');
            element.textContent = text;
        });
    }

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

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.languageManager = new LanguageManager();
});