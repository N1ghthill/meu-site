// assets/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    let currentLanguage = 'pt';
    const languageButtons = document.querySelectorAll('.lang-btn');
    const copyMessages = {
        pt: {
            success: 'Chave Pix copiada!',
            error: 'Não foi possível copiar automaticamente. Copie manualmente.',
        },
        en: {
            success: 'Pix key copied!',
            error: 'Unable to copy automatically. Please copy manually.',
        },
    };

    const setLanguage = (lang) => {
        currentLanguage = lang === 'en' ? 'en' : 'pt';
        document.body.classList.toggle('language-en', currentLanguage === 'en');
        document.body.classList.toggle('language-pt', currentLanguage === 'pt');
        document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'pt-BR';

        languageButtons.forEach((button) => {
            button.setAttribute(
                'aria-pressed',
                button.dataset.lang === currentLanguage ? 'true' : 'false'
            );
        });

        document.querySelectorAll('[data-aria-label-pt]').forEach((element) => {
            const label = currentLanguage === 'en'
                ? element.dataset.ariaLabelEn
                : element.dataset.ariaLabelPt;
            if (label) {
                element.setAttribute('aria-label', label);
            }
        });

        document.querySelectorAll('meta[data-content-pt]').forEach((meta) => {
            const content = currentLanguage === 'en'
                ? meta.dataset.contentEn
                : meta.dataset.contentPt;
            if (content) {
                meta.setAttribute('content', content);
            }
        });

        document.querySelectorAll('[data-alt-pt]').forEach((element) => {
            const alt = currentLanguage === 'en'
                ? element.dataset.altEn
                : element.dataset.altPt;
            if (alt) {
                element.setAttribute('alt', alt);
            }
        });

        const titleElement = document.querySelector('title[data-title-pt]');
        if (titleElement) {
            document.title = currentLanguage === 'en'
                ? titleElement.dataset.titleEn
                : titleElement.dataset.titlePt;
        }

        const copyFeedbackElement = document.querySelector('.support-copy-feedback');
        if (copyFeedbackElement) {
            copyFeedbackElement.textContent = '';
        }

        localStorage.setItem('language', currentLanguage);
    };

    const storedLanguage = localStorage.getItem('language');
    const browserLanguage = (navigator.language || '').toLowerCase();
    const initialLanguage = storedLanguage || (browserLanguage.startsWith('en') ? 'en' : 'pt');
    setLanguage(initialLanguage);

    if (languageButtons.length) {
        languageButtons.forEach((button) => {
            button.addEventListener('click', () => setLanguage(button.dataset.lang));
        });
    }


    // Featured gallery (BotAssist screenshots)
    const gallery = document.querySelector('[data-featured-gallery]');
    if (gallery) {
        const mainImage = gallery.querySelector('.featured-gallery-main');
        const chip = gallery.querySelector('.featured-gallery-chip');
        const counter = gallery.querySelector('[data-featured-gallery-counter]');
        const thumbs = Array.from(gallery.querySelectorAll('[data-featured-thumb]'));

        const setActiveThumb = (nextIndex) => {
            const total = thumbs.length || 1;
            const safeIndex = Math.max(0, Math.min(total - 1, nextIndex));
            thumbs.forEach((btn, i) => {
                const active = i === safeIndex;
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });

            const btn = thumbs[safeIndex];
            if (!btn || !mainImage) return;
            const src = btn.dataset.src || '';
            const altPt = btn.dataset.altPt || '';
            const altEn = btn.dataset.altEn || '';
            const labelPt = btn.dataset.labelPt || '';
            const labelEn = btn.dataset.labelEn || '';

            if (src) mainImage.src = src;
            mainImage.dataset.altPt = altPt;
            mainImage.dataset.altEn = altEn;
            mainImage.alt = currentLanguage === 'en' ? (altEn || altPt) : (altPt || altEn);

            if (chip) {
                const pt = chip.querySelector('.lang-pt');
                const en = chip.querySelector('.lang-en');
                if (pt && labelPt) pt.textContent = labelPt;
                if (en && labelEn) en.textContent = labelEn;
            }

            if (counter) {
                const pos = String(safeIndex + 1).padStart(2, '0');
                const tot = String(total).padStart(2, '0');
                counter.textContent = `${pos}/${tot}`;
                counter.setAttribute(
                    'aria-label',
                    currentLanguage === 'en' ? `${safeIndex + 1} of ${total}` : `${safeIndex + 1} de ${total}`
                );
            }
        };

        thumbs.forEach((btn, i) => {
            btn.addEventListener('click', () => setActiveThumb(i));
        });

        // Ensure the default state is consistent.
        const initial = thumbs.findIndex((b) => b.classList.contains('is-active'));
        setActiveThumb(initial >= 0 ? initial : 0);
    }

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
    const options = ['1', '2', '3', '4', '5'];
    let typingInterval;
    
    function startTerminalTyping() {
        const cursor = document.querySelector('.cursor');
        if (!cursor) return;
        
        typingInterval = setInterval(() => {
            // Remove previous number if exists
            const previousNumber = cursor.previousSibling;
            if (previousNumber && previousNumber.nodeType === 3 && /[1-5]/.test(previousNumber.textContent)) {
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

    const supportCard = document.querySelector('.support-card');
    const pixButton = document.querySelector('.support-pix-btn');
    const supportModal = document.querySelector('.support-modal');
    const supportBackdrop = document.querySelector('.support-modal-backdrop');
    const supportClose = document.querySelector('.support-modal-close');
    const pixKeyText = document.querySelector('[data-pix-key-text]');
    const copyButton = document.querySelector('.support-copy-btn');
    const copyFeedback = document.querySelector('.support-copy-feedback');

    if (supportCard) {
        const pixKey = (supportCard.dataset.pixKey || '').trim();
        if (!pixKey && pixButton) {
            pixButton.remove();
        }

        if (pixKeyText && pixKey) {
            pixKeyText.textContent = pixKey;
        }

        function openSupportModal() {
            if (!supportModal || !pixKey) return;
            supportModal.classList.add('open');
            supportModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeSupportModal() {
            if (!supportModal) return;
            supportModal.classList.remove('open');
            supportModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (copyFeedback) {
                copyFeedback.textContent = '';
            }
        }

        async function copyPixKey() {
            if (!pixKey) return;
            let copied = false;

            if (navigator?.clipboard?.writeText) {
                try {
                    await navigator.clipboard.writeText(pixKey);
                    copied = true;
                } catch {
                    copied = false;
                }
            }

            if (!copied) {
                const textarea = document.createElement('textarea');
                textarea.value = pixKey;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                copied = document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            if (copyFeedback) {
                const messageSet = copyMessages[currentLanguage] || copyMessages.pt;
                copyFeedback.textContent = copied
                    ? messageSet.success
                    : messageSet.error;
            }
        }

        if (pixButton) {
            pixButton.addEventListener('click', openSupportModal);
        }

        if (supportBackdrop) {
            supportBackdrop.addEventListener('click', closeSupportModal);
        }

        if (supportClose) {
            supportClose.addEventListener('click', closeSupportModal);
        }

        if (copyButton) {
            copyButton.addEventListener('click', copyPixKey);
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeSupportModal();
            }
        });
    }

});
