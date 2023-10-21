let runningTotal = 0;
let buffer = "0";
let previousOp;
let double = false;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            double = false;
            break;
        case '=':
            if (previousOp === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOp = null;
            buffer = runningTotal;
            runningTotal = 0;
            double = false;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            }else if(double == true){
                let findDecimal = buffer[buffer.length-2];
                if(findDecimal === '.'){
                    buffer = buffer.substring(0, buffer.length - 2);
                }else{
                    buffer = buffer.substring(0, buffer.length - 1);
                }
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '÷':
        case '×':
            double = false;
            doMath(symbol);
            break;
        case '.':
            if (double == false){
                buffer += '.';
                double = true;
            }
            break;
    }

}

function handleNumber(number) {
    if (buffer === '0') {
        buffer = number;
    } else {
        buffer += number;
    }

}

function doMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const doubleBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = doubleBuffer;
    } else {
        flushOperation(doubleBuffer);
    }

    previousOp = symbol;
    buffer = '0';
}

function flushOperation(doubleBuffer) {
    if (previousOp === '+') {
        runningTotal += doubleBuffer;
    } else if (previousOp === '−') {
        runningTotal -= doubleBuffer;
    } else if (previousOp === '×') {
        runningTotal *= doubleBuffer;
    } else if (previousOp === '÷') {
        runningTotal /= doubleBuffer;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });
    document.body.addEventListener('keydown', function(event){ 
        console.log(event.key);
        if (event.key === '/'){
            buttonClick('÷');
        }else if(event.key === 'Enter'){
            buttonClick('=');
        }else if(event.key === 'Backspace'){
            buttonClick('←');
        }else if(event.key === 'Escape'){
            buttonClick('C');
        }else if(event.key === '*'){
            buttonClick('×');
        }else if(event.key === '-'){
            buttonClick('−');
        }else{
            buttonClick(event.key);
        }
    });
}

init();