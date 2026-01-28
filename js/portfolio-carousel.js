$(document).ready(function () {
    let currentSlide = 0;
    let autoPlayInterval;
    let slides = [];

    function buildCarousel(filter = '*') {
        clearInterval(autoPlayInterval);

        let $items = filter === '*'
            ? $('.portfolio-item')
            : $('.portfolio-item' + filter);

        if ($items.length === 0) return;

        slides = [];

        $items.each(function () {
            slides.push($(this).clone());
        });

        const $carousel = $(`
            <div class="uiux-carousel-container position-relative">
                <div class="uiux-carousel"></div>

                <button class="carousel-nav prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-nav next">
                    <i class="fas fa-chevron-right"></i>
                </button>

                <div class="carousel-dots text-center mt-4"></div>
            </div>
        `);

        slides.forEach((slide, i) => {
            const $slide = $(`
                <div class="uiux-slide ${i === 0 ? 'active' : ''}">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-10">
                        </div>
                    </div>
                </div>
            `);

            $slide.find('.col-lg-8').append(slide);
            $carousel.find('.uiux-carousel').append($slide);
            $carousel.find('.carousel-dots')
                .append(`<span class="dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></span>`);
        });

        $('.portfolio-carousel-mount').html($carousel);
        attachEvents();
        startAutoPlay();
    }

    function showSlide(index) {
        $('.uiux-slide').removeClass('active').eq(index).addClass('active');
        $('.dot').removeClass('active').eq(index).addClass('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function attachEvents() {
        $('.next').on('click', () => {
            clearInterval(autoPlayInterval);
            nextSlide();
            startAutoPlay();
        });

        $('.prev').on('click', () => {
            clearInterval(autoPlayInterval);
            prevSlide();
            startAutoPlay();
        });

        $('.dot').on('click', function () {
            clearInterval(autoPlayInterval);
            showSlide($(this).data('slide'));
            startAutoPlay();
        });
    }

    $('#portfolio-flters li').on('click', function () {
        $('#portfolio-flters li').removeClass('active');
        $(this).addClass('active');
        buildCarousel($(this).data('filter'));
    });

    // Init
    buildCarousel('*');
});
