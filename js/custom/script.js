/**
 * Custom scripts.
 */
(function ($, Drupal) {
  // External links.
  $("a[href^='http']").each(function() {
    var re_matches = /https?:\/\/([^\/]*)/.exec($(this).attr('href'));
    // Check link against the current domain.
    if(re_matches && re_matches[1] && re_matches[1] != location.hostname && re_matches[1] != 'www.'+location.hostname && 'www.'+re_matches[1] != location.hostname) {
      $(this).attr('target', '_blank');
    }
  });

  // Mobile Toggle.
  // Toggle active classes for a piece of content.
  $('.js-mobile-toggle').click(function (e) {
    var $this = $(this);
    var $toggleContent = $this.data('toggle-content');

    $this.toggleClass('is-active');
    $('.' + $toggleContent).toggleClass('is-active');

    e.preventDefault();
  });

  // Mobile Overlay.
  $('.mobile-overlay').click(function(e) {
    $(this).fadeOut('fast');
    $('.mobile-search-form input.form-search').blur();
  });
  $('.mobile-overlay__content').click(function(e) {
    e.stopPropagation();
  });

  // Mobile Search.
  $('.mobile-control-nav .menu__item--search a').click(function(e) {
    $('.mobile-search-overlay').fadeIn('fast');
    $('.mobile-search-form .form-item-search input').focus();
    e.preventDefault();
  });
  $('.mobile-search-form__submit').click(function(e) {
    $('.mobile-search-form form').submit();
    e.preventDefault();
  });

  // Mobile Navigation.
  $('.mobile-control-nav .menu__item--menu a').click(function(e) {
    $('.mobile-nav-overlay').fadeIn('fast');
    e.preventDefault();
  });
  $('.mobile-overlay__close').click(function(e) {
    $('.mobile-overlay').fadeOut('fast');
    $('.mobile-search-form input.form-search').blur();
    e.preventDefault();
  });

  // Mobile Navigation - Clone expandable parent into sub-menu.
  $('.mobile-nav nav > ul > li.menu__item--expanded > a').each(function() {
    var $this = $(this);
    var $thisClone = $(this).clone();
    // Change the link text so there's not duplicate links beside each other.
    $thisClone.html(Drupal.t('Overview'));

    $thisClone.wrap('<li class="menu__item menu__item--parent-overview"></li>').parent().prependTo($this.next('ul'));
  });

  // Mobile Navigation - Click on parents to expand.
  $('.mobile-nav nav > ul > li.menu__item--expanded > a').click(function(e) {
    var $this = $(this);
    var $nextMenu = $this.next('ul');

    // Toggle slide animation for sub-menus.
    $nextMenu.slideToggle('fast');
    $('.mobile-nav nav > ul > li.menu__item--expanded > a').next('ul').not($nextMenu).slideUp('fast');

    e.preventDefault();
  });

  // Add search input placeholder.
  $('.block-search input.form-search, .search-page-form input.form-search').attr('placeholder', Drupal.t('Enter keyword...'));

  // Add Commerce search input placeholder.
  $('.region-site-search .form-item-search input').attr('placeholder', Drupal.t('Search for products...'));

  // Site search submit trigger.
  if ($('.form-search-submit-trigger').length) {
    $('.form-search-submit-trigger').click(function(e) {
      // Submit the parent form.
      $(this).parents('form').submit();
      e.preventDefault();
    });
  }

  // Form submit trigger.
  if ($('.form-submit--trigger').length) {
    $('.form-submit--trigger').click(function(e) {
      // Submit the parent form.
      $(this).parents('form').submit();
      e.preventDefault();
    });
  }

  // Magnific Popup Gallery.
  if ($('.magnific-popup-gallery').length) {
    $('.magnific-popup-gallery').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }

  // Store.
  // Add store exposed search placeholder.
  $('.view-store .views-exposed-form .form-text').attr('placeholder', Drupal.t('Search for a product'));

  $('.b-store-mobile-facets-toggle').click(function (e) {
    $(this).toggleClass('is-active').parent().find('.store-facets--mobile').fadeToggle('fast');
    e.preventDefault();
  });

  // Tabs.
  if ($('.nav-tabs').length) {
    $('.nav-tabs').each(function () {
      $(this).tabCollapse();
    });
  }

  // Scroll To Top Button.
  var $scrollToTopButton = $('.b-page-scroll-to-top');

  $(window).scroll(function () {
    var $windowHeight = $(window).scrollTop();

    if ($windowHeight > 300) {
      $scrollToTopButton.addClass('is-active');
    }
    else {
      $scrollToTopButton.removeClass('is-active');
    }
  });

  $scrollToTopButton.click(function (e) {
    $('html, body').animate({ scrollTop: 0 }, 360);
    e.preventDefault();
  });

})(jQuery, Drupal);
