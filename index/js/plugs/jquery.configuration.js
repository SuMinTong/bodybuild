var messageboxtm, bgc, tmprogressbar, longpresstm, plugslibgc, currentSelect, lifontcolor, plugspagerecordEventargs, plugspagerecordsender;
var dataFormat= {
		"Currency" : "Currency",
		"DateTime" : "DateTime",
		"Date" : "Date",
		"Time" : "Time"
	};
   
window.dialogResult = false;
$.extend({
	/***************   数据库日期转js日期   ****************/
	jsPlugs_DateConvert: function (d) {
		var dt = d.replace("/Date(", "");
		dt = parseInt(dt);
		dt = new Date(dt);
		return dt;
	},
	/***************   cookie操作     *******************/
	jsPlugs_cookie: function (c) {
		if (c == "")
			return undefined;
		c = c.replace(";", "&");
		var obj = "{";
		var ary = c.split("&");
		for (var i = 0; i < ary.length; i++) {
			if ($.trim(ary[i]).split("=").length == 2) {
				obj += "\"" + $.trim(ary[i]).split("=")[0] + "\":\"" + $.trim(ary[i]).split("=")[1] + "\",";
			}
			if ($.trim(ary[i]).split("=").length == 3) {
				obj += "\"" + $.trim(ary[i]).split("=")[1] + "\":\"" + $.trim(ary[i]).split("=")[2] + "\",";
			}
		}
		obj = obj.substring(0, obj.length - 1);
		obj += "}";
		return $.parseJSON(obj);
	},
	/*************   md5加密  *****************/
	jsPlugs_md5: function (t) {
		var hexcase = 0;
		var b64pad = "";
		var chrsz = 8;
		function hex_md5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); };
		function b64_md5(s) { return binl2b64(core_md5(str2binl(s), s.length * chrsz)); };
		function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); };
		function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); };
		function calcMD5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); };
		function md5_vm_test() {
			return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
		};
		function core_md5(x, len) {
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;
			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;
			for (var i = 0; i < x.length; i += 16) {
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;
				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd);
			}
			return Array(a, b, c, d);
		};
		function md5_cmn(q, a, b, x, s, t) {
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
		};
		function md5_ff(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		};
		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		};
		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		};
		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		};
		function core_hmac_md5(key, data) {
			var bkey = str2binl(key);
			if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

			var ipad = Array(16), opad = Array(16);
			for (var i = 0; i < 16; i++) {
				ipad[i] = bkey[i] ^ 0x36363636;
				opad[i] = bkey[i] ^ 0x5C5C5C5C;
			}
			var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
			return core_md5(opad.concat(hash), 512 + 128);
		};
		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		};
		function bit_rol(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt));
		};
		function str2binl(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz)
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
			return bin;
		};
		function binl2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
		   hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		};
		function binl2b64(binarray) {
			var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i += 3) {
				var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
				| (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
				| ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
				for (var j = 0; j < 4; j++) {
					if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
					else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
				}
			}
			return str;
		};
		return hex_md5(t).toUpperCase();
	},
	/***********日历汉化***********/
	datepickercn: function () {
		$.datepicker.regional['zh-CN'] = {
			clearText: '清除',
			clearStatus: '清除已选日期',
			closeText: '关闭',
			closeStatus: '不改变当前选择',
			prevText: '<上月',
			prevStatus: '显示上月',
			prevBigText: '<<',
			prevBigStatus: '显示上一年',
			nextText: '下月>',
			nextStatus: '显示下月',
			nextBigText: '>>',
			nextBigStatus: '显示下一年',
			currentText: '今天',
			currentStatus: '显示本月',
			monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
			monthStatus: '选择月份',
			yearStatus: '选择年份',
			weekHeader: '周',
			weekStatus: '年内周次',
			dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
			dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
			dayStatus: '设置 DD 为一周起始',
			dateStatus: '选择 m月 d日, DD',
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			initStatus: '请选择日期',
			isRTL: false
		};
		$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
	},
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
	/***************日历****************/
	jsPlugs_Datepicker: function (e) {
		var cm = e.changeMonth == undefined ? false : e.changeMonth;
		var cy = e.changeYear == undefined ? false : e.changeYear;
		var df = e.dateFormat == undefined ? "yy-mm-dd" : e.dateFormat;
		$.datepickercn();
		$(e.ele).datepicker({
			changeMonth: cm,
			changeYear: cy,
			dateFormat: df
		});
		$(".ui-datepicker").css("font-size", "12px");
	},
	/***********确定对话框封装***********/
	jsPlugs_Alert: function (e) {
		dialogResult = true;
		var t = e.title == undefined ? "提示" : e.title;
		var m = e.modal == undefined ? true : e.modal;
		var r = e.resizable == undefined ? false : e.resizable;
		$.win().$("body").append("<div id='dvdialogAlert' title='" + t + "'>" + e.message + "</div>");
		$.win().$("#dvdialogAlert").dialog({
			modal: m,
			resizable: r,
			closeOnEscape: false,
			close: function () {
				$.win().$("#dvdialogAlert").parent().remove();
				$.win().$("#dvdialogAlert").remove();
				if (e.closed != undefined) { e.closed(); }
			},
			buttons: [{
				text: "确定",
				click: function () {
					dialogResult = true;
					$.win().$(this).dialog("close");
				}
			}]
		});
	},
	/************** 遮罩层进度条**************/
	jsPlugs_ProgressBar: function (e) {
		$.win().$("body").append("<div id='dvJsPlugsprogressbarDialog'><div id='dvJsPlugsprogressbar' style='margin:0px auto;width:270px;padding:0px;height:15px;'></div><div id='dvJsPlugsprogressbarMessage' style='margin:10px auto;text-align:center;'>正在加载,请稍后……</div></div>");
		$.win().$("#dvJsPlugsprogressbarDialog").dialog({
			resizable: false,
			modal: true,
			closeOnEscape: false,
			open: function () {
				$.win().$("#dvJsPlugsprogressbarDialog").parent().find(".ui-dialog-titlebar").remove();
				$.win().$("#dvJsPlugsprogressbarDialog").css("min-height", "50").css("background-Color", "white");
				$.win().$("#dvJsPlugsprogressbar").progressbar({ value: 0 });
				tmprogressbar = window.setInterval("setProgressBarValue()", 20);
			}
		});

	},
	/************** 进度条关闭方法	**************/
	jsPlugs_ProgressBarClose: function () {
		window.clearInterval(tmprogressbar);
		$("#dvJsPlugsprogressbarDialog").parent().remove();
		$("#dvJsPlugsprogressbarDialog").remove();
	},
	/***********确定取消对话框封装***********/
	jsPlugs_Confirm: function (e) {
		var t = e.title == undefined ? "提示" : e.title;
		var m = e.modal == undefined ? true : e.modal;
		var r = e.resizable == undefined ? false : e.resizable;
		$.win().$("body").append("<div id='dvdialogConfirm' title='" + t + "'>" + e.message + "</div>");
		$.win().$("#dvdialogConfirm").dialog({
			modal: m,
			resizable: r,
			closeOnEscape: false,
			close: function () {
				$.win().$("#dvdialogConfirm").parent().remove();
				$.win().$("#dvdialogConfirm").remove();
				if (e.closed != undefined) { e.closed(); }
			},
			buttons: [{
				text: "确定",
				click: function () {
					dialogResult = true;
					if (e.okBtnClick != undefined) e.okBtnClick();
					$.win().$("#dvdialogConfirm").parent().remove();
					$.win().$("#dvdialogConfirm").remove();
				}
			},
			{
				text: "取消",
				click: function () {
					dialogResult = false;
					if (e.cancelBtnClick != undefined) e.cancelBtnClick();
					$.win().$("#dvdialogConfirm").parent().remove();
					$.win().$("#dvdialogConfirm").remove();
				}
			}]
		});
	},
	/***********提示消息框封装***********/
	jsPlugs_MessageBox: function (e) {
		var t = e.title == undefined ? "提示" : e.title;
		var m = false;
		var r = false;
		if (e.url == undefined) {
			$.win().$("body").append("<div id='dvdialogMessageBox' title='" + t + "'>" + e.message + "</div>");
			$.win().$("#dvdialogMessageBox").dialog({
				modal: m,
				resizable: r,
				hide: "blind",
				closeOnEscape: false,
				open: function () {
					var sw = $.win().$(window).width();
					var sh = $.win().$(window).height();
					var mw = $.win().$("#dvdialogMessageBox").parent().width();
					var mh = $.win().$("#dvdialogMessageBox").parent().height();
					$.win().$("#dvdialogMessageBox").parent().css("top", sh - mh + $(window).scrollTop() - 8);
					$.win().$("#dvdialogMessageBox").parent().css("left", sw - mw - 8);
					$.win().$("#dvdialogMessageBox").parent().css("opacity", 0);
					$.win().$("#dvdialogMessageBox").parent().stop().animate({ opacity: 1 }, 2000);
					$.win().$("#dvdialogMessageBox").parent().mouseover(function () {
						window.clearTimeout(messageboxtm);
						$.win().$("#dvdialogMessageBox").parent().stop().animate({ opacity: 1 }, 200);
					}).mouseout(function () {
						messageboxtm = window.setTimeout("messageBoxClose()", 4000);
					});
					messageboxtm = window.setTimeout("messageBoxClose()", 4000);
				},
				close: function () {        //关闭
					$.win().$("#dvdialogMessageBox").parent().remove();
					$.win().$("#dvdialogMessageBox").remove();
				}
			});
		}
		else {
			$.ajax({
				type: "Post",
				url: e.url,
				success: function (d) {
					var obj = eval(d);
					$.win().$("body").append("<div id='dvdialogMessageBox' title='" + obj[0].Title + "'><a href='" + obj[0].Link + "' target='_blank'>" + obj[0].Message + "</a></div>");
					$.win().$("#dvdialogMessageBox").dialog({
						modal: m,
						resizable: r,
						hide: "blind",
						closeOnEscape: false,
						open: function () {
							var sw = $.win().$(window).width();
							var sh = $.win().$(window).height();
							var mw = $.win().$("#dvdialogMessageBox").parent().width();
							var mh = $.win().$("#dvdialogMessageBox").parent().height();
							$.win().$("#dvdialogMessageBox").parent().css("top", sh - mh + $(window).scrollTop() - 8);
							$.win().$("#dvdialogMessageBox").parent().css("left", sw - mw - 8);
							$.win().$("#dvdialogMessageBox").parent().css("opacity", 0);
							$.win().$("#dvdialogMessageBox").parent().stop().animate({ opacity: 1 }, 2000);
							$.win().$("#dvdialogMessageBox").parent().mouseover(function () {
								window.clearTimeout(messageboxtm);
								$.win().$("#dvdialogMessageBox").parent().stop().animate({ opacity: 1 }, 200);
							}).mouseout(function () {
								messageboxtm = window.setTimeout("messageBoxClose()", 4000);
							});
							messageboxtm = window.setTimeout("messageBoxClose()", 4000);
						},
						close: function () {        //关闭
							$.win().$("#dvdialogMessageBox").parent().remove();
							$.win().$("#dvdialogMessageBox").remove();
						}
					});
				},
				error: function () {
					alert(e.url);
				}
			});
		}
	},
	/***********    confirm关闭方法      ********/
	jsPlugs_ConfirmClose: function (e) {
		$.win().$("#dvdialogConfirm").dialog("close");
	},
	/***********弹出层扩展方法***********/
	jsPlugs_Panel: function (e) {
		var r = e.resizable == undefined ? false : e.resizable;
		var t = e.title == undefined ? "" : e.title;
		var w = e.width == undefined ? 500 : e.width;
		var h = e.height == undefined ? 500 : e.height;
		var m = e.modal == undefined ? true : e.modal;
		var d = "?";
		if (e.data != undefined) {
			var obj = eval(e.data);
			for (var p in obj) {
				d += p + "=" + obj[p] + "&";
			}
		}
		d = d.substring(0, d.length - 1);
		$.win().$("body").append("<div id='dvJsPlugsPanel' title='" + t + "'><iframe src='" + e.url + d + "' style='margin:0px auto;height:" + (h - 70) + "px;width:" + (w - 20) + "px' frameborder='0' scrolling='0'></iframe></div>");
		$.win().$("#dvJsPlugsPanel").dialog({
			modal: m,
			resizable: r,
			width: w,
			closeOnEscape: false,
			height: h,
			close: function () {
				$.win().$(".ui-dialog").remove();
				$.win().$("#dvJsPlugsPanel").remove();
				if (e.closed != undefined) { e.closed(); }
			}
		});
	},
	/***********弹出层关闭方法***********/
	jsPlugs_PanelClose: function () {
		$.win().$("#dvJsPlugsPanel").dialog("close");
	}
});
/***********消息对话框关闭方法***********/
var messageBoxClose = function () {
	$.win().$("#dvdialogMessageBox").parent().stop().animate({ opacity: 0 }, 2000, function () {
		$("#dvdialogMessageBox").parent().remove();
		$("#dvdialogMessageBox").remove();
		window.clearTimeout(messageboxtm);
	});
};
/***********进度条赋值方法***********/
var setProgressBarValue = function () {
	var v = $("#dvJsPlugsprogressbar").progressbar("option", "value");
	v = v + 1 > 100 ? 1 : v + 1;
	$.win().$("#dvJsPlugsprogressbar").progressbar("option", "value", v);
};

/***********分页Go按钮点击处理方法***********/
var pageRecordBtnNumGo_click=function(){
	var val=$("#pageRecordtxtNumGo").val();
	if(val=="" || isNaN(val) ||  val>$("#dvpagerecordcontent li").length || val<=0){
		$.jsPlugs_Alert({
			message:"请输入正确的页数",
			closed:function(){
				$("#pageRecordtxtNumGo").val("");
			}
		});
	}
	else{
		plugspagerecordEventargs.currentPage=val;
		plugspagerecordsender.jsPlugs_pageRecord(plugspagerecordEventargs);
	}
};
var pageRecord_createTable = function (e, obj, plugs_pages) {
	var rows = obj.length;
	//sender.html(plugs_pages);
	var columnsCount = 0;
	/*解析所有的列*/
	var table = "<table id='" + e.tableId + "'>";
	//是否显示列头
	if (e.hasColumnsHeader) {
		table += "<thead><tr>";
		if (e.hasSelectColumn) { table += "<th style='width:40px;' align='center'><input type='checkbox' id='jsPlugs_pageRecordCheckbox_All' onclick='jsPlugs_pageRecordCheckbox_All_click()' /><label for='jsPlugs_pageRecordCheckbox_All'>全选</label></th>"; }
		if (e.columns) {
			for (var i in e.columns) {
				if (typeof (e.columns[i]) == "string") {
					table += "<th>" + e.columns[i] + "</th>";
				}
				else {
					table += "<th>" + e.columns[i]["dataText"] + "</th>";
				}
				columnsCount += 1;
			}
		}
		else {
			for (var i in obj[0]) {
				table += "<th>" + i + "</th>";
				columnsCount += 1;
			}
		}
		if (e.customColumns) {
			for (var i in e.customColumns) {
				table += "<th>" + e.customColumns[i].header + "</th>";
			}
		}
		if (e.hasEditColumn) { table += "<th>" + e.hasEditColumn.header + "</th>"; }
		if (e.hasDeleteColumn) { table += "<th>" + e.hasDeleteColumn.header + "</th>"; }

		table += "</tr></thead>";
	}
	if (e.hasSelectColumn) { columnsCount += 1; }
	if (e.hasEditColumn) { columnsCount += 1; }
	if (e.hasDeleteColumn) { columnsCount += 1; }
	if (e.customColumns) { columnsCount += e.customColumns.length }
	table += "<tbody>";
	/*解析所有数据*/
	for (var i = 0; i < rows; i++) {
		table += "<tr>";
		if (e.hasSelectColumn) {
			table += "<td style='width:60px;' align='center'><input type='checkbox' class='jsPlugs_pageRecordCheckbox_index' id='jsPlugs_pageRecordCheckbox_" + obj[i][e.keyName] + "'   /></td>";
		}
		if (e.columns) {
			for (var j in e.columns) {
				if (typeof (e.columns[j]) == "string") {
					table += "<td>" + obj[i][j] + "</td>";
				}
				else {
					
					switch (e.columns[j]["dataFormat"]) {
						case "DateTime":
							var dd = $.jsPlugs_DateConvert(obj[i][j]);                                                           
							table += "<th>" + dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate() + " " + dd.getHours() + ":" + +dd.getMinutes() +":"+ dd.getSeconds() + "</th>"; 
							break;
						case "Date":
							var dd = $.jsPlugs_DateConvert(obj[i][j]);
							table += "<th>" + dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate() + "</th>"; 
							break;
						case "Time":
							var dd = $.jsPlugs_DateConvert(obj[i][j]);
							table += "<th>" + dd.getHours() + ":" + +dd.getMinutes() + ":" + dd.getSeconds() + "</th>";
							break;
					}

				}

			}
		}
		else {
			for (var j in obj[0]) {
				table += "<td>" + obj[i][j] + "</td>";
			}
		}
		if (e.customColumns) {
			for (var j in e.customColumns) {
				table += "<td class='td_customcolumns' id='td_customcolumns_" + j + "_" + obj[i][e.keyName] + "' align='center' style='cursor:pointer;'>" + e.customColumns[j].text + "</td>";
			}
		}
		if (e.hasEditColumn) { table += "<td class='td_column_edit' id='td_column_edit_" + obj[i][e.keyName] + "' align='center' style='cursor:pointer;'>" + e.hasEditColumn.text + "</td>"; }
		if (e.hasDeleteColumn) { table += "<td class='td_column_delete' id='td_column_delete_" + obj[i][e.keyName] + "' align='center' style='cursor:pointer;'>" + e.hasDeleteColumn.text + "</td>"; }
		table += "</tr>";
	}
	table += "</tbody>";
	/*生成分页位置*/
	table += "<tfoot><tr><td id='tdpageRecord' colspan='" + columnsCount + "'>";

	table += plugs_pages;


	table += "</td></tr></tfoot>";
	table += "</table>";
	return table;
};
$.fn.extend({
	/***********对象 长按 事件***********/
	jsPlugs_longPress: function (time, callBack) {
		$(this).mousedown(function () {
			var i = 0;
			longpresstm = setInterval(function () {
				i += 50;
				if (i >= time) {
					callBack.call();
				}
			}, 50);
		}).mouseup(function () {
			clearTimeout(longpresstm);
		});
	},
	/***********表格荧光棒***********/
	jsPlugs_tableMouse: function (c) {
		this.each(function () {
			bg = c == undefined ? "#efefef" : c;
			$(this).hover(function () {
				bgc = this.style.backgroundColor;
				//this.style.backgroundColor = c;
				$(this).stop().animate({ backgroundColor: c }, 400);
			}, function () {
				$(this).stop().animate({ backgroundColor: bgc }, 0);
			});
		});
	},
	/***********表格隔行变色***********/
	jsPlugs_tableColor: function (ceven, codd) {
		this.each(function () {
			var bg1 = ceven == undefined ? "#fff" : ceven;
			var bg2 = codd == undefined ? "#f7f7f7" : codd;
			$("table>tbody>tr:odd").css("background-Color", bg1);
			$("table>tbody>tr:even").css("background-Color", bg2);
		});
	},
	jsPlugs_formValidator: function (e) {
		this.each(function () {
			$(this).validate({
				rules: e.rules,
				messages: e.messages,
				errorPlacement: function (error, element) {
					element.removeClass("error");
					element.next().text(error.text()).removeClass("success").removeAttr("style");
					element.next().text(error.text()).addClass("error");

				},
				success: function (label, element) {
					$(element).next().removeClass("error");
					if (e.addSuccess != undefined) {
						$(element).next().html(e.addSuccess.message).addClass("success").css("color", e.addSuccess.color);
					}
					else {
						$(element).next().html();
					}
				}
			});
			var settings = $.data(this, 'validator').settings;
			settings.submitHandler = e.submitHandler;
		});
	},
	/**************分页效果***************/
	jsPlugs_pageRecord: function (e) {
		this.each(function () {
			plugspagerecordEventargs = e;
			var sender = $(this);
			plugspagerecordsender = sender;
			e.currentPage = e.currentPage || 1;
			e.tableId = e.tableId || "tbRecord";
			e.pageSize = e.pageSize || 8;
			e.pageNumWidth = e.pageNumWidth || 200, 	//翻页  页码的宽度，可选   默认为 300
			e.firstText = e.firstText || "首&nbsp;&nbsp;&nbsp;页", 	//first的文字  可选   默认为 First
			e.prevText = e.prevText || "上一页", 	//上一页的文字  可选   默认为 Prev
			e.nextText = e.nextText || "下一页", 	//下一页的文字  可选   默认为Next
			e.lastText = e.lastText || "尾&nbsp;&nbsp;&nbsp;页", 		//尾页的文字    可选  默认为   Last
			e.showProgressBar = e.showProgressBar || false; //是否显示延迟进度条
			e.hasSelectColumn = e.hasSelectColumn || false;
			e.hasEditColumn = e.hasEditColumn || false; 	//是否显示修改列
			e.hasDeleteColumn = e.hasDeleteColumn || false; //是否显示删除列
			e.hasColumnsHeader = e.hasColumnsHeader == undefined ? true : e.hasColumnsHeader;
			e.btnGoText = e.btnGoText || "Go";
			if (e.showProgressBar) { $.jsPlugs_ProgressBar(); }
			$.ajax({
				type: "post",
				url: e.dataUrl,
				data: { psize: e.pageSize, cpage: e.currentPage },
				success: function (d) {
					var obj = null;
					var pageCount = -1;

					//var o = $.parseJSON(d);
					var o = d;
					for (var i in o) {
						if (i != "pagecount")
							obj = o[i];
						else
							pageCount = parseInt(o[i]);
					}

					if (pageCount > 0) {
						/*生成分页*/
						var plugs_pages = "<div id='dvpagerecordplugs'><div id='dvpagerecordfirst'><ul><li id='lipagerecordfirst'>" + e.firstText + "</li><li id='dvpagerecordprev'>" + e.prevText + "</li></ul></div>";
						plugs_pages += "<div id='dvpagerecordcontent'><ul class='ulpagerecordcontent'>";
						for (var i = 1; i <= pageCount; i++) {
							plugs_pages += "<li>" + i + "</li>";
						}
						plugs_pages += "</ul></div>";
						plugs_pages += "<div id='dvpagerecordlast'><ul><li id='dvpagerecordnext'>" + e.nextText + "</li><li id='lipagerecordlast'>" + e.lastText + "</li></ul></div>";
						plugs_pages += "<div id='dvpagerecordNumGo'><input type='text' id='pageRecordtxtNumGo' /><input type='button' id='pageRecordBtnNumGo'  onclick='pageRecordBtnNumGo_click()' value='" + e.btnGoText + "' /><div></div>";

						var table = "";
						if (e.showType == undefined) {
							table = pageRecord_createTable(e, obj, plugs_pages);
						}
						else {
							table = e.showType(e, obj, plugs_pages);
						}
						sender.html(table);



						/*设定选中   效果*/
						$("#dvpagerecordcontent li").eq(e.currentPage - 1).css("background-Color", "#d2d2d2").css("color", "#000");
						//            			/*设定选中的位置*/
						var selectedIndex = e.currentPage - 1;
						var lf = 0;
						for (var i = 0; i < selectedIndex; i++) {
							lf += ($(".ulpagerecordcontent>li")[i].offsetWidth + 1);
						}
						lf -= e.pageNumWidth;
						lf += (e.pageNumWidth / 2);
						$("#dvpagerecordcontent").stop().animate({ scrollLeft: lf }, 20);

						/*  设定宽度   设定表格  效果  */
						if (pageCount < 5) e.pageNumWidth = 30 * pageCount;
						$("#dvpagerecordcontent").css("width", e.pageNumWidth);
						/*分页ul li 移入  移出	  特效*/
						$("#dvpagerecordplugs li").hover(function () {
							plugslibgc = this.style.backgroundColor;
							lifontcolor = this.style.color;
							$(this).stop().animate({ backgroundColor: "#d2d2d2", color: "#000" }, 200);
						}, function () {
							$(this).stop().css("backgroundColor", plugslibgc);
							$(this).stop().css("color", lifontcolor);
						});


						/*  各个按钮效果   */
						/*	首页      尾页   li  点击效果	*/
						$("#lipagerecordfirst").click(function () {
							$("#dvpagerecordcontent").stop().animate({ scrollLeft: 0 }, 300, function () {
								$("#dvpagerecordcontent").stop();
								e.currentPage = $("#dvpagerecordcontent li").first().html();
								sender.jsPlugs_pageRecord(e);
							});
						});
						$("#lipagerecordlast").click(function () {
							var val = $("#dvpagerecordcontent")[0].scrollWidth;
							$("#dvpagerecordcontent").stop().animate({ scrollLeft: val + "px" }, 300, function () {
								$("#dvpagerecordcontent").stop();
								e.currentPage = $("#dvpagerecordcontent li").last().html();
								sender.jsPlugs_pageRecord(e);
							});
						});


						/*  上一页   下一页  li 长按效果  */
						$("#dvpagerecordnext").jsPlugs_longPress(300, function () {
							var val = $("#dvpagerecordcontent").scrollLeft();
							val += (e.pageNumWidth / 3);
							$("#dvpagerecordcontent").stop().animate({ scrollLeft: val }, 300);
						});
						$("#dvpagerecordprev").jsPlugs_longPress(300, function () {
							var val = $("#dvpagerecordcontent").scrollLeft();
							val -= (e.pageNumWidth / 3);
							$("#dvpagerecordcontent").stop().animate({ scrollLeft: val }, 300);
						});
						$("#dvpagerecordnext,#dvpagerecordprev").mouseout(function () {
							$("#dvpagerecordcontent").stop();
							clearTimeout(longpresstm);
						});

						//点击页码 刷新页面数据
						$("#dvpagerecordcontent li").click(function () {
							e.currentPage = $(this).html();
							sender.jsPlugs_pageRecord(e);
						});

					}
					else {
						sender.html("没有查询到数据");
					}
				},
				error: function () {
					alert("error");
				},
				complete: function (request, settings) {
					$.jsPlugs_ProgressBarClose();
					if (e.customColumns) {
						for (var i = 0; i < $(".td_customcolumns").length; i++) {
							var td = $(".td_customcolumns").eq(i);
							var id = td.attr("id");
							var clsId = id.split('_')[3];
							var clsIndex = id.split('_')[2];
							td.bind("click", { key: clsId }, e.customColumns[clsIndex].clickEvent);
						}
					}
					if (e.hasEditColumn && e.hasEditColumn.clickEvent) {
						for (var i = 0; i < $(".td_column_edit").length; i++) {
							var id = $(".td_column_edit").eq(i).attr("id");
							id = id.split('_')[id.split('_').length - 1];
							$(".td_column_edit").eq(i).bind("click", { key: id }, e.hasEditColumn.clickEvent);
						}
					}
					if (e.hasDeleteColumn && e.hasDeleteColumn.clickEvent) {
						for (var i = 0; i < $(".td_column_delete").length; i++) {
							var id = $(".td_column_delete").eq(i).attr("id");
							id = id.split('_')[id.split('_').length - 1];
							$(".td_column_delete").eq(i).bind("click", { key: id }, e.hasDeleteColumn.clickEvent);
						}
					}
					if (e.complated != undefined) { e.complated(); }

				}
			});
		});
	}
});
$(function () {
	jsPlugs_pageRecordCheckbox_All_click = function () {
		if ($("#jsPlugs_pageRecordCheckbox_All").attr("checked") != undefined) {
			$(".jsPlugs_pageRecordCheckbox_index").attr("checked", "checked");
		}
		else {
			$(".jsPlugs_pageRecordCheckbox_index").removeAttr("checked");
		}
	};
});

  
  