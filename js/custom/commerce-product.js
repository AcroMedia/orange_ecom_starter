/**
 * Commerce Product.
 */
(function ($, Drupal) {

  // Product Slider.
  if ($('.product-slider__main-slider').length) {
    $('.product-slider__main-slider').slick({
      asNavFor: '.product-slider__nav-slider',
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      swipe: false,
      accessibility: false,
      draggable: false,
      infinite: false
    });
    $('.product-slider__nav-slider').slick({
      asNavFor: '.product-slider__main-slider',
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      focusOnSelect: true,
      centerMode: false,
      infinite: false
    });
  }

  // Tabs.
  $('#product-tabs').tabCollapse();

  // Product Reviews - Add Review Button.
  $('#b-add-product-review').click(function (e) {
    $(this).toggleClass('is-active').parents('.product__reviews').find('.comment-form-wrapper').fadeToggle('fast');
    e.preventDefault();
  });

  // Product Slider Ajax.
  Drupal.behaviors.productSlider = {
    attach: function (context, settings) {
      // Commerce add to cart form.
      $('form.commerce-order-item-add-to-cart-form', context).once().each(function () {
        // Grab the current product variation ID.
        var $current_product_variation_id = $(this).data('product-variation-id');

        if ($('.product-slider__main-slider').length) {
          var $nav_item = $('.product-slider__nav-slider__item[data-product-variation-id="' + $current_product_variation_id +'"]').parent();
          var $item_position = $('.product-slider__nav-slider .slick-slide').index($nav_item);

          // Trigger Slick to go to current variation image.
          $('.product-slider__nav-slider').slick('slickGoTo', $item_position);
        }
      });
    }
  };

})(jQuery, Drupal);
