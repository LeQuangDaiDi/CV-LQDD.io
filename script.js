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

// Method 1: Using html2pdf.js with simplified version for PDF
async function downloadPDF() {
    const loading = document.getElementById('loadingIndicator');
    loading.classList.add('show');
    
    try {
        // Hide controls during PDF generation
        const controls = document.querySelector('.controls');
        const originalDisplay = controls.style.display;
        controls.style.display = 'none';
        
        // Create simplified version for PDF
        const simplifiedCV = createSimplifiedCV();
        
        // Configure PDF options
        const opt = {
            margin: [0.75, 0.75, 0.75, 0.75],
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
                before: '.pdf-page:not(:first-child)'
            }
        };

        // Generate PDF from simplified version
        await html2pdf().set(opt).from(simplifiedCV).save();
        
        // Clean up
        document.body.removeChild(simplifiedCV);
        
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

// Create simplified CV version for PDF export
function createSimplifiedCV() {
    const isVietnamese = currentLang === 'vi';
    
    const simplifiedHTML = `
        <div class="pdf-cv-container">
            <!-- Page 1 -->
            <div class="pdf-page">
                <div class="pdf-header">
                    <h1>Lê Quang Đại Dĩ</h1>
                    <h2>${isVietnamese ? 'KỸ SƯ BẢO MẬT | CỰU CHUYÊN VIÊN SOC | LẬP TRÌNH VIÊN BACKEND' : 'SECURITY ENGINEER | FORMER SOC ANALYST | BACKEND DEVELOPER'}</h2>
                    <div class="pdf-contact">
                        <span>📱 0929860265</span> | <span>✉️ dile8861@gmail.com</span>
                    </div>
                </div>

                <div class="pdf-section">
                    <h3>${isVietnamese ? 'GIỚI THIỆU' : 'ABOUT ME'}</h3>
                    <p>${isVietnamese ? 
                        'Kỹ sư Bảo mật với nền tảng kỹ thuật vững chắc trong phát triển phần mềm backend và giám sát bảo mật hệ thống. Có kinh nghiệm trong phân tích sự cố thực tế, xây dựng hệ thống giám sát dựa trên SIEM, triển khai công cụ đánh giá lỗ hổng và tích hợp framework MITRE ATT&CK. Thành thạo trong thiết kế API, xử lý dữ liệu quy mô lớn và triển khai hệ thống phân tán trên AWS. Mục tiêu nghề nghiệp là trở thành một DevSecOps hoặc Kỹ sư Bảo mật có khả năng bảo vệ hệ thống từ tầng ứng dụng xuống tầng hạ tầng.' :
                        'Security Engineer with a strong technical foundation in backend software development and system security monitoring. Experienced in real-world incident analysis, building SIEM-based monitoring systems, deploying vulnerability assessment tools, and integrating the MITRE ATT&CK framework. Proficient in designing APIs, handling large-scale data processing, and deploying distributed systems on AWS. Career objective is to become a DevSecOps or Security Engineer capable of securing systems from the application layer down to the infrastructure level.'
                    }</p>
                </div>

                <div class="pdf-section">
                    <h3>${isVietnamese ? 'KỸ NĂNG CHUYÊN MÔN' : 'TECHNICAL SKILLS'}</h3>
                    <div class="pdf-skills">
                        <div class="skill-row">
                            <strong>${isVietnamese ? 'Lập trình & Phát triển:' : 'Programming & Development:'}</strong>
                            Python, TypeScript, FastAPI, Django, Flask, Angular, MITRE ATT&CK®
                        </div>
                        <div class="skill-row">
                            <strong>${isVietnamese ? 'Đám mây & DevOps:' : 'Cloud & DevOps:'}</strong>
                            AWS (Lambda, API Gateway, CloudWatch), GitHub Actions (CI/CD), ${isVietnamese ? 'Tự động hóa triển khai AWS' : 'AWS deployment automation'}
                        </div>
                        <div class="skill-row">
                            <strong>${isVietnamese ? 'Công cụ Bảo mật & Giám sát:' : 'Security Tools & Monitoring:'}</strong>
                            OpenVAS, Splunk, Wazuh, Nmap
                        </div>
                        <div class="skill-row">
                            <strong>${isVietnamese ? 'Cơ sở dữ liệu:' : 'Databases:'}</strong>
                            SQL, MySQL, DynamoDB, DocumentDB, MongoDB
                        </div>
                        <div class="skill-row">
                            <strong>${isVietnamese ? 'Khác:' : 'Others:'}</strong>
                            Figma, Git
                        </div>
                    </div>
                </div>

                <div class="pdf-section">
                    <h3>${isVietnamese ? 'HỌC VẤN' : 'EDUCATION'}</h3>
                    <div class="education-row">
                        <strong>${isVietnamese ? 'Đại học Gia Định' : 'Gia Dinh University'}</strong>
                        <span class="gpa">GPA: 3.5/4.0</span>
                    </div>
                </div>

                <div class="pdf-section">
                    <h3>${isVietnamese ? 'KINH NGHIỆM LÀM VIỆC' : 'EXPERIENCE'}</h3>
                    
                    <div class="experience-block">
                        <div class="company-info">
                            <strong>BaseBS (BASE BUSINESS SOLUTIONS CORPORATION)</strong>
                            <span class="duration">${isVietnamese ? 'Tháng 5/2025 – Hiện tại' : 'May 2025 – Present'}</span>
                        </div>
                        <div class="project-info">
                            <strong>${isVietnamese ? 'Dự án: uCRM (Quản lý Yêu cầu Khách hàng Thống nhất)' : 'Project: uCRM (Unify Customer Request Manage)'}</strong>
                        </div>
                        <div class="tech-info">
                            <strong>${isVietnamese ? 'Công nghệ:' : 'Technologies:'}</strong> Python, Django, Redis, Celery, MongoDB
                        </div>
                        <ul class="responsibilities">
                            <li>${isVietnamese ? 
                                'Cung cấp hỗ trợ khắc phục các vấn đề chức năng và tối ưu hóa hiệu suất cho từng sản phẩm trên các agent khác nhau' :
                                'Provided support in troubleshooting functional issues and optimizing performance for each product across different agents'
                            }</li>
                            <li>${isVietnamese ? 
                                'Triển khai các biện pháp bảo mật: Kiểm soát truy cập, Bảo vệ dữ liệu, Thiết kế API an toàn' :
                                'Implemented security measures: Access control, Data protection, Secure API design'
                            }</li>
                        </ul>
                        <div class="achievements">
                            <strong>${isVietnamese ? 'Thành tựu:' : 'Achievements:'}</strong>
                            ${isVietnamese ? 
                                'Đảm bảo hoạt động ổn định và tối ưu hóa hiệu suất của từng sản phẩm, mang lại lợi ích tích cực phù hợp với nhu cầu cụ thể.' :
                                'Ensured stable operations and optimized performance of each product, delivering tangible benefits tailored to specific needs.'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <!-- Page 2 -->
            <div class="pdf-page">
                <div class="pdf-section">
                    <div class="experience-block">
                        <div class="company-info">
                            <strong>FECredit (Công ty Tài chính TNHH Ngân hàng Việt Nam Thịnh Vượng SMBC)</strong>
                            <span class="duration">${isVietnamese ? 'Tháng 4/2024 – Tháng 5/2025' : 'April 2024 – May 2025'}</span>
                        </div>
                        
                        <div class="project-info">
                            <strong>${isVietnamese ? 'Dự án: Portal' : 'Project: Portal'}</strong>
                        </div>
                        <div class="tech-info">
                            <strong>${isVietnamese ? 'Công nghệ:' : 'Technologies:'}</strong> Angular, AWS (Python), API Gateway, Lambda, S3, CloudWatch, DynamoDB, MySQL
                        </div>
                        <ul class="responsibilities">
                            <li>${isVietnamese ? 
                                'Thiết kế và duy trì portal kiểm thử nội bộ cho các đội QA/QC' :
                                'Designed and maintained internal testing portal for QA/QC teams'
                            }</li>
                            <li>${isVietnamese ? 
                                'Xử lý logic kinh doanh dựa trên ngoại lệ được kích hoạt bởi các ticket JIRA' :
                                'Handled exception-based business logic triggered by JIRA tickets'
                            }</li>
                            <li>${isVietnamese ? 
                                'Triển khai hệ thống thông báo quy mô lớn cho tới 3 triệu khách hàng' :
                                'Implemented large-scale notification systems for up to 3 million customers'
                            }</li>
                        </ul>

                        <div class="project-info">
                            <strong>${isVietnamese ? 'Dự án: Voolo' : 'Project: Voolo'}</strong>
                        </div>
                        <div class="tech-info">
                            <strong>${isVietnamese ? 'Công nghệ:' : 'Technologies:'}</strong> Python, AWS Services, DynamoDB, DocumentDB, MySQL
                        </div>
                        <ul class="responsibilities">
                            <li>${isVietnamese ? 
                                'Phát triển quy trình onboarding khách hàng hoàn chỉnh dựa trên tài liệu BRD chi tiết' :
                                'Developed complete customer onboarding workflow based on detailed BRD documentation'
                            }</li>
                            <li>${isVietnamese ? 
                                'Thiết kế API và triển khai logic đăng ký cho các giai đoạn thu thập dữ liệu và xác minh' :
                                'Designed APIs and implemented registration logic for data collection and verification stages'
                            }</li>
                            <li>${isVietnamese ? 
                                'Tiến hành kiểm thử API bằng Postman và Pytest để đảm bảo tính ổn định' :
                                'Conducted API testing using Postman and Pytest to ensure stability'
                            }</li>
                        </ul>

                        <div class="achievements">
                            <strong>${isVietnamese ? 'Thành tựu chính:' : 'Key Achievements:'}</strong>
                            ${isVietnamese ? 
                                'Giảm đáng kể thời gian giải quyết ticket, đảm bảo hoạt động PROD không bị gián đoạn, giảm khối lượng công việc QA/QC.' :
                                'Significantly reduced ticket resolution time, ensured uninterrupted PROD operations, reduced QA/QC workload.'
                            }
                        </div>
                    </div>

                    <div class="experience-block">
                        <div class="company-info">
                            <strong>${isVietnamese ? 'Công ty Cổ phần Giải pháp và Dịch vụ Toàn cầu HTC' : 'HTC Global Solutions and Services Joint Stock Company'}</strong>
                            <span class="duration">${isVietnamese ? 'Tháng 4/2023 – Tháng 1/2024' : 'April 2023 – January 2024'}</span>
                        </div>
                        
                        <div class="project-info">
                            <strong>${isVietnamese ? 'Dự án: Tích hợp OpenVAS với Splunk' : 'Project: OpenVAS Integration with Splunk'}</strong>
                        </div>
                        <div class="tech-info">
                            <strong>${isVietnamese ? 'Công nghệ:' : 'Technologies:'}</strong> OpenVAS, Splunk SIEM
                        </div>
                        <ul class="responsibilities">
                            <li>${isVietnamese ? 
                                'Thực hiện quét lỗ hổng trên danh sách các máy chủ trong hệ thống' :
                                'Conducted vulnerability scans on servers within the system'
                            }</li>
                            <li>${isVietnamese ? 
                                'Chuyển các log lỗ hổng từ OpenVAS đến hệ thống Splunk để phân tích' :
                                'Transferred vulnerability logs from OpenVAS to Splunk system for analysis'
                            }</li>
                            <li>${isVietnamese ? 
                                'Xây dựng hệ thống giám sát lỗ hổng để cung cấp cảnh báo kịp thời' :
                                'Built vulnerability monitoring system to provide timely alerts'
                            }</li>
                        </ul>

                        <div class="project-info">
                            <strong>${isVietnamese ? 'Dự án: Xây dựng Hệ thống Giám sát Bảo mật' : 'Project: Building Security Monitoring System'}</strong>
                        </div>
                        <div class="tech-info">
                            <strong>${isVietnamese ? 'Công nghệ:' : 'Technologies:'}</strong> Splunk SIEM, Splunk Studio, Splunk Security
                        </div>
                        <ul class="responsibilities">
                            <li>${isVietnamese ? 
                                'Thu thập và phân tích log từ các hệ thống bảo mật khác nhau' :
                                'Collected and analyzed logs from various security systems'
                            }</li>
                            <li>${isVietnamese ? 
                                'Phát triển hệ thống giám sát bảo mật tuân thủ Công văn số 2973, phát hiện 10+ loại tấn công mạng' :
                                'Developed security monitoring system compliant with Official Dispatch 2973, detecting 10+ types of cyberattacks'
                            }</li>
                            <li>${isVietnamese ? 
                                'Tạo dashboard để giám sát và cảnh báo, cho phép đội bảo mật phản ứng nhanh với các mối đe dọa' :
                                'Created dashboards for monitoring and alerts, enabling security team to respond quickly to threats'
                            }</li>
                        </ul>

                        <div class="achievements">
                            <strong>${isVietnamese ? 'Thành tựu chính:' : 'Key Achievements:'}</strong>
                            ${isVietnamese ? 
                                'Tích hợp thành công OpenVAS với Splunk, xây dựng hệ thống giám sát bảo mật đáp ứng tiêu chuẩn tổ chức, tăng cường khả năng phát hiện tấn công mạng thời gian thực.' :
                                'Successfully integrated OpenVAS with Splunk, built security monitoring system meeting organizational standards, strengthened real-time cyberattack detection capabilities.'
                            }
                        </div>
                    </div>

                    <div class="security-section">
                        <h4>${isVietnamese ? 'CÁC BIỆN PHÁP BẢO MẬT CHÍNH' : 'KEY SECURITY IMPLEMENTATIONS'}</h4>
                        <div class="security-items">
                            ${isVietnamese ? 
                                'Header Bảo mật • Quét Lỗ hổng • Quản lý Session • Bảo mật Truyền tải • Bảo vệ Dữ liệu • Ghi nhật ký & Giám sát • Thiết kế API An toàn • Xác thực Đầu vào & Mã hóa Đầu ra • Xác thực & Ủy quyền' :
                                'Security Headers • Vulnerability Scanning • Session Management • Transport Security • Data Protection • Logging & Monitoring • Secure API Design • Input Validation & Output Encoding • Authentication & Authorization'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create temporary container with simplified styles
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = simplifiedHTML;
    tempContainer.style.cssText = getPDFStyles();
    
    // Hide from view
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    
    document.body.appendChild(tempContainer);
    
    return tempContainer;
}

// Get simplified PDF styles
function getPDFStyles() {
    return `
        font-family: Arial, sans-serif;
        line-height: 1.4;
        color: #000;
        background: white;
    `;
}

// Add PDF-specific styles to document head
function addPDFStyles() {
    if (document.getElementById('pdf-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'pdf-styles';
    style.textContent = `
        .pdf-cv-container {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #000;
            background: white;
        }
        
        .pdf-page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 0;
            background: white;
            page-break-after: always;
            box-sizing: border-box;
        }
        
        .pdf-page:last-child {
            page-break-after: avoid;
        }
        
        .pdf-header {
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #333;
        }
        
        .pdf-header h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 8px 0;
            color: #000;
        }
        
        .pdf-header h2 {
            font-size: 14px;
            font-weight: normal;
            margin: 0 0 12px 0;
            color: #333;
        }
        
        .pdf-contact {
            font-size: 12px;
            color: #555;
        }
        
        .pdf-section {
            margin-bottom: 20px;
        }
        
        .pdf-section h3 {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 10px 0;
            padding-bottom: 3px;
            border-bottom: 1px solid #ccc;
            color: #000;
            text-transform: uppercase;
        }
        
        .pdf-section h4 {
            font-size: 14px;
            font-weight: bold;
            margin: 15px 0 8px 0;
            color: #000;
        }
        
        .pdf-section p {
            font-size: 11px;
            text-align: justify;
            margin: 0;
            line-height: 1.5;
        }
        
        .pdf-skills .skill-row {
            font-size: 11px;
            margin-bottom: 6px;
            line-height: 1.4;
        }
        
        .education-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
        }
        
        .experience-block {
            margin-bottom: 18px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .company-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            font-size: 13px;
        }
        
        .duration {
            font-style: italic;
            color: #666;
            font-size: 11px;
        }
        
        .project-info {
            font-size: 12px;
            margin-bottom: 5px;
        }
        
        .tech-info {
            font-size: 11px;
            margin-bottom: 8px;
            color: #333;
        }
        
        .responsibilities {
            font-size: 11px;
            margin: 8px 0;
            padding-left: 20px;
            line-height: 1.4;
        }
        
        .responsibilities li {
            margin-bottom: 4px;
        }
        
        .achievements {
            font-size: 11px;
            background: #f9f9f9;
            padding: 8px;
            border-left: 3px solid #333;
            margin-top: 8px;
            line-height: 1.4;
        }
        
        .security-section {
            margin-top: 15px;
        }
        
        .security-items {
            font-size: 10px;
            line-height: 1.5;
            text-align: justify;
        }
        
        .gpa {
            background: #f0f0f0;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 11px;
        }
        
        @media print {
            .pdf-page {
                margin: 0;
                padding: 15mm;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize PDF styles when page loads
document.addEventListener('DOMContentLoaded', function() {
    addPDFStyles();
});

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