# [Prototype] Javascript Source
<br>

## prototype source
```javascript
// prototype 호출구문
window.funcName = function () {
    this.init();
};
// prototype 선언구문
window.funcName.prototype = {
    init : function () {
        this.setElements();
    },
    setElements : function () {
        window.console.log('call');
    }
};
// 함수호출구문
var funcObj = new window.funcName();
```
<br>

# [Prototype] Javascript Convention
<br>

## project 객체에 종속시킨다.
```javascript
(function (win, $) {
    'use strict';
    win.projectName = win.projectName || {};
    win.projectName.common = win.projectName.common || {};

    var UTIL = win.projectName.common.util;

    // prototype 호출구문
    win.projectName.funcName = function (container, args) {
        var defParams = {
        };
        if(!(this.obj = $(container)).length) return;
        this.opts = UTIL.def(defParams, (args || {}));
        this.init();
    };
    // prototype 선언구문
    win.projectName.funcName.prototype = {
        init : function () {
            this.setElements();
        },
        setElements : function () {
            win.console.log('call');
            win.console.log(UTIL);
        }
    };

    $(function () {
        win.projectFuncName = new win.projectName.funcName(selector, {});
    });
})(window, window.jQuery);
```
<br>

## 페이지내에 같은 기능을 2군데 이상 쓸경우 플러그인 코드를 추가
* class 나 태그의 유무를 체크하는 hasClass() / is() 메서드로, option 의 분기를 준다.

```javascript
(function (win, $) {
    'use strict';
    win.projectName = win.projectName || {};
    win.projectName.common = win.projectName.common || {};

    var UTIL = win.projectName.common.util;

    // prototype 호출구문
    win.projectName.funcName = function (container, args) {
        var defParams = {
        };
        this.obj = container;
        this.opts = UTIL.def(defParams, (args || {}));
        this.init();
    };
    // prototype 선언구문
    win.projectName.funcName.prototype = {
        init : function () {
            this.setElements();
        },
        setElements : function () {
            win.console.log('call');
            win.console.log(UTIL);
        }
    };
    $.fn.projectPluginName = function (args) {
        var lengthReturns = [];
        for (var i = 0, max = $(this).length; i < max; i++) {
            var _this = $(this).eq(i);
            lengthReturns.push(new win.projectName.funcName(_this, args));
        }
        return lengthReturns;
    };

    $(function () {
        win.projectPlugins = $(selector).projectPluginName({});
    });
})(window, window.jQuery);
```
