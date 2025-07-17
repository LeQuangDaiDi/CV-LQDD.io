let currentLang = 'en';
let isDarkMode = false;

// CV Download URLs
const cvUrls = {
    vi: 'https://drive.google.com/file/d/1QncKhEIxA1t2N6IhATLouwNid8QBRkAX/view?usp=sharing',
    en: 'https://drive.google.com/file/d/1bct2aEJGpdQ2CokgOcsBUUfqPvRddEXK/view'
};

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    document.body.setAttribute('data-lang', currentLang);
    
    // Update button text
    const button = document.querySelector('.language-toggle');
    if (currentLang === 'en') {
        button.innerHTML = '🇻🇳 Tiếng Việt';
    } else {
        button.innerHTML = '🇺🇸 English';
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
    
    // Update button icon
    const button = document.querySelector('.theme-toggle');
    button.innerHTML = isDarkMode ? '☀️' : '🌙';
}

function downloadCV() {
    // Open the appropriate CV link based on current language
    const url = cvUrls[currentLang];
    window.open(url, '_blank');
}

// Add smooth scrolling and print functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add print button functionality
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });

    // Add smooth animations on scroll (for web view)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section, .experience-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects for interactive elements
    const buttons = document.querySelectorAll('.download-btn, .language-toggle, .theme-toggle');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click feedback for buttons
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case 'l':
                case 'L':
                    e.preventDefault();
                    toggleLanguage();
                    break;
                case 't':
                case 'T':
                    e.preventDefault();
                    toggleTheme();
                    break;
                case 'd':
                case 'D':
                    e.preventDefault();
                    downloadCV();
                    break;
            }
        }
    });

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add tooltips for keyboard shortcuts
    const downloadBtn = document.querySelector('.download-btn');
    const langBtn = document.querySelector('.language-toggle');
    const themeBtn = document.querySelector('.theme-toggle');

    downloadBtn.title = 'Download CV (Alt+D)';
    langBtn.title = 'Toggle Language (Alt+L)';
    themeBtn.title = 'Toggle Theme (Alt+T)';

    // Add smooth scroll for internal links (if any)
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

    // Add print styles optimization
    window.addEventListener('beforeprint', function() {
        // Temporarily show all language content for printing
        document.body.classList.add('printing');
        
        // Hide controls during print
        document.querySelector('.controls').style.display = 'none';
    });

    window.addEventListener('afterprint', function() {
        // Restore normal view after printing
        document.body.classList.remove('printing');
        
        // Show controls again
        document.querySelector('.controls').style.display = 'flex';
    });

    // Add responsive menu for mobile
    function createMobileMenu() {
        if (window.innerWidth <= 768) {
            const controls = document.querySelector('.controls');
            controls.classList.add('mobile-controls');
        } else {
            const controls = document.querySelector('.controls');
            controls.classList.remove('mobile-controls');
        }
    }

    // Initial check and event listener for responsive design
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus indicators for better accessibility
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add performance optimization for animations
    let ticking = false;
    
    function updateAnimations() {
        // Throttle animation updates for better performance
        if (!ticking) {
            requestAnimationFrame(function() {
                // Update any scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateAnimations);

    // Add error handling for download functionality
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
        // Fallback for download if there's an issue
        if (e.error && e.error.message.includes('download')) {
            alert('Download link temporarily unavailable. Please try again later.');
        }
    });

    // Add success notification for downloads
    const originalDownloadCV = window.downloadCV;
    window.downloadCV = function() {
        try {
            originalDownloadCV();
            
            // Show success notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #38b2ac;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                z-index: 10000;
                font-size: 14px;
                box-shadow: 0 4px 15px rgba(56, 178, 172, 0.3);
                transition: all 0.3s ease;
            `;
            
            if (currentLang === 'en') {
                notification.textContent = '✓ Opening CV download link...';
            } else {
                notification.textContent = '✓ Đang mở liên kết tải CV...';
            }
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(-50%) translateY(-20px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
            
        } catch (error) {
            console.error('Download error:', error);
            alert('Unable to open download link. Please try again.');
        }
    };

    // Add preload for better performance
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://drive.google.com';
    document.head.appendChild(link1);

    // Add service worker registration for offline capability (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(function(error) {
            console.log('ServiceWorker registration failed: ', error);
        });
    }
});