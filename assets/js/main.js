// assets/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    }
                }
            }
        });
    });

    // Terminal cursor animation
    setInterval(() => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }
    }, 500);

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Terminal typing effect
    let optionIndex = 0;
    const options = ['1', '2', '3', '4', '5', '6'];
    let typingInterval;
    
    function startTerminalTyping() {
        const cursor = document.querySelector('.cursor');
        if (!cursor) return;
        
        typingInterval = setInterval(() => {
            // Remove previous number if exists
            const previousNumber = cursor.previousSibling;
            if (previousNumber && previousNumber.nodeType === 3 && /[1-6]/.test(previousNumber.textContent)) {
                previousNumber.remove();
            }
            
            // Insert new number
            cursor.insertAdjacentText('beforebegin', options[optionIndex]);
            optionIndex = (optionIndex + 1) % options.length;
        }, 1000);
    }

    // Start typing effect after page load
    setTimeout(startTerminalTyping, 1500);

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const originalText = stat.textContent;
                let targetValue;
                
                // Check if value is percentage or number
                if (originalText.includes('%')) {
                    targetValue = parseInt(originalText);
                } else {
                    targetValue = parseInt(originalText);
                }
                
                if (!isNaN(targetValue)) {
                    let currentValue = 0;
                    const increment = targetValue / 30;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            stat.textContent = originalText;
                            clearInterval(timer);
                        } else {
                            if (originalText.includes('%')) {
                                stat.textContent = Math.floor(currentValue) + '%';
                            } else {
                                stat.textContent = Math.floor(currentValue);
                            }
                        }
                    }, 30);
                    
                    observer.unobserve(stat);
                }
            }
        });
    }, { threshold: 0.3 });

    stats.forEach(stat => {
        observer.observe(stat);
    });

    // Update copyright year
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Hero typing effect
    const heroHighlight = document.querySelector('.hero .highlight');
    if (heroHighlight) {
        const text = heroHighlight.textContent;
        heroHighlight.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHighlight.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }

    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.about-card, .contact-card, .stat');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Project demo button functionality
    const demoButtons = document.querySelectorAll('.btn-accent');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando Demo...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Demo Disponível!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
});
