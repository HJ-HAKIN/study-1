# [UTIL] Javascript Source
<br>

## 반응형 브라우저 체크 ( IE9+, Chrome, Firefox, Safari, Opera )
* css3 속성이 있는지 체크.
* **[Type]** true / false
* **[사용]** 반응형 브라우저일 경우 A, 아닐경우 B 함수를 실행하는 조건문에 사용

```javascript
var isSupportTransform = (function () {
    return ('WebkitTransform' in document.body.style || 'MozTransform' in document.body.style || 'msTransform' in document.body.style || 'OTransform' in document.body.style || 'transform' in document.body.style);
})();
```
<br>

## 디바이스 체크
* touch 이벤트가 있는지 체크. 
* **[Type]** true / undefined
* **[사용]** 디바이스일 경우 A, 아닐경우 B 함수를 실행하는 조건문에 사용

```javascript
var isDevice = (function () {
    return ('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch));
})();
```
<br>

## window OS Safari 브라우저 체크
* window OS Safari 브라우저만 선택될수 있는 navigator 속성을 모두 체크.
* **[Type]** true / false
* **[사용]** window OS Safari일 경우 A, 아닐경우 B 함수를 실행하는 조건문에 사용

```javascript
var isWinSafari = (function () {
    var appNetscape = (navigator.appName === "Netscape"),
        appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
        userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
        userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
    return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
})();
```
<br>

## window 넓이값 체크

* css3의 mediaquery 값과 똑같은 넓이값으로 인식되는 문법을 써야함
* **[Type]** Number
* **[사용]** mediaquery 값에 따라 인터렉션을 바꾸어야 할때 사용.

```javascript
var winWidth = function () {
    return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
};
```

* window OS의 Safari 브라우저는, 스크롤이 있을때 없을때의 mediaquery  인식값이 다름.
* window OS의 Safari 일 경우만 jQuery .width() 로 처리.

```javascript
var winWidth = (function () {
    if (isWinSafari) {
        return function () {
            return $(window).width();
        }
    } else {
        return function () {
            return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
        }
    }
})();
```
<br>

## 옵션값 merge

* 기본 객체구문에 추가 객체구문을 Merge 하는 구문.
* **[사용]** 모듈/플러그인 등에서 기본옵션을 사용자가 추가하는 옵션으로 바꾸어야 할때 사용.

```javascript
var hasOwnProperty = Object.prototype.hasOwnPropety,
def = function (org, src) {
	for (var prop in src) {
        if (!hasOwnProperty.call(src, prop)) continue;
        if ('object' === $.type(org[prop])) {
            org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : def(org[prop], src[prop]);
        } else {
            org[prop] = src[prop];
        }
    }
    return org;
};
```
<br>

## requestAnimationFrame 애니메이션 설정

* 애니메이션을 구현하기 위한 이벤트를 계속 쌓이게 하지 않고, 브라우저자체의 requestAnimationFrame 을 써야함. [참고](https://msdn.microsoft.com/ko-kr/library/hh920765(v=vs.85).aspx)
* **[사용]**<br>1) 계속적으로 실행되어야 하는 애니메이션에 사용.<br>2) scroll / resize 시에 한번의 함수호출로, scroll / resize 이벤트시 매번 실행해야 할 함수를 확인할수 있음.<br>(scroll / resize 가 끝나는 시점에 cancel 해주어야 함.)
* 호출구문 오류시 [참고](http://stackoverflow.com/questions/9677985/uncaught-typeerror-illegal-invocation-in-chrome)

```javascript
var requestAFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function (callback) {
            return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
        };
})();
var cancelAFrame = (function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        };
})();
```
<br>

## 문자에서 maxByte에 해당되는 문자 길이값 체크

* 문자가 길 경우, maxByte 에 해당되는 길이값을 반환해줌.
* **[사용]** 문자가 길 경우 잘라야 할때, byte 에 잘라야 하는 문자 길이를 체크.

```javascript
var getRestrictBytes = function (str, maxBytes) {
    var strLeng = str.length,
        rByte = 0,
        rLen = 0,
        strChar = '';
    maxBytes = maxBytes || 100;
    for (var i = 0; i < strLeng; i++) {
        strChar = str.charAt(i);
        if (escape(strChar).length > 4) {
            rByte += 2;
        } else {
            rByte++;
        }
        if (rByte <= maxBytes) {
            rLen = i+1;
        }
    }
    return {
        bytes : rByte,
        rectLeng : rLen
    }
};
```
<br>

## 이미지 로딩완료시점 체크

* 이미지 로딩이 완료될때, callback 함수 실행
* **[사용]** 이미지가 로딩이 다 되어야 높이를 맞출수 있거나, 로딩이 다 된후 fadeIn() 효과를 주거나 할때 사용.

```javascript
var imgLoader = function (selector, callback) {
    $(selector).each(function () {
        var cb = (callback || function () {});
        /* for IE10- */
        if (this.complete || $(this).height() > 0) {
            cb.apply(this);
        } else {
            $(this).on('load', function () {
                cb.apply(this);
                $(this).off('load');
            });
        }
    });
};
```
<br>

# [UTIL] Javascript Convention
<br>

## 라이브러리를  제외한, 1개의 js 파일만 만들 경우
```javascript
(function (win, $, doc) {
    'use strict';
    win.projectName = win.projectName || {};

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    win.projectName.common = (function () {
        return {
            varStatic : {
                CSS : {
                    JS_IMG_SRC : 'js-img-src',
                    LAZY_LOADED : 'lazy-loaded'
                },
                DATA_ATTR : {
                    SRC_PC : 'data-src-pc',
                    SRC_MOBILE : 'data-src-mobile'
                },
                RESPONSIVE : {
                    TABLE : {
                        NAME : 'tablet',
                        WIDTH : 1280
                    },
                    MOBILE : {
                        NAME : 'mobile',
                        WIDTH : 768
                    }
                }
            },
            customEvent : {
                RESPONSIVE : {
                    GET_STATUS : 'RESPONSIVE_GET_STATUS',
                    CHANGE : 'RESPONSIVE_CHANGE'
                }
            },
            util : {
                isSupportTransform : (function () {
                    return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
                })(),
                isDevice : (function () {
                    return ('ontouchstart' in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
                })(),
                def : function (org, src) {
                    for (var prop in src) {
                        if (!hasOwnProperty.call(src, prop)) continue;
                        if ('object' === $.type(org[prop])) {
                            org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
                        } else {
                            org[prop] = src[prop];
                        }
                    }
                    return org;
                },
                winSize : (function () {
                    var isWinSafari = (function () {
                        var appNetscape = (navigator.appName === "Netscape"),
                            appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                            userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                            userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                        return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                    })();
                    if (isWinSafari) {
                        return function () {
                            var win_wh = {
                                w : $(win).width(),
                                h : $(win).height()
                            };
                            return win_wh;
                        }
                    } else {
                        return function () {
                            var win_wh = {
                                w : win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
                                h : win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
                            };
                            return win_wh;
                        }
                    }
                })(),
                requestAFrame : (function () {
                    return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame ||
                        function (callback) {
                            return win.setTimeout(callback, 1000 / 60);
                        };
                })(),
                cancelAFrame : (function () {
                    return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame ||
                        function (id) {
                            win.clearTimeout(id);
                        };
                })(),
                getRestrictBytes : function (str, maxBytes) {
                    var strLeng = str.length,
                        rByte = 0,
                        rLen = 0,
                        strChar = '';
                    maxBytes = maxBytes || 100;
                    for (var i = 0; i < strLeng; i++) {
                        strChar = str.charAt(i);
                        if (escape(strChar).length > 4) {
                            rByte += 2;
                        } else {
                            rByte++;
                        }
                        if (rByte <= maxBytes) {
                            rLen = i+1;
                        }
                    }
                    return {
                        bytes : rByte,
                        rectLeng : rLen
                    }
                },
                imgLoader : function (selector, callback) {
                    $(selector).each(function () {
                        var cb = (callback || function () {});
                        if (this.complete || $(this).height() > 0) {
                            cb.apply(this);
                        } else {
                            $(this).on('load', function () {
                                cb.apply(this);
                                $(this).off('load');
                            });
                        }
                    });
                }
            }
        }
    })();

    var UTIL = win.projectName.common.util;

    $(function () {
        win.console.log(UTIL);
    });
})(window, window.jQuery, window.document);
```
<br>

## 라이브러리를  제외한, common 용도로 UTIL을 따로 만들 경우
### common
```javascript
(function (win, $, doc) {
    'use strict';
    win.projectName = win.projectName || {};

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    win.projectName.common = (function () {
        return {
            varStatic : {
                CSS : {
                    JS_IMG_SRC : 'js-img-src',
                    LAZY_LOADED : 'lazy-loaded'
                },
                DATA_ATTR : {
                    SRC_PC : 'data-src-pc',
                    SRC_MOBILE : 'data-src-mobile'
                },
                RESPONSIVE : {
                    TABLE : {
                        NAME : 'tablet',
                        WIDTH : 1280
                    },
                    MOBILE : {
                        NAME : 'mobile',
                        WIDTH : 768
                    }
                }
            },
            customEvent : {
                RESPONSIVE : {
                    GET_STATUS : 'RESPONSIVE_GET_STATUS',
                    CHANGE : 'RESPONSIVE_CHANGE'
                }
            },
            util : {
                isSupportTransform : (function () {
                    return ('WebkitTransform' in doc.body.style || 'MozTransform' in doc.body.style || 'msTransform' in doc.body.style || 'OTransform' in doc.body.style || 'transform' in doc.body.style);
                })(),
                isDevice : (function () {
                    return ('ontouchstart' in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
                })(),
                def : function (org, src) {
                    for (var prop in src) {
                        if (!hasOwnProperty.call(src, prop)) continue;
                        if ('object' === $.type(org[prop])) {
                            org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
                        } else {
                            org[prop] = src[prop];
                        }
                    }
                    return org;
                },
                winSize : (function () {
                    var isWinSafari = (function () {
                        var appNetscape = (navigator.appName === "Netscape"),
                            appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
                            userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
                            userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
                        return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
                    })();
                    if (isWinSafari) {
                        return function () {
                            var win_wh = {
                                w : $(win).width(),
                                h : $(win).height()
                            };
                            return win_wh;
                        }
                    } else {
                        return function () {
                            var win_wh = {
                                w : win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
                                h : win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
                            };
                            return win_wh;
                        }
                    }
                })(),
                requestAFrame : (function () {
                    return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame ||
                        function (callback) {
                            return win.setTimeout(callback, 1000 / 60);
                        };
                })(),
                cancelAFrame : (function () {
                    return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame ||
                        function (id) {
                            win.clearTimeout(id);
                        };
                })(),
                getRestrictBytes : function (str, maxBytes) {
                    var strLeng = str.length,
                        rByte = 0,
                        rLen = 0,
                        strChar = '';
                    maxBytes = maxBytes || 100;
                    for (var i = 0; i < strLeng; i++) {
                        strChar = str.charAt(i);
                        if (escape(strChar).length > 4) {
                            rByte += 2;
                        } else {
                            rByte++;
                        }
                        if (rByte <= maxBytes) {
                            rLen = i+1;
                        }
                    }
                    return {
                        bytes : rByte,
                        rectLeng : rLen
                    }
                },
                imgLoader : function (selector, callback) {
                    $(selector).each(function () {
                        var cb = (callback || function () {});
                        if (this.complete || $(this).height() > 0) {
                            cb.apply(this);
                        } else {
                            $(this).on('load', function () {
                                cb.apply(this);
                                $(this).off('load');
                            });
                        }
                    });
                }
            }
        }
    })();
})(window, window.jQuery, window.document);
```

### add
```javascript
(function (win, $) {
    'use strict';
    win.projectName = win.projectName || {};
    win.projectName.common = win.projectName.common || {};

    var UTIL = win.projectName.common.util;

    $(function () {
        win.console.log(UTIL);
    });
})(window, window.jQuery);
```
