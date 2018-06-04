/// <reference path="../jquery-1.7.2.min.js" />
$.extend({
    notifationTime: undefined,
    longpresstm: undefined,
    pageRecordEventArg: undefined,
    pageRecordPageObject: undefined,
    treePageObject: undefined,
    treeEventArg: undefined,
    treeAjaxUrl: undefined,

    /*获取顶层页面*/
    win: function () {
        var w = window;
        while (true) {
            if (w.top == w.self)
                break;
            else
                w = w.top;
        }
        return w;
    },

    /*遮罩阴影层*/
    jq_MaskDiv: function (e) {
        var str = "<div aria-hidden='false' class='theme-popover-mask " + e.cn + "' style=\"height:" + $($.win()).height() + "px;\"></div>";
        $.win().$("body").append(str);
        $.win().$('.theme-popover-mask').show();
    },
    jq_MaskDiv_close: function (e) {
        $.win().$('.' + e.cn).hide();
        $.win().$('.' + e.cn).remove();
    },

    /*确定取消对话框*/
    jq_Confirm: function (e) {
        if (!e) return;
        e.btnOktext = !e.btnOktext ? "确定" : e.btnOktext;
        e.btnCanceltext = !e.btnCanceltext ? "取消" : e.btnCanceltext;
        e.dialogModal = e.dialogModal == undefined ? true : e.dialogModal;
        if (!e.message) {
            e.message = "请输入对应的提示信息";
        }
        //set it's modal
        if (e.dialogModal) {
            $.jq_MaskDiv({ cn: "confirmMask" });
        }
        var str = "<div class='jq_dvconfirm'>"
                        + "<div style='min-height:54px;line-height:54px;padding:20px;'>"
                                + "<button title='关闭' class='btncloseconfirm'>×</button>"
                                + "<div class='dvconfirmmessage'>" + e.message + "</div>"
                        + "</div>"
                        + "<div class='dvconfirmcontent'>"
                                + "<a href='javascript:void(0)' class='confirmbtncancel'><i class='icon-remove'></i> " + e.btnCanceltext + "</a>"
                                + "<a href='javascript:void(0)' class='confirmbtnok'><i class='icon-ok'> " + e.btnOktext + "</a>"
                        + "</div>"
                    + "</div>";
        $.win().$("body").append(str);
        $.win().$(".btncloseconfirm").hover(function () {
            $(this).css("opacity", 1);
        }, function () {
            $(this).css("opacity", 0.2);
        });

        $.win().$('.jq_dvconfirm').css("left", ($($.win()).width() - $.win().$('.jq_dvconfirm').width()) / 2 + "px");
        $.win().$('.jq_dvconfirm').css("top", 0 - $.win().$('.jq_dvconfirm').height());
        $.win().$('.jq_dvconfirm').stop().animate({ "top": 200 + $($.win()).scrollTop(), "opacity": 1 }, 350);

        $.win().$('.confirmbtnok').bind("click", function () {
            $.jq_Confirm_close();
            if (e.btnOkClick) e.btnOkClick();
        });
        $.win().$('.confirmbtncancel').bind("click", function () {
            $.jq_Confirm_close();
            if (e.btnCancelClick) e.btnCancelClick();

        });
        $.win().$('.btncloseconfirm').bind("click", function () {
            $.jq_Confirm_close();
        });

    },
    /*确定取消对话框关闭*/
    jq_Confirm_close: function () {
        $.jq_MaskDiv_close({ cn: "confirmMask" });
        $.win().$('.jq_dvconfirm').stop().animate({ "top": 0 - $.win().$('.jq_dvconfirm').height(), "opacity": 0 }, 150, function () {
            $.win().$(".jq_dvconfirm").remove();
        });
    },


    /*确定对话框*/
    jq_Alert: function (e) {
        if (!e) return;
        e.btnOktext = !e.btnOktext ? "确定" : e.btnOktext;
        e.dialogModal = e.dialogModal == undefined ? true : e.dialogModal;

        if (!e.message) {
            e.message = "请输入对应的提示信息";
        }
        //set it's modal
        if (e.dialogModal) {
            $.jq_MaskDiv({ cn: "okMask" });
        }
        var str = "<div class='jq_dvalert'>"
                        + "<div style='min-height:54px;line-height:54px;padding:20px;'>"
                                + "<button title='关闭' class='btnclosealert'>×</button>"
                                + "<div class='dvalertmessage'>" + e.message + "</div>"
                        + "</div>"
                        + "<div class='dvalertcontent'>"
                                + "<a href='javascript:void(0)' class='alertbtnok'><i class='icon-ok'> " + e.btnOktext + "</a>"
                        + "</div>"
                    + "</div>";
        $.win().$("body").append(str);
        $.win().$(".btnclosealert").hover(function () {
            $(this).css("opacity", 1);
        }, function () {
            $(this).css("opacity", 0.2);
        });
        $.win().$('.jq_dvalert').css("left", ($($.win()).width() - $.win().$('.jq_dvalert').width()) / 2 + "px");
        $.win().$('.jq_dvalert').css("top", 0 - $.win().$('.jq_dvalert').height());
        $.win().$('.jq_dvalert').stop().animate({ "top": 200 + $($.win()).scrollTop(), "opacity": 1 }, 350);
        $.win().$('.alertbtnok').bind("click", function () {
            $.jq_Alert_close();
            if (e.btnOkClick) { e.btnOkClick(); }
        });
        $.win().$('.btnclosealert').bind("click", function () {
            $.jq_Alert_close();
        });
    },
    /*确定对话框关闭*/
    jq_Alert_close: function () {
        $.jq_MaskDiv_close({ cn: "okMask" });
        $.win().$('.jq_dvalert').stop().animate({ "top": 0 - $.win().$('.jq_dvalert').height(), "opacity": 0 }, 150, function () {
            $.win().$(".jq_dvalert").remove();
        });
    },


    /*加载对话框*/
    jq_Loading: function () {
        //set it's modal
        $.jq_MaskDiv({ cn: "loadMask" });
        var str = "<div class='jq_dvloading'>"
                        + "<div style='height:100px;padding:30px 30px;'>"
                                + "<i class='icon-loading icon-refresh icon-spin icon-large icon-4x'></i><div class='dvloadingcontent'>正在加载，请稍后......</div>"
                        + "</div>"
                    + "</div>";
        $.win().$("body").append(str);

        $.win().$('.jq_dvloading').css("left", ($($.win()).width() - $.win().$('.jq_dvloading').width()) / 2 + "px");
        $.win().$('.jq_dvloading').css("top", 0 - $('.jq_dvloading').height());
        $.win().$('.jq_dvloading').stop().animate({ "top": 200 + $($.win()).scrollTop(), "opacity": 1 }, 350);
    },
    /*加载对话框     关闭*/
    jq_Loading_close: function () {
        $.jq_MaskDiv_close({ cn: "loadMask" });
        $.win().$('.jq_dvloading').stop().animate({ "top": 0 - $.win().$('.jq_dvloading').height(), "opacity": 0 }, 150, function () {
            $.win().$(".jq_dvloading").remove();
        });
    },


    /*消息提示  对话框*/
    jq_Notifation: function (e) {
        if (!e) return;
        e.message = !e.message ? "请填写消息内容" : e.message;
        var str = "<div class='jq_dvnotifation'>"
                        + "<div class='jq_dvnotifation_title'>"
                                + "提示消息"
                                + "<button title='关闭' class='btnclosenotifation'>×</button>"
                        + "</div>"
                        + "<div class='jq_dvnotifation_content'>"
                                + e.message
                        + "</div>"
                    + "</div>";

        $.win().$("body").append(str);
        $.win().$(".btnclosenotifation").hover(function () {
            $(this).css("opacity", 1);
        }, function () {
            $(this).css("opacity", 0.2);
        });


        $.win().$('.jq_dvnotifation').stop().animate({ "opacity": 1 }, 350);

        $('.btnclosenotifation').bind("click", function () {
            $.jq_Notifation_close();
        });
        var tm = window.setTimeout(function () {
            $.jq_Notifation_close();
        }, 4000);

        $.win().$('.jq_dvnotifation_title,.jq_dvnotifation_content').hover(function (event) {
            window.clearTimeout(tm);
            $.win().$('.jq_dvnotifation').css("opacity", 1);
        }, function () {
            tm = window.setTimeout(function () {
                $.jq_Notifation_close();
            }, 4000);
        });
    },
    /*消息提示  对话框     关闭*/
    jq_Notifation_close: function () {
        window.clearTimeout($.notifationTime);
        $.win().$('.jq_dvnotifation').stop().animate({ "opacity": 0 }, 1050, function () {
            $.win().$('.jq_dvnotifation').remove();
        });
    },


    /* 弹出层设置 */
    jq_Panel: function (e) {
        if (!e) return;
        e.dialogModal = e.dialogModal == undefined ? true : e.dialogModal;
        e.title = !e.title ? "提示" : e.title;
        if (e.dialogModal) {
            $.jq_MaskDiv({ cn: "panel" });
        }
        var str = "<div class='jq_dvpanel' style='width:" + (parseInt(e.iframeWidth) + 30) + "px;'>"
                        + "<div class='dvpaneltitle'>"
                            + "<button title='关闭' class='btnclosepanel'>×</button>"
                            + "<div class='dvpaneltitlemessage'>" + e.title + "</div>"
                        + "</div>"
                        + "<div style='padding:15px;'>"
                        + "<iframe frameborder='0' scrolling='no' width='" + e.iframeWidth + "px' height='" + e.iframeHeight + "px'  src='" + e.url + "' />"
                        + "</div>"
                        + "</div>";
        $.win().$("body").append(str);
        $.win().$(".btnclosepanel").hover(function () {
            $(this).css("opacity", 1);
        }, function () {
            $(this).css("opacity", 0.2);
        });
        $.win().$('.jq_dvpanel').css("left", ($($.win()).width() - $.win().$('.jq_dvpanel').width()) / 2 + "px");
        $.win().$('.jq_dvpanel').css("top", 0 - $.win().$('.jq_dvpanel').height() - 200);
        $.win().$('.jq_dvpanel').stop().animate({ "top": 150 + $($.win()).scrollTop(), "opacity": 1 }, 350);

        $.win().$('.btnclosepanel').bind("click", function () {
            $.jq_Panel_close();
        });
    },
    jq_Panel_close: function (e) {

        if (e && e.panelClose) e.panelClose();
        $.jq_MaskDiv_close({ cn: "panel" });
        $.win().$('.jq_dvpanel').stop().animate({ "top": 0 - $.win().$('.jq_dvpanel').height(), "opacity": 0 }, 150, function () {
            $.win().$('.jq_dvpanel').remove();
        });
    },


    /* 选项卡初始化 */
    jq_Tabs_Init: function () {
        if ($(".tabs").length > 0) {
            $(".tabsheader>li").removeClass("currenttab");
            $(".tabsheader>li").eq(0).addClass("currenttab");
            $(".tabs>div").eq(0).css("display", "block");
            $(".tabsheader>li").click(function () {
                $(".tabsheader>li").removeClass("currenttab");
                $(".tabs>div").css("display", "none");
                $($(this).attr("class").trim()).fadeIn(600);
                $(this).addClass("currenttab");
            });
        }
    },
    jq_createCalendar: function (dt, sender) {
        var y = dt.getFullYear();
        var m = dt.getMonth();
        var d = dt.getDate();

        dt.setDate(1);
        var num = dt.getDay() == 0 ? 7 : dt.getDay();
        var str = "<tr>";
        //补前空格
        for (var i = 0; i < num - 1; i++) {
            str += "<td></td>";
        }
        while (true) {
            if (d == dt.getDate()) {
                str += "<td class='tddtcalendar currentdt'>" + dt.getDate() + "</td>";
            }
            else {
                str += "<td class='tddtcalendar'>" + dt.getDate() + "</td>";
            }
            dt.setDate(dt.getDate() + 1);
            if (dt.getDate() == 1) {
                break;
            }
            if (dt.getDay() == 1) {
                str += "</tr>";
            }
            if (dt.getDate() != 1 && dt.getDay() == 1) {
                str += "<tr>";
            }
        }
        if (dt.getDay() == 1) {
            str += "</tr>";
        }
        else {
            var num = dt.getDay() == 0 ? 7 : dt.getDay();
            for (var i = 0; i < 8 - num; i++) {
                str += "<td></td>";
            }
            str += "</tr>";
        }
        return str;
    }
});
$.fn.extend({
    /**************分页效果***************/
    /*
    dataUrl             请求的url           必要参数      必须返回格式 {"data":[对象数组],"pagecount":20}
    theadContent        列头的格式          必要参数      <th>姓名</th><th>年龄</th><th>电话</th><th>地址</th><th>编辑</th><th>删除</th>
    tbodyContent        内容的格式          必要参数      function(data){ return "xxxx"; }   data为数据集合  返回数据为<tr><td>xx<td/></tr>
    sender              分页容器对象        default       如果一个页面需要多处分页  则需要此参数    默认值 undefinder
    data                请求的参数          default       undefinder    格式必须为json格式
    footcolspan         合并的列数          default     0
    currentPage         当前页码            default       1 
    tableId             表格id              default       tbRecord
    pageSize            每页记录            default       10
    showProgressBar     进度条              default       false
    complated           加载完成时间        default       function(){   }

    */
    jq_pageRecord: function (e) {
        $.pageRecordEventArg = e;
        $.pageRecordPageObject = $(this);
        e.currentPage = e.currentPage || 1;
        e.tableId = e.tableId || "tbRecord";
        e.pageSize = e.pageSize || 10;
        e.showProgressBar = e.showProgressBar || false; //是否显示延迟进度条
        if (e.async == undefined) e.async = true;       //是否是异步
        e.data = e.data || {};
        if (e.showProgressBar) { $.jq_Loading(); }
        //合并需要参数
        var vdata = { psize: e.pageSize, cpage: e.currentPage };
        for (var i in e.data) {
            vdata[i] = e.data[i];
        }
        $.ajax({
            type: "post",
            url: e.dataUrl,
            data: vdata,
            async: e.async,
            success: function (d) {
                var obj = null;
                var pageCount = -1;
                var o = d;
                for (var i in o) {
                    if (i != "pagecount")
                        obj = o[i];
                    else
                        pageCount = parseInt(o[i]);
                }
                var params = "";
                var str = "<table class='table' id='" + e.tableId + "'>" +
                            "<thead>" +
                                "<tr>" +
                                    e.theadContent +
                                "</tr>" +
                            "</thead>";
                str += "<tbody>";
                str += e.tbodyContent(obj);
                str += "</tbody>";
                str += "<tfoot>" +
                            "<tr>" +
                                "<td colspan='" + e.footcolspan + "'><div style='float:right;'>" +
                                "<div class='dvpagerecord pagefirst' title='首页'>" +
                                "<i class='fa fa-angle-double-left txt'></i>" +
                                "</div>" +
                                "<div class='dvpagerecord prvePage' title='上一页'>" +
                                "<i class='fa fa-angle-left'></i>" +
                                "</div>" +
                                "<ul class='ulpageRecord'>";
                var pp = "";
                for (var p = 1; p <= pageCount; p++) {
                    if (p == e.currentPage) {
                        pp += "<li class='btn btn-primary' style='color:white'>" + p + "</li>";
                    }
                    else {
                        pp += "<li style='color:blue'>" + p + "</li>";
                    }
                }
                str += pp;
                str += "</ul>" +
                                "<div class='dvpagerecord nextPage' title='下一页'>" +
                                "<i class='fa fa-angle-right'></i>" +
                                "</div>" +
                                "<div class='dvpagerecord pagelast' title='尾页'>" +
                                "<i class='fa fa-angle-double-right'></i>" +
                                "</div>" +
                            "</div></td>" +
                            "</tr>" +
                        "</tfoot>" +
                        "</table>";
                $.pageRecordPageObject.html(str);

                var liwidth = $("#" + e.tableId + " .ulpageRecord li:eq(0)").outerWidth();
                //            			/*设定选中的位置*/
                var selectedIndex = e.currentPage - 1;
                var allwidth = 0;
                var rd = $("#" + e.tableId + " .ulpageRecord>li");
                for (var i = 0; i < rd.length ; i++) {
                    if (i != selectedIndex)
                        allwidth += rd.eq(i).outerWidth();
                    else
                        break;
                }
                var lf = allwidth - (liwidth * 2);
                lf = lf < 0 ? 0 : lf;
                $("#" + e.tableId + " .ulpageRecord").stop().animate({ scrollLeft: lf }, 20);

                /*  各个按钮效果   */
                /*	首页      尾页   li  点击效果	*/
                $("#" + e.tableId + " .pagefirst").click(function () {
                    $("#" + e.tableId + " .ulpageRecord").stop().animate({ scrollLeft: 0 }, 300, function () {
                        $("#" + e.tableId + " .ulpageRecord").stop();
                        $.pageRecordPageObject = $(this).parent().parent().parent().parent().parent();
                        $.pageRecordEventArg.tableId = $.pageRecordPageObject.attr("id");
                        $.pageRecordEventArg.dataUrl = e.dataUrl;
                        $.pageRecordEventArg.pageSize = e.pageSize;

                        $.pageRecordEventArg.currentPage = $("#" + e.tableId + " .ulpageRecord li").first().html();
                        $("#" + e.tableId).parent().jq_pageRecord($.pageRecordEventArg);
                    });
                });
                $("#" + e.tableId + " .pagelast").click(function () {
                    var val = $("#" + e.tableId + " .pagelast")[0].scrollWidth;
                    $("#" + e.tableId + " .pagelast").stop().animate({ scrollLeft: val + "px" }, 300, function () {
                        $("#" + e.tableId + " .pagelast").stop();
                        $.pageRecordPageObject = $(this).parent().parent().parent().parent().parent();
                        $.pageRecordEventArg.tableId = $.pageRecordPageObject.attr("id");
                        $.pageRecordEventArg.dataUrl = e.dataUrl;
                        $.pageRecordEventArg.pageSize = e.pageSize;

                        $.pageRecordEventArg.currentPage = $("#" + e.tableId + " .ulpageRecord li").last().html();
                        $("#" + e.tableId).parent().jq_pageRecord($.pageRecordEventArg);
                    });
                });


                /*  上一页   下一页  li 长按效果  */
                $("#" + e.tableId + " .nextPage").click(function () {
                    var val = $("#" + e.tableId + " .ulpageRecord").scrollLeft();
                    val += liwidth * 2;
                    $("#" + e.tableId + " .ulpageRecord").stop().animate({ scrollLeft: val }, 300);
                });
                $("#" + e.tableId + " .prvePage").click(function () {
                    var val = $("#" + e.tableId + " .ulpageRecord").scrollLeft();
                    val -= liwidth * 2;
                    $("#" + e.tableId + " .ulpageRecord").stop().animate({ scrollLeft: val }, 300);
                });

                //点击页码 刷新页面数据
                $("#" + e.tableId + " .ulpageRecord li").click(function () {
                    $.pageRecordEventArg.currentPage = $(this).html();
                    $.pageRecordPageObject = $(this).parent().parent().parent().parent().parent().parent().parent();
                    $.pageRecordEventArg.tableId = $.pageRecordPageObject.attr("id");
                    $.pageRecordEventArg.dataUrl = e.dataUrl;
                    $.pageRecordEventArg.pageSize = e.pageSize;
                    $.pageRecordPageObject.jq_pageRecord($.pageRecordEventArg);
                });
                if (e.complated) {
                    $.jq_Loading_close();
                    e.complated();
                }
            },
            error: function () {
                alert("error");
            }
        });
    },


    /*日历*/
    jq_calendar: function (e) {
        $(this).focus(function () {
            var txtobj = $(this);
            nowdate = new Date();
            var str = "<div class='jqcalendar'>";
            str += "<table class='jqtbcalendar'  cellpadding='0' cellspacing='0'>";
            str += "<thead>";
            str += "<tr>";
            str += "<th class='preMonth' onclick='jq_preMonth()'><<</th>";
            str += "<th class='calendartitle' colspan='5'>" + nowdate.getFullYear() + "年" + (nowdate.getMonth() + 1) + "月</th>";
            str += "<th class='nextMonth' onclick='jq_nextMonth()'>>></th>";
            str += "</tr>";
            str += "<tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>";
            str += "</thead>";
            str += "<tbody class='calendarbody'>";
            str += "</tbody>";
            str += "</table>";
            str += "</div>";
            $("body").append(str);



            var txttop = $(txtobj).offset().top;
            var txtleft = $(txtobj).offset().left;
            var txtheight = $(txtobj).height();
            $(".jqcalendar").css("top", txttop + txtheight + parseInt($(txtobj).css("border-top-width")) + parseInt($(txtobj).css("border-bottom-width")) + 10);
            $(".jqcalendar").css("left", txtleft);

            var ct = $.jq_createCalendar(nowdate, this);
            $(".calendarbody").html(ct);
            $(".tddtcalendar").bind("click", function (txtobj) {
                alert($(txtobj));
            });

        });

    }
});
