/**
 * Notice Strap.
 */
(function ($, Drupal) {

  Drupal.behaviors.noticeStrap = {
    attach: function (context, settings) {
      // Loop through each strap that has close enabled.
      $('.component-notice-strap--close').once('noticeStrap').each(function () {
        var $this = $(this);
        var $componentID = $this.data('component-id');
        var cookieName = 'notice_strap_' + $componentID;

        // Add show class to initially display strap.
        $this.addClass('component-notice-strap--show');

        // Check for cookie value and apply hide class.
        if (Cookies.get(cookieName) && Cookies.get(cookieName) == $componentID) {
          $this.addClass('component-notice-strap--hide');
        }
      });

      // Close button.
      $('.component-notice-strap__close').once('noticeStrap').click(function (e) {
        var $component = $(this).parents('.component-notice-strap');
        var $componentID = $component.data('component-id');
        var cookieName = 'notice_strap_' + $componentID;

        // Set cookie.
        Cookies.set(cookieName, $componentID);
        $component.addClass('component-notice-strap--hide');
        e.preventDefault();
      });
    }
  };

})(jQuery, Drupal);
