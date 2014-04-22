    $(document).ready(function() {

      $('a[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var $target = $(this.hash);
          $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
          if ($target.length) {
            var targetOffset = $target.offset().top - 65;
            $('html,body').animate({
                scrollTop: targetOffset
              },
              500);
            return false;
          }
        }
      });
    }, 500);
     //返回顶部
    function b2top(id, n, playing) {
      if (n <= 10 && n >= 0) {
        var h = 150;
        var offsetHeight = h * n;
        $(id).css({
          backgroundPosition: '0 -' + offsetHeight + 'px'
        });
        n = playing ? n + 1 : n - 1;
        setTimeout("b2top('" + id + "'," + n + "," + playing + ")", 50);
      }
    };
    $(document).ready(function() {
      //锚链点击滚动效果
      $('body').append('<div id="b2t" title="返回顶部"></div>');
      $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
          $('#b2t').fadeIn()
        } else {
          $('#b2t').fadeOut()
        }
      });
      $('#b2t').hover(function() {
        b2top('#b2t', 0, true)
      }, function() {
        b2top('#b2t', 3)
      }).click(function() {
        $('body,html').animate({
          scrollTop: 0
        }, 400, function() {});
        b2top('#b2t', 3)
      });
      //隐藏表情
      $('input,textarea').focus(function() {
        $('span#ssface').hide()
      })
    });
    $(".blog-sidebar").pin({
      containerSelector: ".pin",
      minWidth: 768,
      padding: {
        top: 70
      }
    });