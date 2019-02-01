/**
 * Search Toggle.
 */
(function ($, Drupal) {

  $('.js-search-toggle').each(function () {
    var $this = $(this);
    var $toggleLink = $this.children('li').children('a');
    var $dropdown = $this.children('li').children('ul');
    var $dropdownLinks = $this.children('li').children('ul').find('a');
    var $searchForms = $this.next('.js-search-toggle-forms');
    var $activeSearchTitle = $this.children('li').children('ul').find('li.active > a').html();

    $toggleLink.click(function (e) {
      e.preventDefault();
    });

    // Check for cookie and if it's an integer.
    var searchCookie = Cookies.get('active_site_search');
    if ((searchCookie) && (Math.floor(searchCookie) == searchCookie && $.isNumeric(searchCookie))) {
      // Set active class.
      $dropdown.children('li').removeClass('active').eq(searchCookie).addClass('active');

      // Set active search form block from cookie index.
      var $activeSearchTitle = $this.children('li').children('ul').find('li.active > a').html();
      $toggleLink.html($activeSearchTitle);
      $searchForms.children('.region').find('.block').hide().eq(searchCookie).show();
    }

    // Dropdown link on click.
    $dropdownLinks.click(function (e) {
      // Set active class.
      $dropdownLinks.parent('li').removeClass('active');
      $(this).parent('li').addClass('active');

      // Hide dropdown if it's visible on click.
      if ($this.children('li').children('ul').is(':visible')) {
        $this.children('li').children('ul').css('display', 'none');

        // Remove display style so user can properly access menu again on hover.
        setTimeout(function () {
          $this.children('li').children('ul').css('display', '');
        }, 100);
      }

      // Set active search form block.
      var $activeSearchItemIndex = $this.children('li').children('ul').find('li.active').index();
      var $activeSearchTitle = $this.children('li').children('ul').find('li.active > a').html();
      $toggleLink.html($activeSearchTitle);
      $searchForms.children('.region').find('.block').hide().eq($activeSearchItemIndex).show();

      // Set cookie so we can keep track of the last selected search.
      Cookies.set('active_site_search', $activeSearchItemIndex);

      e.preventDefault();
    });
  });

})(jQuery, Drupal);
