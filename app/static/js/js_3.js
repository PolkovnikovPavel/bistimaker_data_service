let fibanachis = {
    1: 0,
    2: 1
}

function getFibanachi(num) {
    if (!(num in fibanachis)) {
        fibanachis[num] = getFibanachi(num - 1) + getFibanachi(num - 2);
    } 
    let value = fibanachis[num];
    return value;
}

function bringOutResult() {
    textNum.textContent = 'Номер числа фибаначи по порядку (' + num.value + ')';
    result.textContent = 'Расчитанное значение: ' + getFibanachi(num.value);
}



let result = document.getElementById('result');
let num = document.getElementById('Num');
let textNum = document.getElementById('textNum');

num.onmousemove = bringOutResult;
