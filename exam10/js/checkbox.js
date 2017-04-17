(function (win, $) {
    'use strict';
    win.examProject = win.examProject || {};
    win.examProject.common = win.examProject.common || {};

    var UTIL = win.examProject.common.util;

    win.examProject.checkBoxUi = function (container, args) {
        var defParams = {
            chkBox : '.check_box',
            iptChk : '.ipt_chk',
            activeClass : 'chk_active'
        };
        this.obj = container;
        this.opts = UTIL.def(defParams, (args || {}));
        this.init();
    };
    win.examProject.checkBoxUi.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.checkBox = this.obj.find(this.opts.chkBox);
            this.inputCheck = this.checkBox.find(this.opts.iptChk);
        },
        bindEvents : function () {
            this.inputCheck.on('change', $.proxy(this.changBox, this));
        },
        changBox : function (e) {
            var target = $(e.currentTarget);
            target.closest(this.opts.chkBox).toggleClass(this.opts.activeClass, target.prop('checked'));
        }
    };
    $.fn.examProjectCheckBoxUi = function (args) {
        var returnLengths = [];
        for (var i = 0, max = $(this).length; i < max; i++) {
            returnLengths.push(new win.examProject.checkBoxUi($(this).eq(i), args));
        }
        return returnLengths;
    };

    $(function () {
        $('.js-check-wrap').examProjectCheckBoxUi();
    });
})(window, window.jQuery);