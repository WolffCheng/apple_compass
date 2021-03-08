(function ($) {
    $.fn.mkParallax = function (params) {
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        var container = $(this);
        image = container.attr("data-image");
        //
        if (isMobile.any()) {
            container.css('position', 'relative');
            var prent = document.createElement("div");
            $(prent).css("position", "absolute");
            $(prent).css("top", "0");
            $(prent).css("left", "0");
            $(prent).css("height", "100%");
            $(prent).css("width", "100%");
            $(prent).css("overflow", "hidden");
            var el = document.createElement("div");
            $(el).css("background-image", "url('" + image + "')");
            $(el).css("background-size", "cover");
            $(el).css("background-position","center")


            $(el).css("height", "200%");
            // $(el).css("height", $(window).height());


            $(el).css("width", "100%");
            $(el).css("position", "absolute");
            if (0 > container.offset().top - $(window).scrollTop())
                $(el).css('top', '0');
            if (container.offset().top - $(window).scrollTop() > $(window).height())
                $(el).css('top', -$(window).height());
            container.prepend(prent);
            $(prent).prepend(el);
            


            $(window).scroll(function () {
                if (0 <= container.offset().top - $(window).scrollTop() <= $(window).height()) {
                    $(el).css('top', $(window).scrollTop() - container.offset().top);
                }
            });


            
            $(window).resize(function () {
                if (0 > container.offset().top - $(window).scrollTop())
                    $(el).css('top', '0');

                if (container.offset().top - $(window).scrollTop() > $(window).height())
                    $(el).css('top', -$(window).height());
                if (0 <= container.offset().top - $(window).scrollTop() <= $(window).height()) {
                    $(el).css('top', $(window).scrollTop() - container.offset().top);
                }
            });

            



        } else {

            //   container.css("background-image", "url('"+image+"')");
            //   container.css("background-attachment", "fixed");
            //   container.css("background-size", "cover");


            container.addClass("parallax").css("background-image", 'url(' + image + ')');
        }
        return this;
    }
}(jQuery));