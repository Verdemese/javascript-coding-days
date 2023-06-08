## Day 1
* original code에서 불필요한 코드를 refactoring 함.
    - `for` 구문에 의한 그리드 구현을 `new Array()`로 `forEach`method를 사용하여 코드를 줄일 수 있음.
    -  그로인해 불필요한 반복문이나, 각 column의 validation 함수를 도입하지 않아도 됨.
*  `document.elementFromPoint(x, y)`: x, y 값을 입력하였을 때, 그 좌표에 element가 존재한다면, 그 element를 return하는 method를 배움.
