let currentLang = 'en';
let cvData = null;

// Load CV data from JSON
async function loadCVData() {
    try {
        const response = await fetch('./cv-data.json');
        if (!response.ok) {
            throw new Error('Failed to load CV data');
        }
        cvData = await response.json();
        renderCV();
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.controls').style.display = 'flex';
        document.getElementById('cv-container').style.display = 'block';
    } catch (error) {
        console.error('Error loading CV data:', error);
        document.getElementById('loading').innerHTML = `
            <div class="error">
                <div>
                    <p>Error loading CV data. Please make sure cv-data.json exists in the same directory.</p>
                    <p>Error: ${error.message}</p>
                </div>
            </div>
        `;
    }
}

// Get text based on current language
function getText(textObject) {
    if (typeof textObject === 'string') return textObject;
    return textObject[currentLang] || textObject.en || textObject.vi || '';
}

// Render CV content
function renderCV() {
    if (!cvData) return;

    const container = document.getElementById('cv-container');
    container.innerHTML = '';

    // Update page title
    document.title = `${getText(cvData.personal.name)} - CV`;

    // Create pages
    cvData.pages.forEach((page, index) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page';
        
        // Add header only to first page
        if (index === 0) {
            pageDiv.appendChild(createHeader());
        }

        // Add sections
        page.sections.forEach(sectionName => {
            const section = cvData.sections[sectionName];
            if (section) {
                pageDiv.appendChild(createSection(sectionName, section));
            }
        });

        container.appendChild(pageDiv);
    });
}

// Create header
function createHeader() {
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `
        <div class="name">${getText(cvData.personal.name)}</div>
        <div class="title">
            <span class="lang-en">${cvData.personal.title.en}</span>
            <span class="lang-vi">${cvData.personal.title.vi}</span>
        </div>
        <div class="contact-info">
            ${cvData.personal.contact.map(contact => `
                <div class="contact-item">${contact.icon} ${contact.value}</div>
            `).join('')}
        </div>
    `;
    return header;
}

// Create section
function createSection(sectionName, section) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'section';
    
    const title = document.createElement('div');
    title.className = 'section-title';
    title.innerHTML = `
        <span class="lang-en">${section.title.en}</span>
        <span class="lang-vi">${section.title.vi}</span>
    `;
    sectionDiv.appendChild(title);

    // Handle different section types
    switch (sectionName) {
        case 'about':
            sectionDiv.appendChild(createAboutSection(section));
            break;
        case 'skills':
            sectionDiv.appendChild(createSkillsSection(section));
            break;
        case 'education':
            sectionDiv.appendChild(createEducationSection(section));
            break;
        case 'experience':
            sectionDiv.appendChild(createExperienceSection(section));
            break;
        default:
            sectionDiv.appendChild(createDefaultSection(section));
    }

    return sectionDiv;
}

// Create about section
function createAboutSection(section) {
    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about-text';
    aboutDiv.innerHTML = `
        <span class="lang-en">${section.content.en}</span>
        <span class="lang-vi">${section.content.vi}</span>
    `;
    return aboutDiv;
}

// Create skills section
function createSkillsSection(section) {
    const skillsDiv = document.createElement('div');
    skillsDiv.className = 'skills-grid';
    
    section.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        categoryDiv.innerHTML = `
            <div class="skill-title">
                <span class="lang-en">${category.title.en}</span>
                <span class="lang-vi">${category.title.vi}</span>
            </div>
            <div class="skill-items">
                <span class="lang-en">${category.skills.en}</span>
                <span class="lang-vi">${category.skills.vi}</span>
            </div>
        `;
        skillsDiv.appendChild(categoryDiv);
    });
    
    return skillsDiv;
}

// Create education section
function createEducationSection(section) {
    const educationDiv = document.createElement('div');
    educationDiv.className = 'education-card';
    
    section.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'education-item';
        itemDiv.innerHTML = `
            <div class="university">
                <span class="lang-en">${item.institution.en}</span>
                <span class="lang-vi">${item.institution.vi}</span>
            </div>
            <div class="gpa">${item.gpa}</div>
        `;
        educationDiv.appendChild(itemDiv);
    });
    
    return educationDiv;
}

// Create experience section
function createExperienceSection(section) {
    const experienceDiv = document.createElement('div');
    
    section.items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'experience-item';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'company-header';
        
        headerDiv.innerHTML = `
            <div class="company-header-left">
                <div class="company-name">
                    <span class="lang-en">${item.company.en}</span>
                    <span class="lang-vi">${item.company.vi}</span>
                </div>
                ${item.position ? `
                    <div class="position" style="font-size: 13px; color: rgba(255, 255, 255, 0.9); margin-bottom: 5px;">
                        <span class="lang-en">${item.position.en}</span>
                        <span class="lang-vi">${item.position.vi}</span>
                    </div>
                ` : ''}
                <div class="duration">
                    <span class="lang-en">${item.duration.en}</span>
                    <span class="lang-vi">${item.duration.vi}</span>
                </div>
            </div>
            <div class="company-header-right">
                <button class="collapse-toggle" id="toggle-${index}">
                    <span class="collapse-icon">▼</span>
                    <span class="lang-en">Hide</span>
                    <span class="lang-vi">Ẩn</span>
                </button>
            </div>
        `;
        
        // Add click event only to toggle button
        const toggleBtn = headerDiv.querySelector('.collapse-toggle');
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleExperienceContent(index);
        });
        
        itemDiv.appendChild(headerDiv);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'experience-content';
        contentDiv.id = `content-${index}`;
        
        // Add projects
        if (item.projects && item.projects.length > 0) {
            item.projects.forEach((project, projectIndex) => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-container';
                projectDiv.innerHTML = `
                    <div class="project-title">
                        <span class="lang-en">${project.title.en}</span>
                        <span class="lang-vi">${project.title.vi}</span>
                    </div>
                    ${project.overview ? `
                        <div class="project-overview">
                            <strong>
                                <span class="lang-en">Overview:</span>
                                <span class="lang-vi">Tổng quan:</span>
                            </strong>
                            <span class="lang-en">${project.overview.en}</span>
                            <span class="lang-vi">${project.overview.vi}</span>
                        </div>
                    ` : ''}
                    ${project.technologies ? `
                        <div class="tech-used">
                            <span class="tech-label">
                                <span class="lang-en">Technologies Used:</span>
                                <span class="lang-vi">Công nghệ sử dụng:</span>
                            </span>
                            <span class="lang-en">${project.technologies.en}</span>
                            <span class="lang-vi">${project.technologies.vi}</span>
                        </div>
                    ` : ''}
                    ${project.responsibilities && project.responsibilities.length > 0 ? `
                        <div class="responsibilities">
                            <div class="resp-title">
                                <span class="lang-en">Responsibilities:</span>
                                <span class="lang-vi">Trách nhiệm:</span>
                            </div>
                            <div class="resp-list">
                                ${project.responsibilities.map(resp => `
                                    <div class="resp-item">
                                        <span class="lang-en">${resp.en}</span>
                                        <span class="lang-vi">${resp.vi}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${project.security && project.security.length > 0 ? `
                        <div class="responsibilities">
                            <div class="resp-title">
                                <span class="lang-en">Security:</span>
                                <span class="lang-vi">Bảo mật:</span>
                            </div>
                            <div class="security-grid">
                                ${project.security.map(secItem => `
                                    <div class="security-item">
                                        <span class="lang-en">${secItem.en}</span>
                                        <span class="lang-vi">${secItem.vi}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${project.achievements ? `
                        <div class="achievements">
                            <div class="achievement-title">
                                <span class="lang-en">Key Achievements:</span>
                                <span class="lang-vi">Thành tựu chính:</span>
                            </div>
                            <div class="achievement-list">
                                <span class="lang-en">${project.achievements.en}</span>
                                <span class="lang-vi">${project.achievements.vi}</span>
                            </div>
                        </div>
                    ` : ''}
                `;
                contentDiv.appendChild(projectDiv);
            });
        }
        
        itemDiv.appendChild(contentDiv);
        experienceDiv.appendChild(itemDiv);
    });
    
    return experienceDiv;
}

// Create default section
function createDefaultSection(section) {
    const defaultDiv = document.createElement('div');
    defaultDiv.innerHTML = `
        <div class="about-text">
            <span class="lang-en">${section.content?.en || 'Content not available'}</span>
            <span class="lang-vi">${section.content?.vi || 'Nội dung không có sẵn'}</span>
        </div>
    `;
    return defaultDiv;
}

// Toggle main dropdown menu
function toggleMainDropdown(event) {
    event.stopPropagation();
    
    const dropdown = document.getElementById('main-dropdown');
    const dropdownContainer = document.querySelector('.download-dropdown');
    
    if (dropdown && dropdownContainer) {
        dropdown.classList.toggle('show');
        dropdownContainer.classList.toggle('active');
    }
}

// Download main CV - Back to direct links
function downloadMainCV(language) {
    if (!cvData || !cvData.downloadUrls) {
        alert('Download links not available');
        return;
    }
    
    const url = cvData.downloadUrls[language];
    if (url) {
        window.open(url, '_blank');
        
        // Show success notification
        const message = language === 'en' ? 
            '✓ Opening CV download link...' : 
            '✓ Đang mở liên kết tải CV...';
        showNotification(message);
    } else {
        alert(`Download link not available for ${language.toUpperCase()}`);
    }
    
    // Close dropdown
    const dropdown = document.getElementById('main-dropdown');
    const dropdownContainer = document.querySelector('.download-dropdown');
    if (dropdown) dropdown.classList.remove('show');
    if (dropdownContainer) dropdownContainer.classList.remove('active');
}

// Toggle experience content
function toggleExperienceContent(index) {
    const content = document.getElementById(`content-${index}`);
    const toggle = document.getElementById(`toggle-${index}`);
    
    if (content && toggle) {
        const isCollapsed = content.classList.contains('collapsed');
        
        if (isCollapsed) {
            // Expand
            content.classList.remove('collapsed');
            toggle.classList.remove('collapsed');
            toggle.innerHTML = `
                <span class="collapse-icon">▼</span>
                <span class="lang-en">Hide</span>
                <span class="lang-vi">Ẩn</span>
            `;
        } else {
            // Collapse
            content.classList.add('collapsed');
            toggle.classList.add('collapsed');
            toggle.innerHTML = `
                <span class="collapse-icon">▼</span>
                <span class="lang-en">Show</span>
                <span class="lang-vi">Hiện</span>
            `;
        }
    }
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    document.body.setAttribute('data-lang', currentLang);
    
    const button = document.querySelector('.language-toggle');
    if (button) {
        if (currentLang === 'en') {
            button.innerHTML = '🇻🇳 Tiếng Việt';
        } else {
            button.innerHTML = '🇺🇸 English';
        }
    }
}

// Show notification
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
}

// Add smooth animations
function addAnimations() {
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
}

// Add button hover effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.download-btn, .language-toggle');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
        
        if (e.altKey) {
            switch(e.key) {
                case 'l':
                case 'L':
                    e.preventDefault();
                    toggleLanguage();
                    break;
                case 'd':
                case 'D':
                    e.preventDefault();
                    // Open dropdown
                    toggleMainDropdown(e);
                    break;
            }
        }
    });
}

// Close dropdown when clicking outside
function addDropdownHandler() {
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.download-dropdown')) {
            const dropdown = document.getElementById('main-dropdown');
            const dropdownContainer = document.querySelector('.download-dropdown');
            
            if (dropdown) dropdown.classList.remove('show');
            if (dropdownContainer) dropdownContainer.classList.remove('active');
        }
    });
}

// Add print handlers
function addPrintHandlers() {
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
        const controls = document.querySelector('.controls');
        if (controls) controls.style.display = 'none';
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
        const controls = document.querySelector('.controls');
        if (controls) controls.style.display = 'flex';
    });
}

// Add responsive handlers
function addResponsiveHandlers() {
    function handleResize() {
        const controls = document.querySelector('.controls');
        if (controls) {
            if (window.innerWidth <= 768) {
                controls.classList.add('mobile-controls');
            } else {
                controls.classList.remove('mobile-controls');
            }
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
}

// Add accessibility features
function addAccessibilityFeatures() {
    // Add tooltips for keyboard shortcuts
    const downloadBtn = document.querySelector('.download-btn');
    const langBtn = document.querySelector('.language-toggle');

    if (downloadBtn) downloadBtn.title = 'Download CV (Alt+D)';
    if (langBtn) langBtn.title = 'Toggle Language (Alt+L)';

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus indicators
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
}

// Add loading animation
function addLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Add smooth scroll for internal links
function addSmoothScroll() {
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
}

// Add error handling
function addErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
        if (e.error && e.error.message.includes('download')) {
            alert('Download link temporarily unavailable. Please try again later.');
        }
    });
}

// Add preload for better performance
function addPreload() {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://drive.google.com';
    document.head.appendChild(link);
}

// Initialize everything
function init() {
    loadCVData();
    addLoadingAnimation();
    addKeyboardShortcuts();
    addDropdownHandler();
    addPrintHandlers();
    addResponsiveHandlers();
    addErrorHandling();
    addPreload();
    
    // Add other features after content is loaded
    setTimeout(() => {
        addAnimations();
        addButtonEffects();
        addAccessibilityFeatures();
        addSmoothScroll();
    }, 500);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);