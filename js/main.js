(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills

    // Skills Progress Bar Animation
    $(document).ready(function () {
        // Ensure the progress bars fill when the page loads
        $('.progress-bar').each(function () {
            const width = $(this).attr('aria-valuenow');
            $(this).css('width', width + '%');
        });

        // Trigger progress bar animation on scroll
        $(window).scroll(function() {
            var skillSection = $('#skill');
            if (skillSection.length) {
                var skillTop = skillSection.offset().top;
                var skillHeight = skillSection.outerHeight();
                var windowTop = $(window).scrollTop();
                var windowHeight = $(window).height();
                
                if (windowTop + windowHeight > skillTop + skillHeight * 0.2) {
                    $('.progress-bar').each(function () {
                        if (!$(this).hasClass('animated')) {
                            const width = $(this).attr('aria-valuenow');
                            $(this).animate({ width: width + '%' }, 1500);
                            $(this).addClass('animated');
                        }
                    });
                }
            }
        });
    });
    
    


    // Portfolio filter (simplified without isotope)
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');
        
        var filterValue = $(this).data('filter');
        if (filterValue === '*') {
            $('.portfolio-item').show();
        } else {
            $('.portfolio-item').hide();
            $(filterValue).show();
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

