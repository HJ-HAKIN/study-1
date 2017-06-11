(function (win, $) {
    'use strict';
    win.examProject = win.examProject || {};
    win.examProject.common = win.examProject.common || {};

    var UTIL = win.examProject.common.util;

    win.examProject.checkBoxUi = function (args) {
        var defParams = {
            container : '.box1',
            chkBx : '.check_box',
            iptChk : '.ipt_chk',
            activeClass : 'chk_active'
        };
        this.opts = UTIL.def({}, defParams, (args || {}));
        if (!(this.obj = $(this.opts.container)).length) return;
        this.init();
    };
    win.examProject.checkBoxUi.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
            this.initLayout();
        },
        setElements : function () {
            this.inputCheck = this.obj.find(this.opts.iptChk);
        },
        initLayout : function () {
            this.inputCheck.filter(':checked').closest(this.obj).addClass(this.opts.activeClass);
            this.inputCheck.filter(':not(:checked)').closest(this.obj).removeClass(this.opts.activeClass);
        },
        bindEvents : function () {
            this.inputCheck.on('change', $.proxy(this.changBox, this));
        },
        changBox : function (e) {
            var target = $(e.currentTarget);
            target.closest(this.obj).toggleClass(this.opts.activeClass, target.prop('checked'));
        }
    };

    $(function () {
        var checkBoxUi = new win.examProject.checkBoxUi();
    });
})(window, window.jQuery);