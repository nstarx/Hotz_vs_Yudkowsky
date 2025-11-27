// AI Debate Website - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations on scroll
    initScrollAnimations();

    // Initialize timeline interactions
    initTimelineInteractions();

    // Initialize smooth scroll for internal links
    initSmoothScroll();
});

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe timeline blocks
    document.querySelectorAll('.timeline-block').forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
        block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(block);
    });

    // Observe theme cards
    document.querySelectorAll('.theme-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe disagreement cards
    document.querySelectorAll('.disagreement-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .timeline-block.expanded .timeline-content {
        box-shadow: 0 10px 40px rgba(139, 92, 246, 0.2);
    }

    .timeline-block .timeline-content {
        cursor: pointer;
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .timeline-block .timeline-content:hover {
        transform: translateX(5px);
    }
`;
document.head.appendChild(style);

// Timeline interactions
function initTimelineInteractions() {
    const timelineBlocks = document.querySelectorAll('.timeline-block');

    timelineBlocks.forEach(block => {
        const content = block.querySelector('.timeline-content');

        content.addEventListener('click', function() {
            // Toggle expanded state
            block.classList.toggle('expanded');

            // Optional: scroll to center the block
            if (block.classList.contains('expanded')) {
                setTimeout(() => {
                    block.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// Progress indicator (optional enhancement)
function createProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'progress-indicator';
    indicator.innerHTML = `
        <div class="progress-bar"></div>
    `;
    document.body.appendChild(indicator);

    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        #progress-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 1000;
        }

        #progress-indicator .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #f97316);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyle);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        document.querySelector('#progress-indicator .progress-bar').style.width = progress + '%';
    });
}

// Initialize progress indicator
createProgressIndicator();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const timelineBlocks = document.querySelectorAll('.timeline-block');
    const currentExpanded = document.querySelector('.timeline-block.expanded');

    if (e.key === 'Escape' && currentExpanded) {
        currentExpanded.classList.remove('expanded');
    }

    if (e.key === 'ArrowDown' && currentExpanded) {
        e.preventDefault();
        const currentIndex = Array.from(timelineBlocks).indexOf(currentExpanded);
        if (currentIndex < timelineBlocks.length - 1) {
            currentExpanded.classList.remove('expanded');
            timelineBlocks[currentIndex + 1].classList.add('expanded');
            timelineBlocks[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    if (e.key === 'ArrowUp' && currentExpanded) {
        e.preventDefault();
        const currentIndex = Array.from(timelineBlocks).indexOf(currentExpanded);
        if (currentIndex > 0) {
            currentExpanded.classList.remove('expanded');
            timelineBlocks[currentIndex - 1].classList.add('expanded');
            timelineBlocks[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Console easter egg
console.log('%c🤖 AI Safety Debate', 'font-size: 24px; font-weight: bold;');
console.log('%cGeorge Hotz vs Eliezer Yudkowsky', 'font-size: 16px; color: #8b5cf6;');
console.log('%c"Timing matters!" - George Hotz', 'font-style: italic; color: #3b82f6;');
console.log('%c"The endpoint is predictable, the path is not." - Eliezer Yudkowsky', 'font-style: italic; color: #f97316;');
