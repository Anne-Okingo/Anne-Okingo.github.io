document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Scroll Animation Logic
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('fade-in-hidden'); // Remove hidden class
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.fade-in, .service-item, .portfolio-item, .skill-card, .blog-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-hidden'); // Add initial hidden state
        observer.observe(el);
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('#portfolio-flters li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('visible');
                        item.classList.remove('fade-in-hidden');
                    }, 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                }
            });
        });
    });
    // Skills Accordion Logic
    const categoryHeaders = document.querySelectorAll('.category-header');

    // Initially hide all except the first one (or whatever logic user prefers, here we default expand Languages in HTML so we just handle toggles)
    const allRows = document.querySelectorAll('.skill-row');
    allRows.forEach(row => {
        if (!row.classList.contains('languages-row')) {
            row.style.display = 'none';
        }
    });

    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const targetClass = header.getAttribute('data-target');
            const targetRows = document.querySelectorAll('.' + targetClass);
            const isExpanded = header.classList.contains('expanded');
            const icon = header.querySelector('.transition-icon');

            // Toggle current
            if (isExpanded) {
                targetRows.forEach(row => {
                    row.style.display = 'none';
                    row.classList.remove('fade-in'); // Reset animation
                });
                header.classList.remove('expanded');
                if (icon) icon.className = "fas fa-chevron-right transition-icon";
            } else {
                targetRows.forEach(row => {
                    row.style.display = 'table-row';
                    // Small timeout to allow display:block to apply before opacity transition if we had one, 
                    // but for table rows simple display toggle is often safer. 
                    // We can add a class for animation.
                    setTimeout(() => row.classList.add('fade-in'), 10);
                });
                header.classList.add('expanded');
                if (icon) icon.className = "fas fa-chevron-down transition-icon";
            }
        });
    });
});
