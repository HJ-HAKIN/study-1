# Note
* on() / off() : Data가 나중에 들어와도 항상 DOM을 탐색한다. (개발로 코드가 들어가서, 개발자도구에서 보이지 않는 경우)
* bind() /unbind() : Data를 탐색하지 못한다.

# point
```html
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script>
(function (win, $) {
    var objFunc = {
        init : function () {
            this.setElements();
            this.bindEvents();
        },
        setElements : function () {
            this.btn = $('.btn');
        },
        bindEvents : function () {
            this.btn.on('click', $.proxy(this.viewFunc, this));
        },
        viewFunc : function (e) {
            $(e.currentTarget).parent().addClass('active');
        }
    };
    $(function () {
        objFunc.init();
    });
})(window, window.jQuery);
</script>
</body>
```