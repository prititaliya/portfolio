// Clean Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initTypingEffect();
    initMobileMenu();
    initFormHandling();
    initParallaxEffects();
    initSkillAnimations();
    initProjectHoverEffects();
    initGitHubProjects();
});

// GitHub Projects Integration
async function initGitHubProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Check if projects are already loaded (static HTML)
    if (projectsGrid.children.length > 0) {
        console.log('Projects already loaded from static HTML');
        return; // Don't override existing content
    }
    
    try {
        // Show loading state
        projectsGrid.innerHTML = `
            <div class="loading-projects">
                <div class="loading-spinner"></div>
                <p>Loading projects...</p>
            </div>
        `;
        
        // Fetch projects from GitHub API
        const projects = await fetchGitHubProjects();
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-code"></i>
                    <h3>No projects found</h3>
                    <p>Check back later for new projects!</p>
                </div>
            `;
            return;
        }
        
        // Display projects
        displayProjects(projects);
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading projects</h3>
                <p>Please check your internet connection and try again.</p>
            </div>
        `;
    }
}

// Fetch projects from GitHub API
async function fetchGitHubProjects() {
    // Since we can't use GitHub API directly due to CORS, we'll use a predefined list
    // In production, you would use GitHub's API with proper authentication
    const projects = [
        {
            name: "Brain Tumor Classification",
            description: "Fine-tuned deep learning model for brain tumor classification using convolutional neural networks. Achieves high accuracy in detecting and classifying different types of brain tumors from MRI scans.",
            html_url: "https://github.com/prititaliya/Brain-tumor",
            language: "Python",
            topics: ["deep-learning", "computer-vision", "medical-ai", "cnn", "brain-tumor"],
            created_at: "2024-01-01",
            updated_at: "2024-12-01",
            featured: true
        },
        {
            name: "Face Mask Detector",
            description: "Real-time face mask detection system using computer vision and machine learning. Detects whether a person is wearing a mask, not wearing a mask, or wearing it incorrectly.",
            html_url: "https://github.com/prititaliya/Face-Mask-Detector",
            language: "Python",
            topics: ["computer-vision", "machine-learning", "face-detection", "mask-detection", "opencv"],
            created_at: "2023-12-01",
            updated_at: "2024-11-15",
            featured: false
        },
        {
            name: "Quizzer: Interactive PDF Q&A System",
            description: "Python-based application enabling users to upload and interact with PDF documents through an AI-powered Q&A interface. Integrates LangChain, vector embeddings (Chroma DB), and Google Gemini AI for automated semantic search and context-aware answer generation.",
            html_url: "https://github.com/prititaliya/Quizzer",
            language: "Python",
            topics: ["ai", "nlp", "python", "langchain", "vector-embeddings", "pdf-processing"],
            created_at: "2024-08-01",
            updated_at: "2024-12-01",
            featured: true
        },
        {
            name: "WealthWise - Android Wealth Management App",
            description: "Spearheaded the development of an Android application designed to assist users in tracking and managing their financial activities, emphasizing a clean and intuitive user interface. Played a pivotal role in implementing the application's core logic, including budget validation, category-based tracking, and goal-based projections.",
            html_url: "https://github.com/prititaliya/WealthWise",
            language: "Java",
            topics: ["android", "java", "financial-management", "mobile-app", "testing", "agile"],
            created_at: "2025-01-01",
            updated_at: "2025-04-01",
            featured: true
        },
        {
            name: "Personalized Movie Recommendation System",
            description: "Built a content-based recommendation system predicting user preferences with over 1,800 movie datasets. Used cosine similarity to enhance user-item matching, improving recommendation accuracy by 20%. Implemented data preprocessing and normalization (StandardScaler) to handle sparse data matrices efficiently.",
            html_url: "https://github.com/prititaliya/Movie-Recommendations-System",
            language: "Python",
            topics: ["machine-learning", "recommendation-system", "python", "data-analysis", "cosine-similarity", "collaborative-filtering"],
            created_at: "2024-12-01",
            updated_at: "2024-12-15",
            featured: false
        },
        {
            name: "Spam Email Detection System",
            description: "Developed a spam email classifier using Multinomial Naive Bayes, achieving 99.56% accuracy on test data. Implemented text preprocessing and vectorization techniques, converting raw email content into numerical features. Created data visualizations including spam vs. non-spam email distribution and word cloud analysis to extract insights.",
            html_url: "https://github.com/prititaliya/Spam-Email-Detection-System",
            language: "Python",
            topics: ["machine-learning", "nlp", "python", "classification", "text-processing", "naive-bayes", "data-visualization"],
            created_at: "2024-06-01",
            updated_at: "2024-06-15",
            featured: false
        }
    ];
    
    return projects;
}

// Display projects in the grid
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    const projectsHTML = projects.map(project => createProjectCard(project)).join('');
    
    projectsGrid.innerHTML = projectsHTML;
}

// Create individual project card HTML
function createProjectCard(project) {
    const isFeatured = project.featured;
    const languageIcon = getLanguageIcon(project.language);
    const topics = project.topics.slice(0, 6); // Limit to 6 topics for better layout
    const updateDate = formatDate(project.updated_at);
    
    return `
        <div class="project-card ${isFeatured ? 'featured' : ''}" data-language="${project.language.toLowerCase()}" data-topics="${project.topics.join(' ')}">
            <div class="project-header">
                <div class="project-icon">
                    ${languageIcon}
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
            </div>
            
            <div class="project-meta">
                <div class="meta-item">
                    <i class="fas fa-circle"></i>
                    <span>${project.language}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${updateDate}</span>
                </div>
                ${isFeatured ? `
                <div class="meta-item">
                    <i class="fas fa-star"></i>
                    <span>Featured</span>
                </div>
                ` : ''}
            </div>
            
            <div class="project-tech">
                ${topics.map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
            </div>
            
            <div class="project-links">
                <a href="${project.html_url}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i>
                    View Project
                </a>
                <a href="${project.html_url}/archive/refs/heads/main.zip" class="btn btn-outline">
                    <i class="fas fa-download"></i>
                    Download
                </a>
            </div>
        </div>
    `;
}

// Get appropriate icon for programming language
function getLanguageIcon(language) {
    const icons = {
        'Python': '🐍',
        'JavaScript': '⚡',
        'Java': '☕',
        'C++': '⚙️',
        'C#': '🎯',
        'Go': '🐹',
        'Rust': '🦀',
        'TypeScript': '📘',
        'PHP': '🐘',
        'Ruby': '💎',
        'Swift': '🍎',
        'Kotlin': '🟠',
        'Scala': '🔴',
        'R': '📊',
        'MATLAB': '🔬'
    };
    
    return icons[language] || '💻';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Active navigation highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Mobile navigation menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Form handling with validation
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#6366f1';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroBackground = document.querySelector('.hero-background');
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            gradientOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.1;
                orb.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
}

// Skill animations
function initSkillAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project hover effects
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectImage = card.querySelector('.project-image');
        
        card.addEventListener('mouseenter', function() {
            if (projectImage) {
                projectImage.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (projectImage) {
                projectImage.style.transform = 'scale(1)';
            }
        });
    });
}

// Add CSS for mobile menu
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            border-top: 1px solid var(--gray-200);
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// Smooth reveal animation for statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        const isPercentage = finalNumber.includes('%');
        const numericValue = parseFloat(finalNumber.replace(/[^\d.]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            stat.textContent = isPercentage ? 
                `${Math.round(currentValue)}%` : 
                `${Math.round(currentValue)}+`;
        }, 30);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
}