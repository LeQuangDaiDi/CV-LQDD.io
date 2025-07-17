// Download CV as PDF - GitHub Pages Compatible
// Fallback solution without external PDF libraries

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

// Create PDF using window.print() - GitHub Pages compatible
function downloadPDF(language = 'en') {
    // Create a new window for PDF content
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
        alert('Please allow popups for this site to download PDF');
        return;
    }
    
    // Generate HTML content for PDF
    const htmlContent = generatePDFHTML(language);
    
    // Write content to new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = function() {
        setTimeout(() => {
            printWindow.print();
            // Close window after printing
            printWindow.onafterprint = function() {
                printWindow.close();
            };
        }, 500);
    };
    
    // Close dropdown after opening print dialog
    const dropdown = document.getElementById('main-dropdown');
    const dropdownContainer = document.querySelector('.download-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    if (dropdownContainer) dropdownContainer.classList.remove('active');
    
    // Show success notification
    showNotification(
        language === 'en' ? 
        '✓ Print dialog opened - Save as PDF' : 
        '✓ Đã mở hộp thoại in - Lưu thành PDF'
    );
}

// Generate HTML content for PDF
function generatePDFHTML(language) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${pdfData.personal.name} - CV</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
            background: white;
            width: 210mm;
            min-height: 297mm;
            padding: 15mm;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .title {
            font-size: 14px;
            margin-bottom: 10px;
            opacity: 0.9;
        }
        
        .contact {
            font-size: 12px;
        }
        
        .section {
            margin-bottom: 18px;
        }
        
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
            padding-bottom: 4px;
            border-bottom: 2px solid #667eea;
        }
        
        .about-content {
            color: #4a5568;
            line-height: 1.5;
            text-align: justify;
        }
        
        .skills-content {
            color: #4a5568;
            line-height: 1.5;
        }
        
        .education-content {
            color: #4a5568;
            font-weight: 500;
        }
        
        .experience-item {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .experience-item:last-child {
            border-bottom: none;
        }
        
        .company-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }
        
        .company-name {
            font-weight: bold;
            color: #2d3748;
            font-size: 12px;
        }
        
        .duration {
            color: #666;
            font-size: 10px;
        }
        
        .position {
            font-style: italic;
            color: #667eea;
            margin-bottom: 8px;
            font-size: 11px;
        }
        
        .description {
            color: #4a5568;
            white-space: pre-line;
            font-size: 10px;
            line-height: 1.4;
        }
        
        .footer {
            position: fixed;
            bottom: 10mm;
            left: 50%;
            transform: translateX(-50%);
            font-size: 8px;
            color: #999;
        }
        
        /* Print styles */
        @media print {
            body {
                width: auto;
                height: auto;
                padding: 15mm;
            }
            
            .header {
                break-inside: avoid;
            }
            
            .experience-item {
                break-inside: avoid;
            }
            
            .section {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${pdfData.personal.name}</div>
        <div class="title">${pdfData.personal.title[language]}</div>
        <div class="contact">📱 ${pdfData.personal.contact.phone} | ✉️ ${pdfData.personal.contact.email}</div>
    </div>
    
    <div class="section">
        <div class="section-title">${language === 'en' ? 'ABOUT' : 'GIỚI THIỆU'}</div>
        <div class="about-content">${pdfData.about[language]}</div>
    </div>
    
    <div class="section">
        <div class="section-title">${language === 'en' ? 'TECHNICAL SKILLS' : 'KỸ NĂNG CHUYÊN MÔN'}</div>
        <div class="skills-content">${pdfData.skills[language]}</div>
    </div>
    
    <div class="section">
        <div class="section-title">${language === 'en' ? 'EDUCATION' : 'HỌC VẤN'}</div>
        <div class="education-content">${pdfData.education[language]}</div>
    </div>
    
    <div class="section">
        <div class="section-title">${language === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'KINH NGHIỆM NGHỀ NGHIỆP'}</div>
        ${pdfData.experience.map(exp => `
            <div class="experience-item">
                <div class="company-header">
                    <div class="company-name">${exp.company}</div>
                    <div class="duration">${exp.duration[language]}</div>
                </div>
                <div class="position">${exp.position}</div>
                <div class="description">${exp.description[language]}</div>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        ${language === 'en' ? 
            'Generated automatically from dynamic CV system' : 
            'Được tạo tự động từ hệ thống CV động'
        }
    </div>
</body>
</html>
    `;
}

// Alternative method using data URL (more compatible)
function downloadPDFAlternative(language = 'en') {
    const content = generatePDFContent(language);
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = language === 'en' ? 
        'Le_Quang_Dai_Di_CV_English.html' : 
        'Le_Quang_Dai_Di_CV_Vietnamese.html';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Close dropdown
    const dropdown = document.getElementById('main-dropdown');
    const dropdownContainer = document.querySelector('.download-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    if (dropdownContainer) dropdownContainer.classList.remove('active');
    
    showNotification(
        language === 'en' ? 
        '✓ CV HTML downloaded - Open and print as PDF' : 
        '✓ Đã tải CV HTML - Mở và in thành PDF'
    );
}

// Generate complete HTML for download
function generatePDFContent(language) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${pdfData.personal.name} - CV</title>
    <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: Arial, sans-serif; font-size: 11px; line-height: 1.4; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
        .name { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .title { font-size: 14px; margin-bottom: 10px; }
        .contact { font-size: 12px; }
        .section { margin-bottom: 18px; }
        .section-title { font-size: 14px; font-weight: bold; color: #667eea; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 2px solid #667eea; }
        .experience-item { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; }
        .company-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .company-name { font-weight: bold; color: #2d3748; }
        .duration { color: #666; font-size: 10px; }
        .position { font-style: italic; color: #667eea; margin-bottom: 8px; }
        .description { color: #4a5568; white-space: pre-line; font-size: 10px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${pdfData.personal.name}</div>
        <div class="title">${pdfData.personal.title[language]}</div>
        <div class="contact">📱 ${pdfData.personal.contact.phone} | ✉️ ${pdfData.personal.contact.email}</div>
    </div>
    <div class="section">
        <div class="section-title">${language === 'en' ? 'ABOUT' : 'GIỚI THIỆU'}</div>
        <div>${pdfData.about[language]}</div>
    </div>
    <div class="section">
        <div class="section-title">${language === 'en' ? 'TECHNICAL SKILLS' : 'KỸ NĂNG CHUYÊN MÔN'}</div>
        <div>${pdfData.skills[language]}</div>
    </div>
    <div class="section">
        <div class="section-title">${language === 'en' ? 'EDUCATION' : 'HỌC VẤN'}</div>
        <div>${pdfData.education[language]}</div>
    </div>
    <div class="section">
        <div class="section-title">${language === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'KINH NGHIỆM NGHỀ NGHIỆP'}</div>
        ${pdfData.experience.map(exp => `
            <div class="experience-item">
                <div class="company-header">
                    <div class="company-name">${exp.company}</div>
                    <div class="duration">${exp.duration[language]}</div>
                </div>
                <div class="position">${exp.position}</div>
                <div class="description">${exp.description[language]}</div>
            </div>
        `).join('')}
    </div>
</body>
</html>`;
}

// Show notification function
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
window.downloadPDFAlternative = downloadPDFAlternative;
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