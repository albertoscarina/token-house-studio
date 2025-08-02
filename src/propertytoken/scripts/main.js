// PropertyToken GapuraPrima - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
   // Mobile menu toggle
   const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
   const mobileMenu = document.querySelector('.mobile-menu');
   
   if (mobileMenuToggle && mobileMenu) {
       mobileMenuToggle.addEventListener('click', function() {
           mobileMenu.classList.toggle('active');
           const icon = mobileMenuToggle.querySelector('i');
           if (mobileMenu.classList.contains('active')) {
               icon.classList.remove('fa-bars');
               icon.classList.add('fa-times');
           } else {
               icon.classList.remove('fa-times');
               icon.classList.add('fa-bars');
           }
       });
       
       // Close mobile menu when clicking on links
       const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
       mobileNavLinks.forEach(link => {
           link.addEventListener('click', function() {
               mobileMenu.classList.remove('active');
               const icon = mobileMenuToggle.querySelector('i');
               icon.classList.remove('fa-times');
               icon.classList.add('fa-bars');
           });
       });
   }
   
   // Property carousel
   const propertySlides = document.querySelectorAll('.property-slide');
   const indicators = document.querySelectorAll('.indicator');
   let currentSlide = 0;
   
   function showSlide(index) {
       // Remove active class from all slides and indicators
       propertySlides.forEach(slide => slide.classList.remove('active'));
       indicators.forEach(indicator => indicator.classList.remove('active'));
       
       // Add active class to current slide and indicator
       if (propertySlides[index]) {
           propertySlides[index].classList.add('active');
       }
       if (indicators[index]) {
           indicators[index].classList.add('active');
       }
   }
   
   function nextSlide() {
       currentSlide = (currentSlide + 1) % propertySlides.length;
       showSlide(currentSlide);
   }
   
   // Auto-advance carousel every 4 seconds
   if (propertySlides.length > 1) {
       setInterval(nextSlide, 4000);
       
       // Click handlers for indicators
       indicators.forEach((indicator, index) => {
           indicator.addEventListener('click', function() {
               currentSlide = index;
               showSlide(currentSlide);
           });
       });
   }
   
   // Smooth scrolling for navigation links
   const navLinks = document.querySelectorAll('a[href^="#"]');
   navLinks.forEach(link => {
       link.addEventListener('click', function(e) {
           e.preventDefault();
           const target = document.querySelector(this.getAttribute('href'));
           if (target) {
               const headerHeight = document.querySelector('.header').offsetHeight;
               const targetPosition = target.offsetTop - headerHeight - 20;
               
               window.scrollTo({
                   top: targetPosition,
                   behavior: 'smooth'
               });
           }
       });
   });
   
   // Header background on scroll
   const header = document.querySelector('.header');
   window.addEventListener('scroll', function() {
       if (window.scrollY > 50) {
           header.style.background = 'rgba(255, 255, 255, 0.98)';
           header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
       } else {
           header.style.background = 'rgba(255, 255, 255, 0.95)';
           header.style.boxShadow = 'none';
       }
   });
   
   // Animate progress bars when they come into view
   const observerOptions = {
       threshold: 0.3,
       rootMargin: '0px 0px -50px 0px'
   };
   
   const observer = new IntersectionObserver(function(entries) {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               if (entry.target.classList.contains('progress-fill')) {
                   const width = entry.target.style.width;
                   entry.target.style.width = '0%';
                   setTimeout(() => {
                       entry.target.style.width = width;
                   }, 100);
               }
               
               // Animate numbers
               if (entry.target.classList.contains('stat-number')) {
                   animateNumber(entry.target);
               }
               
               if (entry.target.classList.contains('metric-value')) {
                   animateNumber(entry.target);
               }
           }
       });
   }, observerOptions);
   
   // Observe elements for animation
   document.querySelectorAll('.progress-fill').forEach(el => observer.observe(el));
   document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
   document.querySelectorAll('.metric-value').forEach(el => observer.observe(el));
   
   // Number animation function
   function animateNumber(element) {
       const text = element.textContent;
       const isPercentage = text.includes('%');
       const isRupiah = text.includes('Rp');
       const isKilo = text.includes('K+');
       const isMillion = text.includes('M+');
       
       let targetNumber = parseFloat(text.replace(/[^\d.]/g, ''));
       let currentNumber = 0;
       const increment = targetNumber > 100 ? targetNumber / 30 : targetNumber / 20;
       const duration = 1000; // 1 second
       const stepTime = duration / (targetNumber / increment);
       
       const timer = setInterval(() => {
           currentNumber += increment;
           if (currentNumber >= targetNumber) {
               currentNumber = targetNumber;
               clearInterval(timer);
           }
           
           let displayNumber = Math.floor(currentNumber);
           let displayText = displayNumber.toString();
           
           if (isRupiah && isMillion) {
               displayText = 'Rp ' + displayNumber + 'M+';
           } else if (isRupiah) {
               displayText = 'Rp ' + displayNumber.toLocaleString('id-ID');
           } else if (isKilo) {
               displayText = displayNumber + 'K+';
           } else if (isPercentage) {
               displayText = displayNumber + '%';
           }
           
           element.textContent = displayText;
       }, stepTime);
   }
   
   // Button click handlers (placeholder functionality)
   const buttons = document.querySelectorAll('.btn');
   buttons.forEach(button => {
       button.addEventListener('click', function(e) {
           const buttonText = this.textContent.trim();
           
           // Add click animation
           this.style.transform = 'scale(0.95)';
           setTimeout(() => {
               this.style.transform = '';
           }, 150);
           
           // Handle different button actions
           if (buttonText.includes('Mulai Investasi') || buttonText.includes('Daftar Sekarang')) {
               e.preventDefault();
               showNotification('Fitur registrasi akan segera tersedia!', 'info');
           } else if (buttonText.includes('Investasi Sekarang')) {
               e.preventDefault();
               showNotification('Silakan daftar terlebih dahulu untuk mulai investasi', 'info');
           } else if (buttonText.includes('Lihat Demo')) {
               e.preventDefault();
               showNotification('Demo interaktif sedang dalam pengembangan', 'info');
           } else if (buttonText.includes('Hubungi Kami')) {
               e.preventDefault();
               showNotification('Email: support@propertytokens.com | WhatsApp: +62 21 1234 5678', 'success');
           }
       });
   });
   
   // Notification system
   function showNotification(message, type = 'info') {
       // Remove existing notifications
       const existingNotification = document.querySelector('.notification');
       if (existingNotification) {
           existingNotification.remove();
       }
       
       const notification = document.createElement('div');
       notification.className = `notification notification-${type}`;
       notification.innerHTML = `
           <div class="notification-content">
               <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
               <span>${message}</span>
               <button class="notification-close">
                   <i class="fas fa-times"></i>
               </button>
           </div>
       `;
       
       // Add styles
       notification.style.cssText = `
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
       
       notification.querySelector('.notification-content').style.cssText = `
           display: flex;
           align-items: center;
           gap: 12px;
       `;
       
       notification.querySelector('.notification-close').style.cssText = `
           background: none;
           border: none;
           color: white;
           cursor: pointer;
           padding: 4px;
           margin-left: auto;
       `;
       
       document.body.appendChild(notification);
       
       // Animate in
       setTimeout(() => {
           notification.style.transform = 'translateX(0)';
       }, 100);
       
       // Close button handler
       notification.querySelector('.notification-close').addEventListener('click', function() {
           notification.style.transform = 'translateX(100%)';
           setTimeout(() => {
               notification.remove();
           }, 300);
       });
       
       // Auto close after 5 seconds
       setTimeout(() => {
           if (document.body.contains(notification)) {
               notification.style.transform = 'translateX(100%)';
               setTimeout(() => {
                   notification.remove();
               }, 300);
           }
       }, 5000);
   }
   
   // Property card hover effects
   const propertyCards = document.querySelectorAll('.property-card');
   propertyCards.forEach(card => {
       card.addEventListener('mouseenter', function() {
           this.style.transform = 'translateY(-8px)';
       });
       
       card.addEventListener('mouseleave', function() {
           this.style.transform = 'translateY(-4px)';
       });
   });
   
   // Feature card hover effects
   const featureCards = document.querySelectorAll('.feature-card');
   featureCards.forEach(card => {
       card.addEventListener('mouseenter', function() {
           this.style.transform = 'translateY(-8px)';
       });
       
       card.addEventListener('mouseleave', function() {
           this.style.transform = 'translateY(-4px)';
       });
   });
   
   // Loading simulation for property images
   const propertyImagePlaceholders = document.querySelectorAll('.property-img-placeholder');
   propertyImagePlaceholders.forEach((placeholder, index) => {
       // Simulate different loading times
       setTimeout(() => {
           placeholder.style.animation = 'none';
           placeholder.style.background = `linear-gradient(135deg, var(--primary-light), var(--secondary-color))`;
           placeholder.style.opacity = '0.8';
       }, (index + 1) * 500);
   });
   
   console.log('PropertyToken GapuraPrima prototype loaded successfully! 🚀');
});
