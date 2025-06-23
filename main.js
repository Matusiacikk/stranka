document.addEventListener('DOMContentLoaded', function() {
    // Aktuálny rok v pätičke
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarCollapse.classList.toggle('active');
            this.setAttribute('aria-expanded', this.classList.contains('active'));
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
                
                // Zatvorenie mobile menu po kliknutí
                if (navbarCollapse.classList.contains('active')) {
                    navbarToggler.classList.remove('active');
                    navbarCollapse.classList.remove('active');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Lazy loading obrázkov
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img.lazy');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Animácie pri scrollovaní
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in:not(.animated)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Spustiť pri načítaní pre viditeľné elementy
});