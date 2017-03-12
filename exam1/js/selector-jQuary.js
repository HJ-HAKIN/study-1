(function (win, $) {
	'use strict';
	win.exam = win.exam || {};

	win.exam.examObj1 = function (container, args) {
		var defParams = {
			wrap : '.exam_wrap',
			contBox : '.exam_q',
			viewBtn : '.btn_view',
			activeClass : '.active',
			activeId : '#active',
			bgElement : 'background-color',
			bgColor : 'yellow'
		}
		this.obj = container;
        this.opts = $.extend({}, defParams, (args || {}));
        this.init();
	};
	win.exam.examObj1.prototype = {
		init : function () {
			this.setElements();
			this.bindEvents();
		},
		setElements : function () {
			this.box1 = $(this.opts.wrap)[0];
			this.box2 = $(this.opts.wrap)[1];
			this.box3 = $(this.opts.wrap)[2];
			this.box4 = $(this.opts.wrap)[3];
			this.box5 = $(this.opts.wrap)[4];
			this.box6 = $(this.opts.wrap)[5];
			this.box7 = $(this.opts.wrap)[6];
			this.box8 = $(this.opts.wrap)[7];
			this.box1Btn = $(this.box1).find(this.opts.viewBtn);
			this.box2Btn = $(this.box2).find(this.opts.viewBtn);
			this.box3Btn = $(this.box3).find(this.opts.viewBtn);
			this.box4Btn = $(this.box4).find(this.opts.viewBtn);
			this.box5Btn = $(this.box5).find(this.opts.viewBtn);
			this.box6Btn = $(this.box6).find(this.opts.viewBtn);
			this.box7Btn = $(this.box7).find(this.opts.viewBtn);
			this.box8Btn = $(this.box8).find(this.opts.viewBtn);
		},
		bindEvents : function () {
			this.box1Btn.on('click', $.proxy(this.onClickFunc1, this));
			this.box2Btn.on('click', $.proxy(this.onClickFunc2, this));
			this.box3Btn.on('click', $.proxy(this.onClickFunc3, this));
			this.box4Btn.on('click', $.proxy(this.onClickFunc4, this));
			this.box5Btn.on('click', $.proxy(this.onClickFunc5, this));
			this.box6Btn.on('click', $.proxy(this.onClickFunc6, this));
			this.box7Btn.on('click', $.proxy(this.onClickFunc7, this));
			this.box8Btn.on('click', $.proxy(this.onClickFunc8, this));
		},
		onClickFunc1 : function () {
			$(this.box1).find(this.opts.contBox).children().css(this.opts.bgElement, this.opts.bgColor);
		},
		onClickFunc2 : function () {
			$(this.box2).find('span').css(this.opts.bgElement, this.opts.bgColor);
		},
		onClickFunc3 : function () {
			$(this.box3).find('em span').css(this.opts.bgElement, this.opts.bgColor);
		},
		onClickFunc4 : function () {
			$(this.box4).find('div > span').css(this.opts.bgElement, this.opts.bgColor);
			$(this.box4).find('em > span').css(this.opts.bgElement, this.opts.bgColor);
		},
		onClickFunc5 : function () {
			$(this.box5).find('.exam_q div').siblings('p').css(this.opts.bgElement, this.opts.bgColor);
		},
		onClickFunc6 : function () {
			$(this.box6).find('.exam_q div').siblings('span').css(this.opts.bgElement, this.opts.bgColor);
		},
		onClickFunc7 : function () {
			$(this.box7).find(this.opts.activeClass).css(this.opts.bgElement, this.opts.bgColor);
		},
		onClickFunc8 : function () {
			$(this.box8).find(this.opts.activeId).css(this.opts.bgElement, this.opts.bgColor);
		}
	};

	$.fn.examInit = function (args) {
        var returnLengths = new win.exam.examObj1;
    }

	$(function () {
        $('.exam_wrap').examInit();
    });
})(window, window.jQuery);