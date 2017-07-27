
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