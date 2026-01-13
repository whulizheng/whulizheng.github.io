(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var clPreloader = function() {
        
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };

   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        clPreloader();
    })();
        
        
})(jQuery);

var iframe = document.getElementById('pdf-frame');
var preloader = document.getElementById('preloader');

// 如果支持 load 事件（多数现代浏览器对 iframe 加载 PDF 会触发）
iframe.onload = function() {
    // 延迟一点确保渲染完成（可选）
    setTimeout(function() {
        if (preloader) {
            preloader.style.display = 'none';
        }
        document.documentElement.classList.remove('cl-preload');
        document.documentElement.classList.add('cl-loaded');
    }, 300);
};

// 同时保留 window.onload 作为兜底
window.addEventListener('load', function() {
    // 如果 iframe 没触发 onload（比如失败），3秒后强制隐藏
    setTimeout(function() {
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.display = 'none';
            document.documentElement.classList.remove('cl-preload');
            document.documentElement.classList.add('cl-loaded');
        }
    }, 3000);
});
