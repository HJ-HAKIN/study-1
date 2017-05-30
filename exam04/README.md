# Note
* on() / off() : Data가 나중에 들어와도 항상 DOM을 탐색한다. (개발로 코드가 들어가서, 개발자도구에서 보이지 않는 경우)
* bind() /unbind() : Data를 탐색하지 못한다.

## Array.join()
* 배열의 모든 원소를 문자열로 변환하고 이어 붙여서 반환한다.
* 결과로 반환되는 문자열에서 배열의 원소들을 구분하기 위해 구분자 문자열이 사용된다.
* 별도로 구분자 문자열을 지정하지 않으면 콤마(,)가 기본값으로 사용된다.
* Array.join() 메서드는 String.split() 메서드와 반대되는 기능을 한다.
* String.split() 메서드는 문자열을 조각들로 분리하고 이 조각들을 원소로 하는 배열을 생성하여 반환한다.

## 반복문으로 키값을 꺼내 오는 방법 : for ... in 으로 꺼내온다.
```html
<script>
var obj = {
        name : '하이브랩',
        site : 'hivelab.co.kr',
        email : 'hivelab@hivelab.co.kr',
        tel : '031-111-1111'
    };
    for (var key in obj) {
        console.log(key); //결과 : name, site, email, tel
        console.log(key, obj[key]); 
        //결과 : name 하이브랩, site hivelab.co.kr, email hivelab@hivelab.co.kr, tel 031-111-1111
    };
</script>
```

# point
```html
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