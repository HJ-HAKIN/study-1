## Each
* 배열과 객체를 순회할 목적의 유틸리티 함수.
* 배열객체의 모든 요소에서 function을 수행하고, index에는 배열의 인덱스가 전달되고 item에는 배열의 데이터가 전달됨.

```javascript
<script>
$.sum = function (array) {
    var total = 0;
    $.each (array, function (index, item) {
        value = $.trim(item);
        value = parseFloat(item) || 0;
        total += value;
    });
    return total;
};

var result = $.sum([20, 30, 15, 45]);
console.log(result);

/* 
	result : 배열객체,
	index : 배열의 index,
	item : 배열의 데이터
*/
</script>
```