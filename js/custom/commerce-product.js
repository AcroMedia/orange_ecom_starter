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

  // Product Attributes.
  // Alter display for single value attributes.
  Drupal.behaviors.productAttributesSingleValue = {
    attach: function (context, settings) {
      $('.product__form .attribute-widgets > .form-item, .commerce-order-item-add-to-cart-form .attribute-widgets > .form-item').once().each(function () {
        var $this = $(this);

        // Select attributes.
        if ($this.find('select').length) {
          var $selectOptions = $this.find('select option').length;

          if ($selectOptions == 1) {
            var $selectedOptionText = $this.find('select option:selected').text();
            $this.addClass('js-form-item--attribute-single-value');
            $this.append('<div class="purchased-entity-attribute__single-value">' + $selectedOptionText + '</div>');
          }
        }
        // Radio attributes.
        if ($this.find('input:radio').length) {
          var $radios = $this.find('input:radio').length;

          if ($radios == 1) {
            var $radioText = $this.find('input:radio:checked').next('label').text();
            $this.addClass('js-form-item--attribute-single-value');
            $this.append('<div class="purchased-entity-attribute__single-value">' + $radioText + '</div>');
          }
        }
      });
    }
  };

})(jQuery, Drupal);
