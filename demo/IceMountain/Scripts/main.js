  $(document).ready(function() {
    if(navigator.userAgent.indexOf('Mac') > 0){$('body').addClass('mac-os');}
      /*
    # =============================================================================
    #   Navbar scroll animation
    # =============================================================================
    */
      $(".navbar.scroll-hide").mouseover(function() {
          $(".navbar.scroll-hide").removeClass("closed");
          return setTimeout((function() {
              return $(".navbar.scroll-hide").css({
                  overflow: "visible"
              });
          }), 150);
      });
      $(function() {
          var delta, lastScrollTop;
          lastScrollTop = 0;
          delta = 50;
          return $(window).scroll(function(event) {
              var st;
              st = $(this).scrollTop();
              if (Math.abs(lastScrollTop - st) <= delta) {
                  return;
              }
              if (st > lastScrollTop) {
                  $('.navbar.scroll-hide').addClass("closed");
              } else {
                  $('.navbar.scroll-hide').removeClass("closed");
              }
              return lastScrollTop = st;
          });
      });
      /*
    # =============================================================================
    #   Auto Close Popover
    # =============================================================================
    */
      $('[data-toggle="popover"]').popover();

      $('body').on('click', function(e) {
          $('[data-toggle="popover"]').each(function() {
              //the 'is' for buttons that trigger popups
              //the 'has' for icons within a button that triggers a popup
              if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                  $(this).popover('hide');
              }
          });
      });
      /*
    # =============================================================================
    #   Mobile Nav
    # =============================================================================
    */

      $('.navbar-toggle').click(function() {
          return $('body, html').toggleClass("nav-open");
      });
      $.fn.extend({
          fixedNavbar: function() {
              if ($(window).width() < 767) {
                  var docHeight = $(window).height();
                  $(".main-nav").css("height", docHeight);
              } else {
                  $(".main-nav").css("height", "auto");
              }
          }
      });
      $(window).fixedNavbar();
      $(window).resize(function() {
          $(this).fixedNavbar();
      });
/*
    # =============================================================================
    #   Chat
    # =============================================================================
    */
    $('textarea').focus(function(event) {
          $(this).height(46);
    });
    $('textarea').blur(function(event) {
          $(this).height(16);
    });

    $('#test').resize(function() {
      var chat = $('#chatNeed').height();
      $('.chat').height(chat - 52);
    });
      $('.widget-content').scrollTop( $('.widget-content')[0].scrollHeight );
  });
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);