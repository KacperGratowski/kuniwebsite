/**
 * Kod JavaScript dla obsługi funkcjonalności mobilnej
 */
document.addEventListener('DOMContentLoaded', function() {
    // Funkcja wykrywająca urządzenie mobilne
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0);
    }
    
    // Dodanie klasy do body dla urządzeń mobilnych
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
    }

    // Dodajemy obsługę dotykową dla sekcji Kwami
    const kwamis = document.querySelectorAll('.kwami');
    kwamis.forEach(kwami => {
        kwami.addEventListener('touchstart', function() {
            // Dodajemy efekt wizualny przy dotknięciu na urządzeniach mobilnych
            this.classList.add('kwami-touch');
            setTimeout(() => {
                this.classList.remove('kwami-touch');
            }, 300);
        });
    });

    // Dodaj klasę 'active' do aktualnie widocznej sekcji dla lepszej nawigacji
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        // Znajdź aktualnie widoczną sekcję
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Aktualizuj aktywną klasę w nawigacji
        document.querySelectorAll('.kwami').forEach(kwami => {
            kwami.classList.remove('active');
            if (kwami.getAttribute('data-section') === currentSection) {
                kwami.classList.add('active');
            }
        });
    }

    // Nasłuchuj zdarzenia przewijania
    window.addEventListener('scroll', highlightActiveSection);
    
    // Sprawdzaj aktywną sekcję również przy załadowaniu
    highlightActiveSection();
    
    // Pełne wsparcie dla przewijania poziomego w sekcji sojuszników
    const alliesGrid = document.querySelector('.allies-grid');
    const scrollHint = document.querySelector('.allies-section .scroll-hint');
    
    if (alliesGrid && scrollHint && isMobileDevice()) {
        // Dodaj indicator przewijania jeśli zawartość jest szersza niż kontener
        if (alliesGrid.scrollWidth > alliesGrid.clientWidth) {
            alliesGrid.classList.add('scrollable');
            scrollHint.style.display = 'block';
        } else {
            scrollHint.style.display = 'none';
        }
        
        // Usuń wskaźnik przewijania po pierwszym przewinięciu
        let hasScrolled = false;
        alliesGrid.addEventListener('scroll', function() {
            if (!hasScrolled) {
                hasScrolled = true;
                scrollHint.classList.add('hide');
                setTimeout(() => {
                    scrollHint.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Dodajemy obsługę zdarzenia zmiany rozmiaru okna
    window.addEventListener('resize', function() {
        // Zaktualizuj klasę mobile-device
        if (isMobileDevice()) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
        
        // Ponownie sprawdź aktywną sekcję
        highlightActiveSection();
    });
});