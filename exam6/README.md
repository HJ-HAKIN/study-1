
```html
<script>
var obj = {
    init : function () {
        this.setElements();
        this.initLayout();
        this.bindEvents();
    },
    setElements : function () {
        this.wrapFirst = $('.exam_wrap').eq(0);
        this.listChildFirst = wrapFirst.find('ul').children();
        this.nextBtnFirst = wrapFirst.find('button');
    },
    initLayout : function () {
        this.indexFirst = -1;
    },
    bindEvents : function () {
        this.nextBtnFirst.on('click', $.proxy(this.onClickFunc, this));
    },
    onClickFunc : function () {
        this.indexFirst++;
        this.viewFunc();
    },
    viewFunc : function () {
        this.listChildFirst.eq(this.indexFirst).css('background','yellow');
    }
};
obj.init();
</script>
```

# Array

* 배열 값 정렬

```html
<script>
var array = [10, 55, 32, 24, 30];
array.sort(function (a, b) {
    return b - a
});
console.log(array);
</script>
```

* 배열 값 삭제

```html
<script>
var array = [3, 5, 6, 2];
array.splice(0, 1);
console.log(array);
</script>
```

* 이중배열

```html
<script>
var array = [];
for (var i = 0, max = 6; i < max; i++) {
    array[i] = [];
    for (j = 0, jmax = 6; j < jmax; j++) {
        array[i][j] = i * j;
    }
}
console.log(array);
</script>
```

* 랜덤값

```html
<script>
var array = [];
for (var i = 0, max = 6; i < max; i++) {
    array[i] = Math.floor(Math.random() * 6);
}
console.log(array);
</script>
```

