// JScript source code
/*
调用示例
$.conlitionTable({
    rows: $("#tb1 tbody tr"),    //必须要有的参数  需要合并的所有行
    direction: "h",                      //可选  h为水平合并  v 是垂直合并(默认)
    //urows:[1]                
});

$.conlitionTable({
    rows: $("#tb3 tbody tr"),    //必须要有的参数  需要合并的所有行
    direction: "v",                      //可选  h为水平合并  v 是垂直合并(默认)
    ucols: [0,3]                        //可选 如果为v合并  columns代表那几列  不写代表所有列
});

*/
$.extend({
    conlitionTable: function (e) {
        var _ucols = e.ucols ? e.ucols : "";
        var _urows = e.urows ? e.urows : "";
        var _rows = e.rows;
        var _rlength = _rows.length;                //表格的行数
        var _clength = _rows[0].cells.length;   //表格的列数
        var _direction = !e.direction ? "v" : e.direction;
        conlition = function () {
            if (_direction == "h") {
                for (var i = _rlength - 1; i >= 0; i--) {
                    var colspan = 1;        //跨行数
                    var _cv = { v: "", r: "", c: "" }; //cv当前格        v=值  r=行 c=列
                    var _pv = { v: "", r: "", c: "" }; //pv上一格值     v=值  r=行 c=列
                    _cv.v = _rows[i].cells[_clength - 1].innerHTML; ;
                    _cv.r = i;
                    _cv.c = _clength - 1;
                    for (var j = _clength - 2; j >= 0; j--) {
                        if (_urows != "") {
                            for (var k = _urows.length - 1; k >= 0; k--) {
                                if (_urows[k] == i) {
                                    _pv.v = _rows[i].cells[j].innerHTML;
                                    _pv.r = i;
                                    _pv.c = j;
                                    if (_cv.v == _pv.v) {
                                        colspan += 1;
                                        _rows[_pv.r].cells[_pv.c].colSpan = colspan;
                                        _rows[_pv.r].deleteCell(_cv.c);
                                    }
                                    else {
                                        colspan = 1;
                                    }
                                    _cv.v = _pv.v;
                                    _cv.r = _pv.r;
                                    _cv.c = _pv.c;
                                }
                            }
                        }
                        else {
                            _pv.v = _rows[i].cells[j].innerHTML;
                            _pv.r = i;
                            _pv.c = j;
                            if (_cv.v == _pv.v) {
                                colspan += 1;
                                _rows[_pv.r].cells[_pv.c].colSpan = colspan;
                                _rows[_pv.r].deleteCell(_cv.c);
                            }
                            else {
                                colspan = 1;
                            }
                            _cv.v = _pv.v;
                            _cv.r = _pv.r;
                            _cv.c = _pv.c;
                        }
                    }
                }
            }
            //纵向合并开始
            if (_direction == "v") {
                for (var i = _clength - 1; i >= 0; i--) {
                    var rowspan = 1;        //跨行数
                    var _cv = { v: "", r: "", c: "" }; //cv当前格        v=值  r=行 c=列
                    var _pv = { v: "", r: "", c: "" }; //pv上一格值     v=值  r=行 c=列
                    _cv.v = _rows[_rlength - 1].cells[i].innerHTML; ;
                    _cv.r = _rlength - 1;
                    _cv.c = i;
                    for (var j = _rlength - 2; j >= 0; j--) {
                        if (_ucols != "") {
                            for (var k = _ucols.length - 1; k >= 0; k--) {
                                if (_ucols[k] == i) {
                                    _pv.v = _rows[j].cells[i].innerHTML;
                                    _pv.r = j;
                                    _pv.c = i;
                                    if (_cv.v == _pv.v) {
                                        rowspan += 1;
                                        _rows[_pv.r].cells[i].rowSpan = rowspan;
                                        _rows[_cv.r].deleteCell(_cv.c);
                                    }
                                    else {
                                        rowspan = 1;
                                    }
                                    _cv.v = _pv.v;
                                    _cv.r = _pv.r;
                                    _cv.c = _pv.c;
                                }
                            }
                        }
                        else {
                            _pv.v = _rows[j].cells[i].innerHTML;
                            _pv.r = j;
                            _pv.c = i;
                            if (_cv.v == _pv.v) {
                                rowspan += 1;
                                _rows[_pv.r].cells[i].rowSpan = rowspan;
                                _rows[_cv.r].deleteCell(_cv.c);
                            }
                            else {
                                rowspan = 1;
                            }
                            _cv.v = _pv.v;
                            _cv.r = _pv.r;
                            _cv.c = _pv.c;
                        }
                    }
                }
            }
            //纵向合并结束        
        }
        conlition();
    }
});