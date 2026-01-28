// UI/UX Projects Carousel Functionality

$(document).ready(function() {
    let currentSlide = 0;
    const totalSlides = $('.uiux-slide').length;
    let autoPlayInterval;
    
    // Initialize carousel
    function initCarousel() {
        showSlide(0);
        startAutoPlay();
    }
    
    // Show specific slide
    function showSlide(index) {
        $('.uiux-slide').removeClass('active');
        $('.dot').removeClass('active');
        
        $('.uiux-slide').eq(index).addClass('active');
        $('.dot').eq(index).addClass('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Auto play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    $('#nextBtn').on('click', function() {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    $('#prevBtn').on('click', function() {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    // Dot navigation
    $('.dot').on('click', function() {
        stopAutoPlay();
        const slideIndex = $(this).data('slide');
        showSlide(slideIndex);
        startAutoPlay();
    });
    
    // Pause on hover
    $('.uiux-carousel-container').hover(
        function() {
            stopAutoPlay();
        },
        function() {
            startAutoPlay();
        }
    );
    
    // Keyboard navigation
    $(document).on('keydown', function(e) {
        if ($('.uiux-carousel-container:hover').length > 0) {
            if (e.key === 'ArrowLeft') {
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            }
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    $('.uiux-carousel').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    
    $('.uiux-carousel').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            stopAutoPlay();
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
            startAutoPlay();
        }
    }
    
    // Initialize when page loads
    if ($('.uiux-carousel').length > 0) {
        initCarousel();
    }
});