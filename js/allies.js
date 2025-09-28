// Script for Allies Section Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get the allies grid and arrows
    const alliesGrid = document.querySelector('.allies-grid');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');

    // Function to scroll the allies grid
    function scrollGrid(direction) {
        // Calculate scroll amount (based on card width + gap)
        const cardWidth = 300; // Width of an ally card
        const gap = 25; // Gap between cards
        const scrollAmount = cardWidth + gap;
        
        // Scroll smoothly
        if (direction === 'left') {
            alliesGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            alliesGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    // Add click event listeners to arrows
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            scrollGrid('left');
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            scrollGrid('right');
        });
    }

    // Animate cards on scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5 // When 50% of the element is visible
    });

    // Observe each ally card
    document.querySelectorAll('.ally-card').forEach((card) => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Add class to make scroll indicator visible on small screens
    function updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            if (alliesGrid.scrollWidth > alliesGrid.clientWidth) {
                scrollIndicator.classList.add('show-indicator');
            } else {
                scrollIndicator.classList.remove('show-indicator');
            }
        }
    }

    // Update scroll indicator visibility on load and resize
    updateScrollIndicator();
    window.addEventListener('resize', updateScrollIndicator);
});