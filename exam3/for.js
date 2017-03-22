$(function(){
	'use strict';

	var box1 = $('.exam_q').eq(0),
		box2 = $('.exam_q').eq(1),
		box3 = $('.exam_q').eq(2),	
		box4 = $('.exam_q').eq(3);

	var input1 = function () {
		var a = 0;
		while (a < 5) {
			box1.append('<div><input type="checkbox">' + (a + 1) + '</div>');
			a++;
		}
	};
	input1();

	var input2 = function () {
		for (var i = 0; i < 5; i++) {
			if (i % 2 === 1) {
				box2.append('<div><input type="text" placeholder="짝수"></div>');
			} else {
				box2.append('<div><input type="checkbox">홀수</div>');
			}
		}
	};
	_input2();

	var table1 = function() {
		for (var i = 1; i < 10; i++) {
			box3.append("<div>" + "7" + " x " + i + " = " + 7 * i + "</div>");
		}
	};
	_table1();

	var table2 = function () {
		var a = 2;
		while (a < 10) {
			for (var i = 1; i < 10; i++) {
				box4.append("<div>" + a + " x " + i + " = " + a * i + "</div>");
			}
			a++;
		}
	}
	table2();
});
