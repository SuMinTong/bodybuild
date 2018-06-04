/*
调用示例:
$(function () {
            $.scroll({
                dvScroll: $("#dv"),                   //父级div
                dvChildOne: $("#sdv1"),         //第一个div
                dvChildTwo: $("#sdv2"),         //第二个div 
                scrollTime: 40                         //滚动速度
            });
        });
*/
$.extend({
    scrollV: function (e) {
        e.dvChildTwo.html(e.dvChildOne.html());
        e.dvScroll.mouseover(function () {
            window.clearInterval(tmv);
        });
        e.dvScroll.mouseout(function () {
            tmv = window.setInterval("scrol()", e.scrollTime);
        });
        var tmv = window.setInterval("scrol()", e.scrollTime);
        scrol = function () {
            (e.dvScroll)[0].scrollTop++;
            if (((e.dvChildOne)[0].offsetHeight - (e.dvScroll)[0].offsetHeight) + (e.dvChildTwo)[0].offsetHeight - (e.dvScroll)[0].scrollTop <= 0) {
                (e.dvScroll)[0].scrollTop -= (e.dvChildOne)[0].offsetHeight;
            }
        };
    }
    
});