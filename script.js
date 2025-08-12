// Google Drive PDF Downloader Website JavaScript
// Handles navigation, smooth scrolling, copy functionality, animations, and modal interactions

document.addEventListener('DOMContentLoaded', function() {
    // Force all sections to be visible immediately
    forceSectionVisibility();
    
    // Initialize all functionality
    initScrollAnimations();
    initCopyToClipboard();
    initModal();
    initKeyboardNavigation();
    initMobileNavigation();
});

// Function to force all sections to be visible
function forceSectionVisibility() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.display = 'block';
        section.style.transform = 'none';
        section.style.minHeight = 'auto';
        section.style.position = 'relative';
        section.style.zIndex = '1';
    });
    
    // Also ensure step cards are visible
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.display = 'block';
        card.style.transform = 'none';
    });
    
    // Ensure about features are visible
    const aboutFeatures = document.querySelectorAll('.about-feature');
    aboutFeatures.forEach(feature => {
        feature.style.opacity = '1';
        feature.style.visibility = 'visible';
        feature.style.transform = 'none';
    });
    
    // Ensure feature highlights are visible
    const featureHighlights = document.querySelectorAll('.feature-highlight');
    featureHighlights.forEach(highlight => {
        highlight.style.opacity = '1';
        highlight.style.visibility = 'visible';
        highlight.style.transform = 'none';
    });
}





// Scroll to specific section (for buttons)
function scrollToSection(sectionId) {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
        // Try multiple scroll methods for better compatibility
        try {
            // Method 1: scrollIntoView with smooth behavior
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            console.log(`Scrolled to ${sectionId} section using scrollIntoView`);
        } catch (error) {
            console.log(`scrollIntoView failed for ${sectionId}, trying alternative method`);
            // Method 2: window.scrollTo as fallback
            const offsetTop = targetSection.offsetTop - 100; // Account for navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            console.log(`Scrolled to ${sectionId} section using window.scrollTo`);
        }
        
        // Also update the active navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        console.error(`Section with ID '${sectionId}' not found`);
    }
}

// Scroll animations
function initScrollAnimations() {
    // Force all sections to be visible immediately
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.display = 'block';
        section.style.transform = 'none';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ensure visibility
                entry.target.style.opacity = '1';
                entry.target.style.visibility = 'visible';
                entry.target.style.transform = 'none';
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
        // Ensure initial visibility
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
    });

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.step-card, .about-visual, .code-container, .demo-container');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        // Ensure initial visibility
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
    });
}

// Copy to clipboard functionality
function initCopyToClipboard() {
    const copyButton = document.querySelector('.copy-button');

    if (copyButton) {
        copyButton.addEventListener('click', function() {
            copyToClipboard();
        });
    }
}

function copyToClipboard() {
    const codeContent = document.getElementById('code-content');
    const copyButton = document.querySelector('.copy-button');

    if (codeContent && copyButton) {
        const textToCopy = codeContent.textContent;
        
        // Try using modern Clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopySuccess(copyButton);
                showNotification('Code copied to clipboard!', 'success');
            }).catch(() => {
                // Fallback to execCommand
                fallbackCopy(textToCopy, copyButton);
            });
        } else {
            // Fallback for older browsers
            fallbackCopy(textToCopy, copyButton);
        }
    }
}

function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        document.execCommand('copy');
        showCopySuccess(button);
        showNotification('Code copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy code', 'error');
    }
    
    document.body.removeChild(textarea);
}

function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = 'var(--primary-color)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}



// Modal functionality
function initModal() {
    const modal = document.getElementById('disclaimerModal');
    const checkbox = document.getElementById('disclaimerCheckbox');
    const acceptBtn = document.getElementById('acceptBtn');
    
    console.log('Initializing modal with elements:', { modal, checkbox, acceptBtn });
    
    // Handle checkbox change
    if (checkbox && acceptBtn) {
        checkbox.addEventListener('change', function() {
            acceptBtn.disabled = !this.checked;
            console.log('Checkbox changed, accept button disabled:', acceptBtn.disabled);
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeDisclaimerModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeDisclaimerModal();
        }
    });
    
    console.log('Modal initialized successfully');
}

function openDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    const checkbox = document.getElementById('disclaimerCheckbox');
    const acceptBtn = document.getElementById('acceptBtn');
    
    // Reset checkbox and button state
    checkbox.checked = false;
    acceptBtn.disabled = true;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Focus on checkbox for accessibility
    setTimeout(() => {
        if (checkbox) checkbox.focus();
    }, 100);
    
    console.log('Modal opened successfully');
}

function closeDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Return focus to the element that opened the modal
    const getStartedButton = document.querySelector('.cta-button.primary');
    if (getStartedButton) getStartedButton.focus();
    
    console.log('Modal closed successfully');
}

function acceptDisclaimer() {
    console.log('Accept disclaimer clicked');
    closeDisclaimerModal();
    showNotification('Disclaimer accepted! You can now proceed to use the tool.', 'success');
    
    // Ensure modal is completely closed and body scroll is restored
    setTimeout(() => {
        // Force restore body scroll
        document.body.style.overflow = '';
        
        console.log('Attempting to scroll to how-it-works section');
        
        // Check if modal is actually closed
        const modal = document.getElementById('disclaimerModal');
        console.log('Modal state after close:', modal.classList.contains('show'));
        
        const targetSection = document.querySelector('#how-it-works');
        console.log('Target section found:', targetSection);
        console.log('Target section position:', targetSection ? {
            offsetTop: targetSection.offsetTop,
            getBoundingClientRect: targetSection.getBoundingClientRect()
        } : 'Not found');
        
        if (targetSection) {
            // Try multiple scroll methods for better compatibility
            try {
                // Method 1: scrollIntoView with smooth behavior
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('Scrolled to how-it-works section using scrollIntoView');
            } catch (error) {
                console.log('scrollIntoView failed, trying alternative method');
                // Method 2: window.scrollTo as fallback
                const offsetTop = targetSection.offsetTop - 100; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                console.log('Scrolled to how-it-works section using window.scrollTo');
            }
            
            // Also update the active navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            const howItWorksLink = document.querySelector('[data-section="how-it-works"]');
            if (howItWorksLink) {
                howItWorksLink.classList.add('active');
                console.log('Updated navigation to active');
            }
        } else {
            console.error('How it works section not found');
        }
    }, 300);
}

// Keyboard navigation
function initKeyboardNavigation() {
    // Add keyboard support for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (this.tagName === 'BUTTON') {
                    this.click();
                } else if (this.tagName === 'A') {
                    this.click();
                }
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Utility function for throttling scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add loading state to copy button
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            this.style.pointerEvents = 'none';
            setTimeout(() => {
                this.style.pointerEvents = '';
            }, 2000);
        });
    }
});

// Performance optimization: Lazy load images and defer non-critical operations
window.addEventListener('load', function() {
    // Force all sections to be visible after page load
    forceSectionVisibility();
    
    // Additional visibility enforcement
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.display = 'block';
        section.style.transform = 'none';
    });
    
    // Add any post-load optimizations here
    console.log('Website fully loaded and optimized!');
});

// Add smooth reveal animation for sections
const revealSections = function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Force all sections to be visible
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.display = 'block';
        section.style.transform = 'none';
        section.style.minHeight = 'auto';
        section.style.position = 'relative';
        section.style.zIndex = '1';
        
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('animate-in');
            // Ensure visibility even after animation
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.transform = 'none';
        }
    });
};

// Initialize section reveal
document.addEventListener('DOMContentLoaded', function() {
    // Force all sections to be visible immediately
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.display = 'block';
    });
    
    // Trigger reveal on scroll
    window.addEventListener('scroll', throttle(revealSections, 100));
    
    // Initial reveal check
    revealSections();
});

// Mobile Navigation Functionality
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Debug logging
    console.log('Initializing mobile navigation...');
    console.log('Nav toggle element:', navToggle);
    console.log('Nav menu element:', navMenu);
    console.log('Nav links found:', navLinks.length);
    
    if (!navToggle || !navMenu) {
        console.error('Mobile navigation elements not found!');
        return;
    }
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked!');
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        console.log('Nav toggle active:', navToggle.classList.contains('active'));
        console.log('Nav menu active:', navMenu.classList.contains('active'));
        console.log('Body nav-open:', document.body.classList.contains('nav-open'));
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked, closing menu');
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Close mobile menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    console.log('Mobile navigation initialized successfully!');
}
