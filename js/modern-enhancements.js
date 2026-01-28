// Modern Portfolio Enhancements

$(document).ready(function() {
    // Modern alert function
    function showAlert(type, message) {
        var alertHtml = '<div class="alert alert-' + type + '">' + message + '</div>';
        $('#success').html(alertHtml);
        
        setTimeout(function() {
            $('#success .alert').fadeOut(500);
        }, 5000);
    }
    
    // Auto-fill form when Hire Me is clicked
    $('.hire-me-btn').on('click', function(e) {
        setTimeout(function() {
            $('#subject').val('Hiring Inquiry - Web Development Services');
            $('#message').val('Hi Alice,\n\nI am interested in hiring you for web development services. Please let me know your availability and rates.\n\nBest regards,');
            $('#name').focus();
        }, 500);
    });
    
    // Enhanced contact form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();
        
        if (!name || !email || !subject || !message) {
            showAlert('danger', 'Please fill in all fields.');
            return;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('danger', 'Please enter a valid email address.');
            return;
        }
        
        // Show loading state with animation
        var $button = $('#sendMessageButton');
        $button.prop('disabled', true).html('<i class="fas fa-spinner fa-spin mr-2"></i>Sending...');
        showAlert('info', 'Sending your message...');
        
        // Submit form
        $.ajax({
            url: '/contact',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                showAlert('success', 'Message sent successfully! Thank you for contacting me.');
                $('#contactForm')[0].reset();
                $button.html('<i class="fas fa-check mr-2"></i>Sent!');
                setTimeout(function() {
                    $button.html('<i class="fas fa-envelope mr-2"></i>Send Message');
                }, 2000);
            },
            error: function(xhr) {
                var errorMsg = xhr.responseText || 'An error occurred. Please try again later.';
                showAlert('danger', errorMsg);
            },
            complete: function() {
                setTimeout(function() {
                    $button.prop('disabled', false);
                    if (!$button.html().includes('Sent!')) {
                        $button.html('<i class="fas fa-envelope mr-2"></i>Send Message');
                    }
                }, 1000);
            }
        });
    });
    
    // Enhanced smooth scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements for animation
        document.querySelectorAll('.service-item, .portfolio-item, .skill').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Enhanced Skills Progress Bar Animation
    if ('IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('aria-valuenow');
                        setTimeout(() => {
                            $(bar).animate({ width: width + '%' }, {
                                duration: 2000,
                                easing: 'swing'
                            });
                        }, 200);
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const skillSection = document.getElementById('skill');
        if (skillSection) {
            skillObserver.observe(skillSection);
        }
    }
    
    // Modern loading states for images
    $('img').on('load', function() {
        $(this).addClass('loaded');
    });
    
    // Add modern hover effects to portfolio items
    $('.portfolio-item').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );
});