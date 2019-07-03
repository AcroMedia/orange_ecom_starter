/**
 * Modal Block.
 */
(function ($, Drupal) {

  Drupal.behaviors.modalBlock = {
    attach: function (context, settings) {
      $('.modal-block').once('modalBlock').each(function(i, el) {
        // First modal only.
        // We don't want multiple modals to trigger on the page.
        if (i === 0) {
          var $this = $(this);
          var $modal = $this.find('.modal');
          var $modalID = $this.attr('id');
          var $modalCookieName = 'modal-' + $modalID;
          var $timeDelay = $this.data('time-delay');
          var $displayOnce = $this.data('display-once');

          // Trigger modal if cookie is not set.
          if (!$displayOnce || !Cookies.get($modalCookieName) && Cookies.get($modalCookieName) != 1) {
            // Check if timeDelay is an INT.
            if ($timeDelay && Math.floor($timeDelay) == $timeDelay && $.isNumeric($timeDelay))  {
              setTimeout(function () {
                // Trigger modal.
                $modal.modal();
              }, $timeDelay);
            }
            else {
              // Trigger modal.
              $modal.modal();
            }
          }

          // Set cookie if modal is set to be displayed once.
          if ($displayOnce) {
            Cookies.set($modalCookieName, 1);
          }
        }
      });
    }
  };

})(jQuery, Drupal);
