//загрузка сверху страницы
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

$( document ).ready(function() {

    $('.video').parent().click(function () {
        if($(this).children(".video").get(0).paused) {
            $(this).children(".video").get(0).play();   $(this).children(".button-play").fadeOut();
        } else {
            $(this).children(".video").get(0).pause();
            $(this).children(".button-play").fadeIn();
        }
    });

    $('.slick-slider').slick({
        centerMode: true,
        slidesToShow: 1,
        dots: false,
        arrows: false,
        swipe: true,
        swipeToSlide: true,
        adaptiveHeight: true,
        loop: true,
        infinite: true,
        centerPadding: '120px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '40px',
                }
            }
        ]
    });

});
