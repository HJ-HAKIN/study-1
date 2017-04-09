(function (win, $) {
    'use strict';
    win.examProject = win.examProject || {};
    win.examProject.common = win.examProject.common || {};

    var UTIL = win.examProject.common.util;

    win.examProject.tabObj = function (container, args) {
        var defParams = {
            wrap : '.cast_tab',
            tabParent : 'ul',
            tabCont : '.cast_cont',
            btnArea : '.cast_btn',
            btnPrev : '.btn_prev',
            btnNext : '.btn_next',
            castNum : '.cast_num',
            castCurrentNum : '.current',
            castTotalNum : '.total',
            toggleClass : 'active'
        };
        this.obj = container;
        this.opts = UTIL.def(defParams, (args || {}));
        this.init();
    };
    win.examProject.tabObj.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
            this.setLayout();
        },
        setElements : function () {
            this.wrap = this.obj.find(this.opts.wrap);
            this.tabMenu = this.wrap.find(this.opts.tabParent);
            this.tabList = this.tabMenu.children();
            this.tabContentWrap = this.obj.find(this.opts.tabCont);
            this.tabContList = this.tabContentWrap.children();
            this.castNumWarp = this.obj.find(this.opts.castNum);
            this.castCurrent = this.castNumWarp.find(this.opts.castCurrentNum);
            this.castTotal = this.castNumWarp.find(this.opts.castTotalNum);
            this.prevBtn = this.obj.find(this.opts.btnPrev);
            this.nextBtn = this.obj.find(this.opts.btnNext);
        },
        setLayout : function () {
            var getHash = win.location.hash,
                hashTarget = this.tabContList.filter(getHash);
            this.tabList.removeClass('active');
            this.tabContList.hide();
            this.currentIndex = (hashTarget.length) ? hashTarget.index() : 0;
            this.listLength = this.tabList.length;
            this.castTotal.text(this.listLength);
            this.setView();
        },
        bindEvents : function () {
            this.tabList.on('click', '> a', $.proxy(this.tabFunc, this));
            this.prevBtn.on('click', $.proxy(this.prevFunc, this));
            this.nextBtn.on('click', $.proxy(this.nextFunc, this));
            $(win).on('hashchange', $.proxy(this.initLoadHash, this));
        },
        tabFunc : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            this.currentIndex = target.closest('li').index();
            if (this.oldIndex === this.currentIndex) return;
            this.getHashId();
        },
        prevFunc : function () {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.listLength - 1;
            }
            this.getHashId();
        },
        nextFunc : function () {
            this.currentIndex++;
            if (this.currentIndex >= this.listLength) {
                this.currentIndex = 0;
            }
            this.getHashId();
        },
        setView : function () {
            this.tabList.eq(this.currentIndex).addClass(this.opts.toggleClass);
            this.tabContList.eq(this.currentIndex).show();
            this.tabList.eq(this.oldIndex).removeClass(this.opts.toggleClass);
            this.tabContList.eq(this.oldIndex).hide();
            this.oldIndex = this.currentIndex;
            this.castCurrent.text(this.currentIndex + 1);
        },
        initLoadHash : function () {
            var getHash = win.location.hash;
            this.currentIndex = (getHash) ? $(getHash).index() : 0;
            this.setView();
        },
        getHashId : function () {
            var hashNum = this.tabContList.eq(this.currentIndex).attr('id');
            win.location.hash = '#' + hashNum;
        }
    };
    $.fn.examProjectTabObj = function (args) {
        var returnLengths = [];
        for (var i = 0, max = $(this).length; i < max; i++) {
            returnLengths.push(new win.examProject.tabObj($(this).eq(i), args));
        }
        return returnLengths;
    };

    $(function () {
        $('.js-tab-wrap').examProjectTabObj();
    });
})(window, window.jQuery);
