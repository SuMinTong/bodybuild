/// <reference path="jquery-1.7.2.min.js" />
$.fn.extend({
    checkBox: function () {
        $(this).click(function () {
            if ($(this).hasClass("spcheckboxCheck")) {
                $(this).removeClass("spcheckboxCheck");
                $(this).addClass("spcheckbox");
                $(this).children(0).removeAttr("checked");
            }
            else {
                $(this).removeClass("spcheckbox");
                $(this).addClass("spcheckboxCheck");
                $(this).children(0).attr("checked", "checked");
            }
        });
    },
    radio: function () {
        $(this).click(function () {
            $(this).parent().children("span").removeClass("spradioCheck");
            $(this).parent().children("span").addClass("spradio");
            $(this).parent().children("span").children("input:[type='radio']").removeAttr("checked");
            $(this).removeClass("spradio");
            $(this).addClass("spradioCheck");
            $(this).children("input:[type='radio']").attr("checked", "checked");
        });
    },
    menu: function () {
        $.menuInit($(this));

        $(this).children("li").children("a").click(function () {
            if ($(this).parent().hasClass("current")) {
                $(this).parent().removeClass("current");
                var imgpath = $(this).children("img").attr("src");
                var imgname = imgpath.split('/')[imgpath.split('/').length - 1];
                var newpath = "/content/icons/" + imgname;
                $(this).children("img").attr("src", newpath);
            }
            else {
                $(this).parent().parent().children("li").removeClass("current");
                var allli = $(this).parent().parent().children("li");
                for (var i = 0; i < allli.length; i++) {
                    var imgpath = allli.eq(i).children("a").children("img").attr("src");
                    var imgname = imgpath.split('/')[imgpath.split('/').length - 1];
                    var newpath = "/content/icons/" + imgname;
                    allli.eq(i).children("a").children("img").attr("src", newpath);
                }

                $(this).parent().addClass("current");
                var imgpath = $(this).children("img").attr("src");
                var imgblackpath = imgpath.split('/')[imgpath.split('/').length - 1];
                imgblackpath = "/content/icons/dark/" + imgblackpath;
                $(this).children("img").attr("src", imgblackpath);
            }
            $.menuInit($(this).parent().parent());
        });
    },
    tabs: function () {
        $(this).children("li").children("a").click(function () {
            $(".content-box-tabs a").removeClass("current");
            $(this).addClass("current");
            $(".content-box-content").children().css("display", "none");
            $($(this).attr("href")).css("display", "block");
            return false;
        });
    }
});
$.extend({
    menuInit: function (sender) {
        sender.children("li").children("ul").stop().animate({ height: "hide" });
        sender.children(".current").children("ul").stop().animate({ height: "show" });
    },
    menuExpand: function (pid, cid) {
        $("#ulmenu>li:eq(" + pid + ")").addClass("current");
        var imgpath = $("#ulmenu>li:eq(" + pid + ")").children("a").children("img").attr("src");
        var imgblackpath = imgpath.split('/')[imgpath.split('/').length - 1];
        imgblackpath = "/content/icons/dark/" + imgblackpath;
        $("#ulmenu>li:eq(" + pid + ")").children("a").children("img").attr("src", imgblackpath);
        $("#ulmenu>li:eq(" + pid + ")>ul").stop().animate({ height: "show" });
        $("#ulmenu>li:eq(" + pid + ")>ul>li:eq(" + cid + ")").addClass("current");
    },
    Default: {
        pageSetting: {
            "/UserManager/Users": [7, 0]
            ,"/DepartManager/Depart": [7, 1]
            ,"/RoleManager/Role": [7, 2]
            ,"/RoleManager/SettingRole": [7, 2]
            ,"/LogManager/Log": [7, 3]
            , "/ResourcesManager/Category": [0, 0]
            , "/PlanManager/Manager": [3, 1]
            , "/ResourcesManager/Resource": [0, 1]
            , "/UploadFileManager/UploadFile": [5, 2]
            , '/PlayPlanManager/AddPlayPlan': [2, 0]
            , '/PlayPlanManager/PlayPlan': [2, 1]
            , '/PlayPlanManager/ReleasePlan': [2, 2]
        },
        formSetting: function () {
            $("input:[type='text']").attr("AutoComplete", "Off");
        },
        Settings: function () {
            var key = window.location.pathname;
            var ary = key.split("/");
            var key = "/" + ary[1] + "/" + ary[2];
            var value = $.Default.pageSetting[key];
            if (value) {
                $.menuExpand(value[0], value[1]);
            }
            $.Default.formSetting();
        }
    }
});
var navigationUrl = function (url) {
    window.location.href = url;
}
$(function () {
    $.Default.Settings();
});
