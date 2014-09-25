jQuery(function ($) {
    $(document).ready(function () {
        NProgress.start();
        NProgress.configure({ showSpinner: false });
        setTimeout(function () {
            NProgress.done();
            $('.fade').removeClass('out');
        },
        2000);
    });
    // Search button
    $('#btn-search').on('click', function (e) {
        e.preventDefault();
        $('#search').animate({ width: 'toggle' }).focus();

    });
});
// Main nav
var ddmenuitem = 0;
function jsddm_open() {
    jsddm_close();
    ddmenuitem = $(this).find('ul.submenu').css('display', 'block');
}
function jsddm_close() {
    $('#topnav > ul > li').find('ul.submenu').css('display', 'none');
    if (ddmenuitem) {
        ddmenuitem.css('display', 'none');
    }
}
$(document).ready(function () {
    $('#topnav > ul > li.active').find('ul.submenu').css('display', 'block');
    $('#topnav > ul > li').bind('click', jsddm_open);
    $('#topnav > ul > li').click(function () {
        if ($(this).attr('class') != 'active') {
            $('#topnav ul li').removeClass('active');
            $(this).addClass('active');
        }
    });
});
// Scroll to top
$(function () {
    $(function () {
        $('body').append('<div class="scrollup"><a href="javascript:;" title="Scroll to top"></a></div>');
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 50) {
                $('.scrollup').fadeIn(300);
            } else {
                $('.scrollup').fadeOut(300);
            }
        });
        $('.scrollup').click(function () {
            $('html,body').animate({ scrollTop: '0px' }, 800);
        });
    });
});
// Sidebar
$(function () {
    var s = 0;
    $('.arrow-box').click(function () {
        if (s == 0) {
            s = 1;
            $('#sidebar').css('left', '-220px');
            $('.dashboard-wrapper').css('margin-left', '0px');
            $('.logo').css('background', 'transparent');
        } else {
            s = 0;
            $('#sidebar').css('left', '0');
            $('.dashboard-wrapper').css('margin-left', '220px');
            $('.logo').css('background', '');
        }
    });
});
// Collapse
$(function () {
    $('#mob-nav').click(function () {
        $('#topnav ul li').css('float', 'none');
    });
});


// Content-menu
$('.list-group-item').on('click', function () {
    $('.list-group-item').removeClass('active');
    $(this).addClass('active');
    $('.borderActive').removeClass('borderActive');
    var currentItem = $(this).attr('href');
    $(currentItem).addClass('borderActive');
});

// Lanchpad
$(function () {
    $('.icon').each(function () {
        var title = $(this).children('img').attr('title');
        $(this).children('span').html(title);
    });
    var launchPad = $("#launchpad");
    function zoom() {
        $(launchPad).css({
            "-ms-transform": scale, "-webkit-transform": scale,
            "-moz-transform": scale, "-o-transform": scale
        });
    };
    $(document).keydown(function (event) {
        if ($(launchPad).hasClass('hide') && event.keyCode == 27) {
            $('body').append('<div class="blur"></div>');
            scale = "scale(1)";
            zoom();
            $(launchPad).fadeTo(300, 1).removeClass('hide');
        }
        else {
            $(".blur").remove();
            scale = "scale(0.9)";
            zoom();
            $(launchPad).fadeTo(100, 0).addClass('hide');
        }
    });
    $('body').on("click", ".blur", function () {
        hide();
    });
    $(launchPad).click(function () {
        hide();
    });
    $(".open-lauch").click(function () {
        $('body').append('<div class="blur"></div>');
        scale = "scale(1)";
        zoom();
        $(launchPad).fadeTo(300, 1).removeClass('hide');
    });
    function hide() {
        $(".blur").fadeOut(300, function() {
            $(".blur").remove();
        });
        scale = "scale(0.9)";
        zoom();
        $(launchPad).fadeTo(100, 0).addClass('hide');
    }
});
//dashboard communication
$(function () {
    var myTimeout;
    $('.comment').mouseenter(function () {
        var comment_footer = $(this).find('.comment-footer');
        myTimeout = setTimeout(function () {
            comment_footer.slideDown();
        }, 200);
    }).mouseleave(function () {
        clearTimeout(myTimeout);
        $(this).find('.comment-footer').slideUp();
    });
});