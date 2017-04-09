(function (win, $) {
    'use strict';
    win.examProject = win.examProject || {};
    win.examProject.common = win.examProject.common || {};

    var UTIL = win.examProject.common.util;

    win.examProject.slideObj = function (container, args) {
        var defParams = {
            prevBtn : '.btn_prev',
            nextBtn : '.btn_next',
            contWrap : '.slide_cont',
            dotWrap : '.slide_tab',
            activeClass : 'active'
        };
        this.obj = container;
        this.opts = UTIL.def(defParams, (args || {}));
        this.init();
    };
    win.examProject.slideObj.prototype = {
        init : function () {
            this.setElements();
            this.setLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.slideWrap = this.obj.find(this.opts.contWrap);
            this.slideCont = this.slideWrap.children();
            this.btnPrev = this.obj.find(this.opts.prevBtn);
            this.btnNext = this.obj.find(this.opts.nextBtn);
            this.dotWrap = this.obj.find(this.opts.dotWrap).find('ul');
            this.dotBtn = this.dotWrap.children();
        },
        bindEvents : function () {
            this.btnPrev.on('click', $.proxy(this.prevFunc, this));
            this.btnNext.on('click', $.proxy(this.nextFunc, this));
            this.dotBtn.on('click', $.proxy(this.dotFunc, this));
        },
        setLayout : function () {
            this.direction = 'next';
            this.oldIndex = this.currentIndex = 0;
            this.slideCont.css('left', '100%');
            this.slideCont.eq(this.currentIndex).css('left', '0');
        },
        prevFunc : function () {
            this.direction = 'prev';
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.slideCont.length - 1;
            }
            this.setView();
        },
        nextFunc : function () {
            this.direction = 'next';
            this.currentIndex++;
            if (this.currentIndex === this.slideCont.length) {
                this.currentIndex = 0;
            }
            this.setView();
        },
        dotFunc : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            this.currentIndex = target.closest('li').index();
            if (this.oldIndex === this.currentIndex) return; 
            if (this.currentIndex < this.oldIndex) {
                this.direction = 'prev';
            } else {
                this.direction = 'next';
            }
            this.setView();
        },
        setView : function () {
            if (this.direction === 'next') {
                this.slideCont.eq(this.oldIndex).stop().animate({
                    'left' : '-100%'
                });
                this.slideCont.eq(this.currentIndex).css({
                    'left' : '100%'
                }).stop().animate({
                    'left' : 0
                });
            } else if (this.direction === 'prev') {
                this.slideCont.eq(this.oldIndex).stop().animate({
                    'left' : '100%'
                });
                this.slideCont.eq(this.currentIndex).css({
                    'left' : '-100%'
                }).stop().animate({
                    'left' : 0
                });
            }
            this.dotBtn.eq(this.oldIndex).removeClass(this.opts.activeClass);
            this.dotBtn.eq(this.currentIndex).addClass(this.opts.activeClass);
            this.oldIndex = this.currentIndex;
        }
    };
    $.fn.examProjectslideObj = function (args) {
        var returnLengths = [];
        for (var i = 0, max = $(this).length; i < max; i++) {
            returnLengths.push(new win.examProject.slideObj($(this).eq(i), args));
        }
        return returnLengths;
    };

    $(function () {
        $('.js-slide-wrap').examProjectslideObj();
    });
})(window, window.jQuery);
