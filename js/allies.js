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

    // Modal Functionality
    const modal = document.getElementById('allyModal');
    const closeModal = document.getElementById('closeModal');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalDesc = document.getElementById('modalDesc');
    const modalSocials = document.getElementById('modalSocials');

    function openModal(card) {
        // Play sound if exists
        const soundSrc = card.getAttribute('data-sound');
        if (soundSrc) {
            const audio = new Audio(soundSrc);
            audio.volume = 0.5; // Set volume to something reasonable
            audio.play().catch(e => console.log('Audio play failed:', e));
        }

        // Get data from card
        const img = card.querySelector('.ally-avatar img').src;
        const name = card.querySelector('h3').textContent;
        const role = card.querySelector('.ally-role').textContent;
        const roleStyle = card.querySelector('.ally-role').getAttribute('style');
        const desc = card.querySelector('.ally-desc').textContent;
        const socials = card.querySelector('.ally-socials').innerHTML;

        // Populate modal
        modalAvatar.src = img;
        modalAvatar.alt = name;
        modalName.textContent = name;
        modalRole.textContent = role;
        modalRole.setAttribute('style', roleStyle);
        modalDesc.textContent = desc;
        
        // Transform social links styles for modal
        modalSocials.innerHTML = socials;
        const modalLinks = modalSocials.querySelectorAll('a');
        modalLinks.forEach(link => {
            // Keep original classes to maintain color/icon styles
            // Add modal specific class for size overrides
            link.classList.add('ally-modal-social-icon');
        });

        // Show modal
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeModalFunc() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.querySelectorAll('.ally-card').forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // Close on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Use e.target to ensure it's the overlay
                closeModalFunc();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
});