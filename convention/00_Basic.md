# [Basic] Javascript Source
<br>

## 기본 네이밍(변수, 함수, 파일명)
* camelCase 방식을 따른다.
* 첫 시작문자는 영문 대/소문자, 언더스코어만 허용한다.
* 클래스 정의(define) 시 또는 new를 이용한 생성자 호출 시 영문 대문자로 시작한다.
* 언더스코어는 2개이상 연속으로 사용하지 않는다.
* this를 참조할 때는 _this 를 사용한다. 이외 모든 변수에 언더스코어를 사용하지 않는다.

```javascript
// bad
var _a = 1;

// good
var a = 1;
var _this = this;
```
<br>
## 파일
* 확장명은 js로 한다. 
* 가급적 inline script를 사용하지 않고, js 파일로 분리한다.
* js 파일은 utf-8(BOM 없음)으로 저장한다.
* script 태그는 &lt;/head&gt; 태그 이전에 추가한다. 단 성능상 문제가 있는 경우 &lt;/body&gt; 이전에 추가한다.
* 라이브 배포 시 반드시 압축 한다.
* 압축한 파일은 xxx.min.js 형태 이름을 사용한다.
<br><br>

## script 태그
### HTML5
// 기본

&lt;script src="xxx.js"&gt;&lt;script&gt;

// HTML5 신규 속성인 async는 지원 브라우저 확인 후 사용

&lt;script src="xxx.js" async&gt;&lt;/script&gt;

### HTML 4.01 Transitional
&lt;script type="text/javascript" src="xxx.js"&gt;&lt;/script&gt;
<br><br>

## 들여쓰기
* 빈칸 4개를 1 탭으로 설정한다.
<br><br>

## 라인길이
* 한 라인에 80자를 넘지 않도록 한다.
* 80자를 넘을 경우 아래 설명하는 break 기준에 따라 처리한다.
<br><br>

## 주석
* 일반 주석과 문서용 주석으로 나눈다.
* 일반 주석은 // 를 사용한다.
* 문서용 주석은 /** ... */ 를 사용한다.

### 일반 주석
* 반드시 주석은 코드 위에 추가한다. 단, 변수를 여러 개 선언(declare)하는 경우는 예외

```javascript
// bad
var active = true; // No

// good
// 이렇게 코드 위에 주석을 넣어야 한다.
var active = true;

// 변수 여러 개 선언
var currentElement, // 현재 엘리먼트
    level,          // 레벨
    size;           // 크기
```

* 주석 추가 전에 반드시 빈줄을 추가한다.

```javascript
// bad
var isComment = false;
// 반드시 주석 전에 빈 줄을 추가해야 한다.
console.log(isComment);

// good
var isComment = false;

// 한 줄 주석은 전에 빈 줄을 추가한다.
console.log(isComment);
```

### 문서용 주석
* 문서용 주석은 함수, 모듈, 프로퍼티 등의 목적, 인자, 리턴 값들을 구체적으로 표현한다.
* 문서용 주석에는 절대 일반 주석을 혼용하지 않는다.

```javascript
// bad
// 문서용 주석은 이렇게 일반 주석을 사용하면 안됨.
// @param {string} 타입을 알고자 하는 오브젝트
// @return {string} 구체적인 타입
function getType(type) {
    // somelogic
    return type;
}

// good
/**
 * 오브젝트를 넣으면 구체적인 타입을 알려 줌
 * @param {string} 타입을 알고자 하는 오브젝트
 * @return {string} 구체적인 타입
 */
function getType(type) {
    // somelogic
    return type;
}
```
<br>

## 변수
* 전역변수는 사용하지 않는다.
* 사용시 반드시 var 를 이용해서 선언(declare) 한다.
* 되도록 선언과 동시에 초기화 시키도록 한다.
* 선언 또는 초기화가 끝나면 반드시 마지막에 세미콜론(;)을 사용한다.

### 공통
```javascript
// bad
// 전역변수는 사용하지 않는다.
someVar;

// good
// 반드시 var를 이용해 선언한다.
var someVar;

// very good
// var를 사용해 선언 동시에 초기화 시키도록 한다.
var someVar = 1;

// 여러 변수 사용시 다음 변수는 한번 들여쓰기 한다.
var items = getItems(),     // 전체 아이템 배열을 가져온다.
    length = items.length,  // 아이템의 크기,
    isEmpty = false;        // 비어있는지 확인
```

### 위치
* 함수 내 변수는 최상단에 오도록 한다.

```javascript
// bad
function getRealName() {
    someFunc();
    ...
    var name = getName();
    ...
    return name;
}

// good
function getRealName() {
    var name = getName();
    ...
    someFunc();
    ...
    return name;
}
```

* 반복문(for, while...)내에서 변화가 없이 사용하는 변수는 미리 선언한다.

```javascript
// bad
// container와 someArray.length는 변하지 않는 변수
for (var i = 0; i < someArray.length; i++) {
    var container = document.getElementById('container');
    container.innerHTML += 'my number:' + i;
    console.log(i);
}

// good
// 미리선언
var container = document.getElementById('container');

// for 내 미리선언 구역으로 someArray.length를 옮긴다.
for (var i = 0, len = someArray.length; i < len; i++) {
    container.innerHTML += 'mynumber:' + i;
    console.log(i);
}
```
<br>

## 비교
* 되도록 ==, != 대신 ===, !== 를 사용한다.
* String, Undefined, Null, Boolean, Number, Object의 빈 값을 직접 비교하지 않는다.

```javascript
// normal
if (1 == a) {
    ...
}

// nice
if (1 === a) {
    ...
}

// bad
if (true === isOpen) {
    ...
}

// good
if (isOpen) {
    ...
}

// bad
if (0 < arr.length) {
    ...
}

// good
if (arr.length) {
    ...
}
```
<br>

## Object & Propery
* 생성시 new 를 사용하지 말고, 리터럴 구문을 사용한다.
* 예약어를 키 값으로 사용하지 않는다.
* 키 값에 되도록 대시('-'), 언더스코어, 숫자를 사용하지 않는다.
* 키와 값 사이 : 은 반드시 앞,뒤 한 칸을 추가한다.
* 값에 접근할 때는 되도록 '.' 를 이용해 접근한다.

```javascript
// bad
var obj = new Object();

// good
var obj = {};

//bad
var superman = {
    class : 'alien'
};

// a bit bad
var superman = {
    'k-lass' : 'alien'
};

// a bit bad
var superman = {
    'k_lass' : 'alien'
};

// a bit bad
var superman = {
    klass1 : 'alien'
};

// good
var superman = {
    klass : 'alien'
};

// bad
superman['old'] = 60;

// good
superman.old = 60;
```
<br>

## Array
* 되도록 변수명은 복수형을 사용한다.
* 생성시 new 를 사용하지 말고, 리터럴 구문을 사용한다.
* 추가시 명확하게 push를 사용한다.
* array copy 시 slice 를 사용한다.

```javascript
// bad
var item = new Array();

// good
var items = [];

// bad
items[items.length] = 'last';

// good
items.push('last');

// bad
var newItems = [];
for (var i = 0, len = items.length; i < len; i++) {
    newItems[i] = items[i];
}

// good
var newItems = [];
for (var i = 0, len = items.length; i < len; i++) {
    newItems.push(items[i]);
}

// good
var newItems = items.slice();
```
<br>

## String
* 생성시 new 를 사용하지 말고, 리터럴 구문을 사용한다.
* 리터럴 사용시 홑따임표(')를 사용한다.
* 한 줄에 80자를 넘지 않도록 한다. 넘는 경우 '+' 를 이용해 분리한다.
* 여러 줄을 합칠 경우 '+' 보다 Array의 Join을 이용한다.

```javascript
// bad
var name = new String('Kings Man');

// bad
var name = "Kings Man";

// good
var name = 'Kings Man';

// bad
var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fase.';

// bad
var errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you whould get nowhere \
fase.';

// good
var errorMessage = 'This is a super long error that was thrown because ' + 
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fase.';

// bad
var multiMessage = '';
for (var i = 0, len = 100; i < len; i++) {
    multiMessage += errorMessage;
}
console.log(multiMessage);

// good
var multiMessage = [];
for (var i = 0, len = 100; i < len; i++) {
    multiMessage.push(errorMessage);
}
console.log(multiMessage.join(''));
```
<br>

## Number
* 생성시 new 를 사용하지 말고, 리터럴 구문을 사용한다.
* 문자를 숫자로 변경할 때는 Number 함수나 진수가 포함된 parseInt 를 사용한다.

```javascript
// bad
var num = new Number('1');
var num = new Number(1);

// good
var num = 1;

// bad
var snum = '1';
var num = +snum;
var num = new Number(snum);
var num = parseInt(snum);

// good
var snum = '10';
var num = Number(snum);
var num = parseInt(snum, 10);
```

* 숫자를 검사할때 isNaN 또는 Number.isNaN을 사용하지 않는다.

```javascript
// bad
isNaN('');
isNaN('37');
isNaN(new Data());
```
<br>

## Function
* 소괄호만 있을경우 앞뒤로 반드시 한칸을 추가한다.
* 선언적함수명으로 있을 경우 앞뒤로 한칸을 추가한다.
* 인자명으로 예약어를 사용하지 않는다. (예, arguments)
* global Function의 사용을 자제한다.
* 대입 또는 즉시 실행함수(IIFE)는 마지막에 세미콜론으로 끝맺음을 한다.

```javascript
// bad
var named = function() {
    ...
};

// good
var named = function () {
    ...
};

// good
var named = function named() {
    ...
};

// bad
var named = function named(arguments) {
    ...
}

// good
var named = function named(args) {
    ...
}

// immediately-invoked functino expression (IIFE)
(function () {
    console.log('Welcome to the Internet. Please follow me.');
})();
```

* 가급적 사용전 선언(declared) 되어 있어야 한다.

```javascript
function outer(c, d) {
    var e = c * d;

    function inner() {
        return (e * a) + b;
    }

    return inner();
}
```

* block 구문(중괄호)안에 함수를 선언하지 않는다. 불가피할 경우 외부에 변수를 두고 대입한다.

```javascript
// bad
if (condition) {
    function test() {
        ...
    }
}

// good
var test;
if (condition) {
    test = function test() {
        ...
    }
}
```
<br>

## Statement
* 중괄호 이후에는 한줄을 내려 다음라인에서 구문을 시작한다.

```javascript
// bad
if (isTrue) {console.log('true');}

// good
if (isTrue) {
    console.log('true');
}
```

* 각 괄호간 쌍은 들여쓰기를 맞춘다.

```javascript
// bad
if (isTrue) {
for (var i = 0, len = 10; i < len; i++) {
        ...
    }
}

// good
if (isTrue) {
    for (var i = 0, len = 10; i < len; i++) {
        ...
    }
}
```

### return
* 되도록 문장 내에서 연산 작업을 하지 않는다.

```javascript
// a bit good
if (notBad) {
    return (isBad ? 'bad' : 'good?!');
}

// good
var isBad = 'bad';
if (notBad) {
    isBad = 'good';
    return isBad;
}
```

### if ... else
```javascript
if (condition) {
    ...
}
if (condition) {
    ...
} else {
    ...
}

if (condition) {
    ...
} else if {
    ...
} else {
    ...
}
```

### for
```javascript
for (initialization; condition; update) {
    ...
}

// 없을 경우 빈칸 추가
for ( ; condition; ) {
    ...
}

for (variable in object) {
    if (filter) {
        ...
    }
}
```

### while & do while
```javascript
while (condition) {
    ...
}

do {
    ...
} while (condition);
```

### switch
* 가급적 if ... else 를 사용한다.

```javascript
// 기본
switch (expression) {
    case expression :
        ...
    default :
        ...
}

// good
if (expression) {
    ...
} else {
    ...
}
```

### try ... catch
```javascript
try {
    ...
} catch (variable) {
    ...
}

try {
    ...
} catch (variable) {
    ...
} finally {
    ...
}
```
<br>

## 빈칸
* =, +, != ... 등 연산자와 콜론, 소괄호 앞뒤로 빈칸을 삽입한다.

```javascript
// bad
var a+=1;

// good
var a += 1;

// bad
var title = ''+(isTrue? 1 : 2);

// good
var title = '' + (isTrue ? 1 : 2);
```

* 열린 중괄호 전에는 한 칸을 삽입한다.

```javascript
// bad
dog.set('attr',{
    age : '1 year',
    breed : 'Bernese Mountain Dog'
});

// good
dog.set('attr', {
    age : '1 year',
    breed : 'Bernese Mountain Dog'
});
```

* for 문의 세미콜론 다음에 한 칸을 삽입한다.

```javascript
// bad
for (var i = 0, len = items.length;i<len; i++) {
    ...
}

// good
for (var i = 0, len = items.length; i < len; i++) {
    ...
}
```

* return 구문 이후에 나오는 구문은 빈 줄을 추가한다.

```javascript
// bad
if (isDock) {
    return;
}
return animal;

// good
if (isDock) {
    return;
}

return animal;
```
<br>

## Comma
* 콤마다음은 빈칸 하나를 추가한다.
* 오브젝트, 배열에서 콤마는 키 또는 값 뒤에 붙이도록 한다.
* 마지막 콤마는 반드시 삭제한다.

```javascript
// bad
var a,b,c;

// good
var a, b, c;

// bad
var items = [
    'a'
    , 'b',
    'c',
];

// good
var items = [
    'a',
    'b',
    'c'
];

// bad
var hero = {
    firstName : 'Bob'
    , lastName : 'Parr'
    , heroName : 'Mr. Incredible'
    , superpower : 'strength'
};

// good
var hero = {
    firstName : 'Bob',
    lastName : 'Parr',
    heroName : 'Mr. Incredible',
    superpower : 'strength'
};
```
<br>

## Strict Mode
* 'use strict'를 파일 상단 또는 function 안 상단에 넣도록 한다.

```javascript
// good
'use strict';

function isContainParam(param) {
    ...
}

// good
(function () {
    'use strict';
    ...
})();
// good

```
<br>

## eval
* eval 사용하지 않는다.