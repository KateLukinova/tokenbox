
$( document ).ready(function() {

    $('.video').parent().click(function () {
        if($(this).children(".video").get(0).paused) {
            $(this).children(".video").get(0).play();   $(this).children(".button-play").fadeOut();
        } else {
            $(this).children(".video").get(0).pause();
            $(this).children(".button-play").fadeIn();
        }
    });

    var $owl = $('.owl-carousel');

    $owl.children().each( function( index ) {
        $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
    });

    $owl.owlCarousel({
        center: true,
        loop: true,
        items: 1.6,
        autoplay:true,
        autoplayTimeout: 3000,
        smartSpeed: 1000
    });

    $(document).on('click', '.owl-item>div', function() {
        var $speed = 300;  // in ms
        $owl.trigger('to.owl.carousel', [$(this).data( 'position' ), $speed] );
    });
});
