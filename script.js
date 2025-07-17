let currentLang = 'en';
let isDarkMode = false;

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

function toggleDropdown() {
    const dropdown = document.getElementById('downloadDropdown');
    dropdown.classList.toggle('show');
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.download-dropdown')) {
            dropdown.classList.remove('show');
        }
    });
}

// Method 1: Using html2pdf.js (Best for GitHub Pages)
async function downloadPDF() {
    const loading = document.getElementById('loadingIndicator');
    loading.classList.add('show');
    
    try {
        // Hide controls during PDF generation
        const controls = document.querySelector('.controls');
        const originalDisplay = controls.style.display;
        controls.style.display = 'none';
        
        // Configure PDF options
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `CV_Le_Quang_Dai_Di_${currentLang.toUpperCase()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                allowTaint: true
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page:not(:first-child)'
            }
        };

        // Generate PDF
        const element = document.querySelector('.cv-container');
        await html2pdf().set(opt).from(element).save();
        
        // Restore controls
        controls.style.display = originalDisplay;
        
    } catch (error) {
        console.error('PDF generation failed:', error);
        alert(currentLang === 'en' ? 'Failed to generate PDF. Please try again.' : 'Không thể tạo PDF. Vui lòng thử lại.');
    } finally {
        loading.classList.remove('show');
        document.getElementById('downloadDropdown').classList.remove('show');
    }
}

// Method 2: Browser Print to PDF
function printCV() {
    // Hide controls during print
    const controls = document.querySelector('.controls');
    const originalDisplay = controls.style.display;
    controls.style.display = 'none';
    
    // Add print styles
    const printStyles = `
        <style media="print">
            @page {
                size: A4;
                margin: 0.5in;
            }
            body { 
                background: white !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            .cv-container {
                box-shadow: none !important;
                margin: 0 !important;
            }
            .page {
                page-break-after: always;
                break-after: page;
            }
            .page:last-child {
                page-break-after: avoid;
                break-after: avoid;
            }
            .header::before {
                animation: none !important;
            }
        </style>
    `;
    
    const head = document.head;
    const printStyleSheet = document.createElement('div');
    printStyleSheet.innerHTML = printStyles;
    head.appendChild(printStyleSheet);
    
    // Print
    window.print();
    
    // Restore controls after print dialog
    setTimeout(() => {
        controls.style.display = originalDisplay;
        head.removeChild(printStyleSheet);
    }, 100);
    
    document.getElementById('downloadDropdown').classList.remove('show');
}

// Method 3: Save as HTML file
function downloadHTML() {
    const loading = document.getElementById('loadingIndicator');
    loading.classList.add('show');
    
    try {
        // Clone the document
        const htmlContent = document.documentElement.outerHTML;
        
        // Create downloadable HTML with embedded styles
        const fullHTML = `<!DOCTYPE html>
        <html lang="${currentLang}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CV - Lê Quang Đại Dĩ</title>
            <style>
                .controls { display: none !important; }
                .loading { display: none !important; }
                .pdf-preview { display: none !important; }
            </style>
        </head>
        ${document.body.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')}
        </html>`;
        
        // Create download
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_Le_Quang_Dai_Di_${currentLang.toUpperCase()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('HTML download failed:', error);
        alert(currentLang === 'en' ? 'Failed to download HTML. Please try again.' : 'Không thể tải HTML. Vui lòng thử lại.');
    } finally {
        loading.classList.remove('show');
        document.getElementById('downloadDropdown').classList.remove('show');
    }
}

// Method 4: Share CV link
async function shareCV() {
    const currentURL = window.location.href;
    const shareData = {
        title: 'CV - Lê Quang Đại Dĩ',
        text: currentLang === 'en' ? 
            'Security Engineer | Former SOC Analyst | Backend Developer' :
            'Kỹ sư Bảo mật | Cựu Chuyên viên SOC | Lập trình viên Backend',
        url: currentURL
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(currentURL);
            alert(currentLang === 'en' ? 
                'CV link copied to clipboard!' : 
                'Đã sao chép link CV vào clipboard!');
        }
    } catch (error) {
        // Manual copy fallback
        const textArea = document.createElement('textarea');
        textArea.value = currentURL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(currentLang === 'en' ? 
            'CV link copied to clipboard!' : 
            'Đã sao chép link CV vào clipboard!');
    }
    
    document.getElementById('downloadDropdown').classList.remove('show');
}

function closePDFPreview() {
    document.getElementById('pdfPreview').classList.remove('show');
}

// Add smooth scrolling and print functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add print button functionality
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            printCV();
        }
        
        // Download shortcut
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            downloadPDF();
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

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.download-dropdown')) {
            document.getElementById('downloadDropdown').classList.remove('show');
        }
    });
});

// Alternative PDF generation for better compatibility
function generatePDFAlternative() {
    // Method using browser's built-in PDF generation
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>CV - Lê Quang Đại Dĩ</title>
            <style>
                ${Array.from(document.styleSheets).map(styleSheet => {
                    try {
                        return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\n');
                    } catch (e) {
                        return '';
                    }
                }).join('\n')}
                
                @media print {
                    @page { size: A4; margin: 0.5in; }
                    .controls, .loading, .pdf-preview { display: none !important; }
                    body { background: white !important; }
                    .cv-container { box-shadow: none !important; margin: 0 !important; }
                    .page { page-break-after: always; }
                    .page:last-child { page-break-after: avoid; }
                }
            </style>
        </head>
        <body data-lang="${currentLang}">
            ${document.querySelector('.cv-container').outerHTML}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 1000);
                }
            </script>
        </body>
        </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
}

// Additional utility functions for better UX
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#e53e3e' : '#667eea'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
`;
document.head.appendChild(style);