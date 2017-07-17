# point
```html
<script>
$(function () {
    var wrap = $('.exam_wrap').eq(2),
        prevBtn = wrap.find('.prev_btn'),
        nextBtn = wrap.find('.next_btn'),
        listWrap = wrap.find('.exam_q'),
        listParent = listWrap.find('ul'),
        listChild = listParent.children(),
        currentIndex = 0,
        oldIndex = currentIndex;

    var prevFunc = function () {
        currentIndex = currentIndex - 1;
        if (currentIndex < 0) {
            currentIndex = listChild.length - 1;
        }
        setList();
    };
    var nextFunc = function () {
        currentIndex = currentIndex + 1;
        if (currentIndex >= listChild.length) {
            currentIndex = 0;
        }
        setList();
    };
    var setList = function () {
        listChild.eq(oldIndex).css('background', '');
        listChild.eq(currentIndex).css('background', 'yellow');
        oldIndex = currentIndex;
    };
    prevBtn.on('click', prevFunc);
    nextBtn.on('click', nextFunc);
});
</script>
```
