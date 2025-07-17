// Download CV as PDF
// Requires: jsPDF library
// Usage: Include this script and call downloadPDF(language)

// Condensed CV data for PDF generation
const pdfData = {
    personal: {
        name: "Lê Quang Đại Dĩ",
        title: {
            en: "SECURITY ENGINEER | BACKEND DEVELOPER",
            vi: "KỸ SƯ BẢO MẬT | LẬP TRÌNH VIÊN BACKEND"
        },
        contact: {
            phone: "0929860265",
            email: "dile8861@gmail.com"
        }
    },
    
    about: {
        en: "Security Engineer with strong expertise in backend development and system security monitoring. Experienced in SIEM systems, vulnerability assessment, and AWS cloud infrastructure. Skilled in Python, Django, and security frameworks with a focus on DevSecOps practices.",
        vi: "Kỹ sư Bảo mật với chuyên môn mạnh về phát triển backend và giám sát bảo mật hệ thống. Có kinh nghiệm về hệ thống SIEM, đánh giá lỗ hổng và hạ tầng AWS cloud. Thành thạo Python, Django và các framework bảo mật với trọng tâm về DevSecOps."
    },
    
    skills: {
        en: "Programming: Python, TypeScript, Django, Flask, Angular • Cloud & DevOps: AWS, GitHub Actions, CI/CD • Security: OpenVAS, Splunk, Wazuh, MITRE ATT&CK • Database: MySQL, MongoDB, DynamoDB",
        vi: "Lập trình: Python, TypeScript, Django, Flask, Angular • Cloud & DevOps: AWS, GitHub Actions, CI/CD • Bảo mật: OpenVAS, Splunk, Wazuh, MITRE ATT&CK • Cơ sở dữ liệu: MySQL, MongoDB, DynamoDB"
    },
    
    education: {
        en: "Gia Dinh University - GPA: 3.5/4.0",
        vi: "Đại học Gia Định - GPA: 3.5/4.0"
    },
    
    experience: [
        {
            company: "BaseBS Corporation",
            position: "Backend Developer",
            duration: {
                en: "05/2025 – Present",
                vi: "05/2025 – Nay"
            },
            description: {
                en: "• Optimized core features for uCRM system across multiple agents\n• Implemented security measures: API design, access control, data protection\n• Technologies: Python, Django, Redis, Celery, MongoDB",
                vi: "• Tối ưu các tính năng cốt lõi cho hệ thống uCRM trên nhiều agent\n• Triển khai các biện pháp bảo mật: thiết kế API, kiểm soát truy cập, bảo vệ dữ liệu\n• Công nghệ: Python, Django, Redis, Celery, MongoDB"
            }
        },
        {
            company: "FECredit (VPBank SMBC)",
            position: "Backend Engineer",
            duration: {
                en: "04/2024 – 05/2025",
                vi: "04/2024 – 05/2025"
            },
            description: {
                en: "• Developed Portal system for internal support and production business processing\n• Built Voolo app (Buy Now - Pay Later) and FEOL 2.0 loan application\n• Implemented comprehensive security: DDoS protection, session management, API security\n• Reduced QA/QC test data creation time by 40%\n• Technologies: AWS, Python, API Gateway, Lambda, DynamoDB",
                vi: "• Phát triển hệ thống Portal cho hỗ trợ nội bộ và xử lý nghiệp vụ sản xuất\n• Xây dựng ứng dụng Voolo (Mua ngay - Trả sau) và FEOL 2.0 vay vốn\n• Triển khai bảo mật toàn diện: chống DDoS, quản lý session, bảo mật API\n• Giảm 40% thời gian tạo data test cho QA/QC\n• Công nghệ: AWS, Python, API Gateway, Lambda, DynamoDB"
            }
        },
        {
            company: "HTC Global Solutions",
            position: "SOC Analyst Tier 2 Intern",
            duration: {
                en: "04/2023 – 01/2024",
                vi: "04/2023 – 01/2024"
            },
            description: {
                en: "• Built security monitoring system for Ca Mau IT Department\n• Implemented vulnerability scanning using OpenVAS and Splunk SIEM\n• Maintained real-time system stability and security monitoring\n• Technologies: Splunk, OpenVAS, Security Analytics",
                vi: "• Xây dựng hệ thống giám sát bảo mật cho Sở TT&TT Cà Mau\n• Triển khai quét lỗ hổng bằng OpenVAS và SIEM Splunk\n• Duy trì tính ổn định và giám sát bảo mật real-time\n• Công nghệ: Splunk, OpenVAS, Security Analytics"
            }
        }
    ]
};

// Create PDF using jsPDF
function downloadPDF(language = 'en') {
    // Check if jsPDF is available
    if (typeof window.jsPDF === 'undefined') {
        console.error('jsPDF library not found. Please include jsPDF library.');
        alert('PDF generation library not loaded. Please refresh the page and try again.');
        return;
    }

    const { jsPDF } = window;
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Colors
    const primaryColor = [102, 126, 234]; // #667eea
    const secondaryColor = [74, 85, 104]; // #4a5568
    const lightGray = [160, 160, 160];
    
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper function to add text with auto-wrap
    function addText(text, x, y, maxWidth, fontSize = 10, style = 'normal') {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', style);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * (fontSize * 0.4));
    }
    
    // Helper function to add section separator
    function addSectionSeparator(y) {
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        return y + 8;
    }
    
    // Header with name and title
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(pdfData.personal.name, pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(pdfData.personal.title[language], pageWidth / 2, 30, { align: 'center' });
    
    // Contact info
    doc.setFontSize(11);
    const contactText = `📱 ${pdfData.personal.contact.phone} | ✉️ ${pdfData.personal.contact.email}`;
    doc.text(contactText, pageWidth / 2, 38, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    yPosition = 55;
    
    // About section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'ABOUT' : 'GIỚI THIỆU', margin, yPosition);
    yPosition += 8;
    
    doc.setTextColor(...secondaryColor);
    yPosition = addText(pdfData.about[language], margin, yPosition, contentWidth, 10);
    yPosition = addSectionSeparator(yPosition + 5);
    
    // Skills section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'TECHNICAL SKILLS' : 'KỸ NĂNG CHUYÊN MÔN', margin, yPosition);
    yPosition += 8;
    
    doc.setTextColor(...secondaryColor);
    yPosition = addText(pdfData.skills[language], margin, yPosition, contentWidth, 10);
    yPosition = addSectionSeparator(yPosition + 5);
    
    // Education section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'EDUCATION' : 'HỌC VẤN', margin, yPosition);
    yPosition += 8;
    
    doc.setTextColor(...secondaryColor);
    yPosition = addText(pdfData.education[language], margin, yPosition, contentWidth, 10);
    yPosition = addSectionSeparator(yPosition + 5);
    
    // Experience section
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(language === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'KINH NGHIỆM NGHỀ NGHIỆP', margin, yPosition);
    yPosition += 8;
    
    // Add experiences
    pdfData.experience.forEach((exp, index) => {
        // Check if we need more space
        if (yPosition > 250) {
            return; // Skip if not enough space
        }
        
        // Company name and position
        doc.setTextColor(...secondaryColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.company, margin, yPosition);
        
        // Duration (right aligned)
        doc.setFont('helvetica', 'normal');
        doc.text(exp.duration[language], pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 6;
        
        // Position
        doc.setFontSize(11);
        doc.setFont('helvetica', 'italic');
        doc.text(exp.position, margin, yPosition);
        yPosition += 6;
        
        // Description
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        yPosition = addText(exp.description[language], margin, yPosition, contentWidth, 9);
        yPosition += 8;
    });
    
    // Footer
    doc.setTextColor(...lightGray);
    doc.setFontSize(8);
    doc.text(
        language === 'en' ? 
        'Generated automatically from dynamic CV system' : 
        'Được tạo tự động từ hệ thống CV động', 
        pageWidth / 2, 
        280, 
        { align: 'center' }
    );
    
    // Save the PDF
    const fileName = language === 'en' ? 
        'Le_Quang_Dai_Di_CV_English.pdf' : 
        'Le_Quang_Dai_Di_CV_Vietnamese.pdf';
    
    doc.save(fileName);
    
    // Close dropdown after download
    const dropdown = document.getElementById('main-dropdown');
    const dropdownContainer = document.querySelector('.download-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    if (dropdownContainer) dropdownContainer.classList.remove('active');
    
    // Show success notification
    showNotification(
        language === 'en' ? 
        '✓ CV PDF downloaded successfully!' : 
        '✓ Tải PDF CV thành công!'
    );
}

// Alternative: Generate PDF using html2pdf (if available)
function downloadPDFFromHTML(language = 'en') {
    if (typeof window.html2pdf === 'undefined') {
        console.error('html2pdf library not found. Falling back to jsPDF.');
        downloadPDF(language);
        return;
    }
    
    // Create a temporary container for PDF content
    const container = document.createElement('div');
    container.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        font-family: 'Arial', sans-serif;
        font-size: 12px;
        line-height: 1.4;
        color: #333;
        background: white;
        position: absolute;
        left: -9999px;
        top: -9999px;
    `;
    
    // Set language
    container.setAttribute('data-lang', language);
    
    // Add CSS for language switching
    const style = document.createElement('style');
    style.textContent = `
        .lang-en, .lang-vi { display: block; }
        [data-lang="vi"] .lang-en { display: none; }
        [data-lang="en"] .lang-vi { display: none; }
        .pdf-header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .pdf-section { margin-bottom: 15px; }
        .pdf-section-title { 
            font-size: 16px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 2px;
        }
        .pdf-company { 
            font-weight: bold;
            color: #4a5568;
            margin-bottom: 4px;
        }
        .pdf-duration { 
            float: right;
            color: #666;
        }
        .pdf-position { 
            font-style: italic;
            margin-bottom: 6px;
        }
        .pdf-description { 
            white-space: pre-line;
            margin-bottom: 12px;
        }
    `;
    document.head.appendChild(style);
    
    container.innerHTML = `
        <div class="pdf-header">
            <h1 style="margin: 0; font-size: 28px;">${pdfData.personal.name}</h1>
            <p style="margin: 8px 0; font-size: 16px;">
                <span class="lang-en">${pdfData.personal.title.en}</span>
                <span class="lang-vi">${pdfData.personal.title.vi}</span>
            </p>
            <p style="margin: 8px 0;">📱 ${pdfData.personal.contact.phone} | ✉️ ${pdfData.personal.contact.email}</p>
        </div>
        
        <div class="pdf-section">
            <div class="pdf-section-title">
                <span class="lang-en">ABOUT</span>
                <span class="lang-vi">GIỚI THIỆU</span>
            </div>
            <p>
                <span class="lang-en">${pdfData.about.en}</span>
                <span class="lang-vi">${pdfData.about.vi}</span>
            </p>
        </div>
        
        <div class="pdf-section">
            <div class="pdf-section-title">
                <span class="lang-en">TECHNICAL SKILLS</span>
                <span class="lang-vi">KỸ NĂNG CHUYÊN MÔN</span>
            </div>
            <p>
                <span class="lang-en">${pdfData.skills.en}</span>
                <span class="lang-vi">${pdfData.skills.vi}</span>
            </p>
        </div>
        
        <div class="pdf-section">
            <div class="pdf-section-title">
                <span class="lang-en">EDUCATION</span>
                <span class="lang-vi">HỌC VẤN</span>
            </div>
            <p>
                <span class="lang-en">${pdfData.education.en}</span>
                <span class="lang-vi">${pdfData.education.vi}</span>
            </p>
        </div>
        
        <div class="pdf-section">
            <div class="pdf-section-title">
                <span class="lang-en">PROFESSIONAL EXPERIENCE</span>
                <span class="lang-vi">KINH NGHIỆM NGHỀ NGHIỆP</span>
            </div>
            ${pdfData.experience.map(exp => `
                <div style="margin-bottom: 15px;">
                    <div class="pdf-company">
                        ${exp.company}
                        <span class="pdf-duration">
                            <span class="lang-en">${exp.duration.en}</span>
                            <span class="lang-vi">${exp.duration.vi}</span>
                        </span>
                    </div>
                    <div class="pdf-position">${exp.position}</div>
                    <div class="pdf-description">
                        <span class="lang-en">${exp.description.en}</span>
                        <span class="lang-vi">${exp.description.vi}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(container);
    
    // Generate PDF
    const options = {
        margin: 0,
        filename: language === 'en' ? 
            'Le_Quang_Dai_Di_CV_English.pdf' : 
            'Le_Quang_Dai_Di_CV_Vietnamese.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(options).from(container).save().then(() => {
        // Clean up
        document.body.removeChild(container);
        document.head.removeChild(style);
        
        // Show success notification
        showNotification(
            language === 'en' ? 
            '✓ CV PDF downloaded successfully!' : 
            '✓ Tải PDF CV thành công!'
        );
    });
}

// Show notification function (reuse from main script)
function showNotification(message) {
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
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for use in main script
window.downloadPDF = downloadPDF;
window.downloadPDFFromHTML = downloadPDFFromHTML;