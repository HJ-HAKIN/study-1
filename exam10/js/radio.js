(function (win, $) {
    'use strict';
    win.examProject = win.examProject || {};
    win.examProject.common = win.examProject.common || {};

    var UTIL = win.examProject.common.util;

    win.examProject.radioBoxUi = function (container, args) {
        var defParams = {
            rdoBox : '.radio_box',
            iptRdo : '.ipt_rdo',
            activeClass : 'rdo_active'
        };
        this.obj = container;
        this.opts = UTIL.def(defParams, (args || {}));
        this.init();
    };
    win.examProject.radioBoxUi.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.radioBox = this.obj.find(this.opts.rdoBox);
            this.inputRadio = this.radioBox.find(this.opts.iptRdo);
        },
        bindEvents : function () {
            this.inputRadio.on('change', $.proxy(this.changBox, this));
        },
        changBox : function (e) {
            var target = $(e.currentTarget);
            if (target.closest(this.opts.rdoBox).hasClass(this.opts.activeClass)) return;
            this.radioBox.removeClass(this.opts.activeClass);
            target.closest(this.opts.rdoBox).toggleClass(this.opts.activeClass, target.prop('checked'));
        }
    };
    $.fn.examProjectRadiokBoxUi = function (args) {
        var returnLengths = [];
        for (var i = 0, max = $(this).length; i < max; i++) {
            returnLengths.push(new win.examProject.radioBoxUi($(this).eq(i), args));
        }
        return returnLengths;
    };

    $(function () {
        $('.js-radio-wrap').examProjectRadiokBoxUi();
    });
})(window, window.jQuery);