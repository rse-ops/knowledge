---
exclude_in_search: true
layout: null
---
(function($) {
    'use strict';
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        $('.popover-dismiss').popover({
            trigger: 'focus'
        })

        $("#hide-sidebar").click(function(){
           $("#sidebar").hide();
           $("#show-sidebar").show();
           $("#main-content").removeClass("col-md-9 col-xl-8")
           $("#main-content").addClass("col-md-10 col-xl-9")
        }) 
        $("#show-sidebar").click(function(){
           $("#main-content").removeClass("col-md-10 col-xl-9")
           $("#main-content").addClass("col-md-9 col-xl-8")
           $("#show-sidebar").hide();
           $("#sidebar").show();
        }) 

        // Expand sidebar
        $(".sidebar-link").click(function(event){
            console.log($(this))
            if (!$(this).hasClass("show")) {
              event.preventDefault();
              var data_id = $(this).attr("data-id");
              if ($("." + data_id).hasClass("show")) {
                $("." + data_id).removeClass("show");
                $("." + data_id + "-chevron").removeClass("fa-chevron-down");
                $("." + data_id + "-chevron").addClass("fa-chevron-right");                        
              } else {
                $("." + data_id).addClass("show");
                $("." + data_id + "-chevron").removeClass("fa-chevron-right");
                $("." + data_id + "-chevron").addClass("fa-chevron-down");            
              }
            }

        });
    });

    function bottomPos(element) {
        return element.offset().top + element.outerHeight();
    }
    $(function() {
        var promo = $(".js-td-cover");
        if (!promo.length) {
            return
        }
        var promoOffset = bottomPos(promo);
        var navbarOffset = $('.js-navbar-scroll').offset().top;
        var threshold = Math.ceil($('.js-navbar-scroll').outerHeight());
        if ((promoOffset - navbarOffset) < threshold) {
            $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
        }
        $(window).on('scroll', function() {
            var navtop = $('.js-navbar-scroll').offset().top - $(window).scrollTop();
            var promoOffset = bottomPos($('.js-td-cover'));
            var navbarOffset = $('.js-navbar-scroll').offset().top;
            if ((promoOffset - navbarOffset) < threshold) {
                $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
            } else {
                $('.js-navbar-scroll').removeClass('navbar-bg-onscroll');
                $('.js-navbar-scroll').addClass('navbar-bg-onscroll--fade');
            }
        });
    });
}(jQuery));
(function($) {
    'use strict';
    var Search = {
        init: function() {
            $(document).ready(function() {
                $(document).on('keypress', '.td-search-input', function(e) {
                    if (e.keyCode !== 13) {
                        return
                    }
                    var query = $(this).val();
                    var searchPage = "{{ site.url }}{{ site.baseurl }}/search/?q=" + query;
                    document.location = searchPage;
                    return false;
                });
            });
        },
    };
    Search.init();
}(jQuery));
