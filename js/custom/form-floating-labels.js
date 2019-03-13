/**
 * Form Floating Labels.
 */
(function ($, Drupal) {

  Drupal.behaviors.formFloatingLabels = {
    attach: function (context, settings) {

      $('.form-item--floater').once('formFloatingLabels').each(function () {
        var $this = $(this);
        var $element = $this.find('.form-control');
        var $placeholder = $element.attr('placeholder');

        // Set the element active if it has a value.
        if ($element.is('select') && $element.find('option:selected')) {
          $this.addClass('is-active');
        }
        else if ($element.val()) {
          $this.addClass('is-active');
        }
        else {
          var autofilled = false;

          // Check elements for browser autofill.
          function checkAutofill () {
            try {
              autofilled = $element.is(":autofill");

            }
            catch (error) {
              try {
                autofilled = $element.is(":-webkit-autofill");

              }
              catch (error) { }
            }
            if (autofilled) {
              $this.addClass('is-active');
            }
          }

          checkAutofill ();
          setTimeout (checkAutofill, 600);
        }

        // Remove placeholder initially.
        $element.attr('placeholder', '');

        // Focus.
        $element.on('focus', function () {
          $this.addClass('is-active');
          $element.attr('placeholder', $placeholder);
        });

        // Blur.
        $element.on('blur', function () {
          if (!$element.is('select')) {
            if (!$element.val()) {
              $this.removeClass('is-active');
            }
            $element.attr('placeholder', '');
          }
        });
      });

    }
  };

})(jQuery, Drupal);
