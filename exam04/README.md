# point

```html
<script>
var wrap = $('.exam_wrap').eq(3),
    insertTagArea = wrap.find('.exam_q'),
    a = 2;

var tagArray = [];

while (a < 10) {
    tagArray.push('<p>' + a + '단</p>');
    tagArray.push('<ul>');
    for (var i = 1, max = 10; i < max; i++) {
        tagArray.push('<li>');
        tagArray.push(a + ' x ' + i + ' = ' + (a * i));
        tagArray.push('</li>');
    }
    tagArray.push('</ul>');
    a++;
};
insertTagArea.get(0).innerHTML = tagArray.join('');
</script>
```