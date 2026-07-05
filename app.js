/**
 * MMZARA METAL - Core Website Logic
 * Includes: Multi-language mapping, Product filtering, Menu interactions, Scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Language State
    let currentLang = 'tr';

    // Elements
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const langTr = document.getElementById('lang-tr');
    const langEn = document.getElementById('lang-en');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // ==========================================================================
    // 1. Language Switcher (TR / EN)
    // ==========================================================================
    const translations = {
        tr: {
            placeholderName: "Örn. Ahmet Yılmaz",
            placeholderEmail: "name@company.com",
            placeholderPhone: "+90 5xx xxx xx xx",
            placeholderMessage: "Taleplerinizi veya sormak istediklerinizi yazınız...",
            formSuccess: "Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.",
            formError: "Bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin."
        },
        en: {
            placeholderName: "e.g. John Doe",
            placeholderEmail: "name@company.com",
            placeholderPhone: "+1 xxx xxx xxxx",
            placeholderMessage: "Type your requests or questions here...",
            formSuccess: "Your message has been sent successfully! We will contact you shortly.",
            formError: "An error occurred. Please check your information and try again."
        },
        ar: {
            placeholderName: "مثال: أحمد محمد",
            placeholderEmail: "name@company.com",
            placeholderPhone: "+90 5xx xxx xx xx",
            placeholderMessage: "اكتب طلباتك أو استفساراتك هنا...",
            formSuccess: "تم إرسال رسالتك بنجاح! سنتصل بك في أقرب وقت ممكن.",
            formError: "حدث خطأ. يرجى التحقق من معلوماتك والمحاولة مرة أخرى."
        }
    };

    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update Active Class on Buttons
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`lang-${lang}`);
        if (activeBtn) activeBtn.classList.add('active');

        document.documentElement.lang = lang;
        
        // Handle Right-to-Left (RTL) for Arabic
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }

        // Translate elements with data-tr and data-en
        const translatableElements = document.querySelectorAll('[data-tr]');
        translatableElements.forEach(el => {
            const translationText = el.getAttribute(`data-${lang}`);
            if (translationText) {
                // If it is a button/link or normal text container
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // Handled separately below for placeholder
                } else {
                    // Check if there are child elements we want to preserve (like icons in buttons)
                    const icon = el.querySelector('i');
                    if (icon) {
                        el.innerHTML = '';
                        el.appendChild(icon);
                        el.appendChild(document.createTextNode(' ' + translationText));
                    } else {
                        el.textContent = translationText;
                    }
                }
            }
        });

        // Translate Form Placeholders
        const inputName = document.getElementById('form-name');
        const inputEmail = document.getElementById('form-email');
        const inputPhone = document.getElementById('form-phone');
        const textareaMsg = document.getElementById('form-message');

        if (inputName) inputName.placeholder = translations[lang].placeholderName;
        if (inputEmail) inputEmail.placeholder = translations[lang].placeholderEmail;
        if (inputPhone) inputPhone.placeholder = translations[lang].placeholderPhone;
        if (textareaMsg) textareaMsg.placeholder = translations[lang].placeholderMessage;
    }

    // Language Event Listeners
    if (langTr) langTr.addEventListener('click', () => switchLanguage('tr'));
    if (langEn) langEn.addEventListener('click', () => switchLanguage('en'));
    const langAr = document.getElementById('lang-ar');
    if (langAr) langAr.addEventListener('click', () => switchLanguage('ar'));

    // ==========================================================================
    // 2. Product Category Filtering
    // ==========================================================================
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filters and add to current
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // GSAP-like smooth scale animation for vanilla JS
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // match CSS transitions
                }
            });
        });
    });

    // ==========================================================================
    // 3. Navigation Header Scroll Effect
    // ==========================================================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        highlightNavLinkOnScroll();
    });

    // Highlight menu links during scroll
    function highlightNavLinkOnScroll() {
        let scrollPosition = window.scrollY + 120; // offset

        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================================================
    // 4. Mobile Menu Interactions
    // ==========================================================================
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ==========================================================================
    // 5. Contact Form Submission (Mock Handler)
    // ==========================================================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading status
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = currentLang === 'tr' ? 'Gönderiliyor... <i class="fa-solid fa-spinner fa-spin"></i>' : 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            
            formStatus.className = 'form-message-status';
            formStatus.textContent = '';

            // Simulate server network delay
            setTimeout(() => {
                // Success action
                formStatus.classList.add('success');
                formStatus.textContent = translations[currentLang].formSuccess;
                
                // Reset form fields
                contactForm.reset();
                
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }

    // Initial translation load (triggers placeholder set)
    switchLanguage('tr');
});
