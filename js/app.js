// Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Nav active state
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards and metrics
    document.querySelectorAll('.product-card, .metric').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });

    // Number animation for metrics
    function animateNumber(element, duration = 2000) {
        const target = parseFloat(element.dataset.value);
        const suffix = element.dataset.suffix || '';
        const hasPlus = element.textContent.includes('+');
        const originalText = element.textContent;
        
        // Determine decimal places from original or based on value
        let decimals = 0;
        if (originalText.includes('.')) {
            decimals = originalText.split('.')[1].replace(/[^\d]/g, '').length;
        } else if (target.toString().includes('.')) {
            decimals = target.toString().split('.')[1].length;
        }
        
        let current = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const formatted = decimals > 0 ? current.toFixed(decimals) : current.toFixed(0);
            element.textContent = (hasPlus && target > 0) ? `+${formatted}${suffix}` : `${formatted}${suffix}`;
        }, 16);
    }

    // Intersection Observer for metrics animation
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe all metric values
    document.querySelectorAll('.metric-value[data-value]').forEach(metric => {
        metricsObserver.observe(metric);
    });
});

