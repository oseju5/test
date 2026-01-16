document.addEventListener('DOMContentLoaded', () => {

    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = sidebar.querySelectorAll('a');
    const sections = document.querySelectorAll('main section');

    // --- Mobile Menu Toggle ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close sidebar when a link is clicked (for mobile view)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });


    // --- Active Link Highlighting on Scroll ---
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Get the id of the intersecting section
                const id = entry.target.getAttribute('id');
                // Find the corresponding link and add active class
                const activeLink = document.querySelector(`#sidebar a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
    
    
    // --- Initial Header Glitch Effect on Load ---
    const header = document.querySelector('.main-header h1');
    if (header) {
        const originalText = header.getAttribute('data-text');
        let currentText = '';
        let i = 0;
        
        const typeEffect = () => {
            if (i < originalText.length) {
                currentText += originalText.charAt(i);
                header.textContent = currentText;
                i++;
                setTimeout(typeEffect, 50); // Adjust typing speed here
            } else {
                // Once finished typing, restore data-text to enable CSS glitch effect
                header.setAttribute('data-text', header.textContent);
            }
        };
        
        // Start effect after a short delay
        setTimeout(typeEffect, 500);
    }

});
