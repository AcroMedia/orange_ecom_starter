/**
 * Featured Products.
 */
(function ($, Drupal) {

  Drupal.behaviors.featuredProducts = {
    attach: function (context, settings) {

      // Slider.
      if ($('.component-featured-products__slider').length) {
        $('.component-featured-products__slider').once().each(function () {
          $(this).slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: true,
            fade: false,
            swipe: false,
            accessibility: false,
            draggable: false,
            infinite: false,
            mobileFirst: false,
            responsive: [
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          });
        });
      }

    }
  };

})(jQuery, Drupal);
