(function (win, $) {
    'use strict';
    win.examProject = win.examProject || {};
    win.examProject.common = win.examProject.common || {};

    var UTIL = win.examProject.common.util;

    win.examProject.selectBoxUi = function (container, args) {
        var defParams = {
            selectBox : '.select_box',
            selectBtn : '.select_menu',
            selectMenu : 'ul',
            activeClass : 'opened'
        };
        this.obj = container;
        this.opts = UTIL.def(defParams, (args || {}));
        this.init();
    };
    win.examProject.selectBoxUi.prototype = {
        init : function () {
            this.setElements();
            this.setLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.selectBox = this.obj.find(this.opts.selectBox);
            this.selectObj = this.obj.find(this.opts.selectMenu);
            this.selectBtn = this.obj.find(this.opts.selectBtn);
            this.selectChild = this.selectObj.children();
        },
        setLayout : function () {
            this.selectObj.hide();
        },
        bindEvents : function () {
            this.selectBtn.on('click', $.proxy(this.toggleFunc, this));
            this.selectChild.on('click', '>a', $.proxy(this.onChangeText, this));
        },
        toggleFunc : function (e) {
            e.preventDefault();
            if (!this.selectObj.is(':visible')) {
                this.selectObj.show();
                this.obj.on('clickoutside', $.proxy(this.outsideFunc, this));
            } else {
                this.selectObj.hide();
                this.obj.off('clickoutside');
            }
            this.obj.toggleClass('opened');
        },
        outsideFunc : function () {
            this.selectBtn.triggerHandler('click');
        },
        onChangeText : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget),
                targetText = target.text();
            this.selectBtn.text(targetText);
            this.outsideFunc();
        }
    };
    $.fn.examProjectSelectBoxUi = function (args) {
        var returnLengths = [];
        for (var i = 0, max = $(this).length; i < max; i++) {
            returnLengths.push(new win.examProject.selectBoxUi($(this).eq(i), args));
        }
        return returnLengths;
    };

    $(function () {
        $('.js-select-wrap').examProjectSelectBoxUi();
    });
})(window, window.jQuery);