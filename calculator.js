let rawEntry = "";
let previous = 0;
let savedOperation = "";
let output = document.getElementById("screen");
let dotPressed = false;
let isNegative = false;
let scientificMode = false;
let requestOperator = false;

function input(string) {
    if (requestOperator) {
        alert("ERROR : Operator required");
    } else {
        rawEntry+=string;
        output.innerHTML = rawEntry;
    }
}

function addDot() {
    if(dotPressed == false) {
        rawEntry += ".";
        output.innerHTML = rawEntry;
        dotPressed = true;
    }
}

function operator(operation) {
    savedOperation = operation;
    output.innerHTML = operation;
    dotPressed = false;
    requestOperator = false;
    isNegative = false;
    if (rawEntry != "") {
        previous = Number(rawEntry);
        rawEntry = "";
    }
}

function calculate() {
    if (rawEntry == "") {
        alert("please enter a number");
    } else {

        let answer;
        let operand = Number(rawEntry);
        switch (savedOperation) {
            case "-" :
                answer = previous - operand;
                break;
            case "+" :
                answer = previous + operand;
                break;
            case "/" :
                if (operand == 0) {
                    alert("Stop trying to divide by zero");
                    output.innerHTML = "Impossible de diviser par zéro";
                    return;
                } else {
                    answer = previous / operand;
                    break;
                }
            case "*" :
                answer = previous * operand;
                break;
            case "^" :
                answer = Math.pow(previous, operand);
                break;
            default :
                answer = operand;
        }
        previous = answer;
        output.innerHTML = answer;
        dotPressed = false;
        requestOperator = false;
        isNegative = false;
        rawEntry="";
    }
}

function reset() {
    rawEntry="";
    previous = 0;
    savedOperation = "";
    output.innerHTML = "";
    resetBooleans();
}

function del() {
    let ans ="";
    for(let i = 0; i<rawEntry.length -1;i++) {
        ans += rawEntry[i];
    }
    rawEntry = ans;
    output.innerHTML = rawEntry;
    if (rawEntry == "") {
        isNegative = false;
    }
}

function negative() {
    if (isNegative == false && rawEntry == "") {
        rawEntry += "-";
        isNegative = true;
    } else {
        alert("You can't put a negative sign here, it must be at the beginning of a number");
    }
}

function delCurr() {
    rawEntry = "";
    output.innerHTML = rawEntry;
    resetBooleans();
}

function resetBooleans() {
    isNegative = false;
    dotPressed = false;
    requestOpreator = false;
}

// scientific mode functions

function switchMode() {
    scientificMode = !scientificMode;
    let hidden = document.getElementById("hiddenContainer");
    let container = document.getElementById("container");
    let string = scientificMode ? "grid" : "none";
    document.getElementById("scientific").style.display = string;
    hidden.style.display = string;
    if (string == "grid") {
        hidden.className = "slideIn";
        container.className = "slideRight";
        setTimeout(() => {
            hidden.className = "";
            container.className = "";
        }, 600);
    } else {
        hidden.className = "slideOut";
        container.className = "slideLeft";
        setTimeout(() => {
            hidden.className = "";
            container.className = "";
        }, 600);
    }
}

function usePi() {
    if (rawEntry == "") {
        rawEntry = Math.PI;
        output.innerHTML = "&pi;";
        requestOperator = true;
    } else {
        alert("Pi can only be used after or before an operator");
    }
}

function square() {
    let answer = (rawEntry == "") ? Math.pow(Number(previous), 2) : Math.pow(Number(rawEntry), 2);
    previous = answer;
    output.innerHTML = answer;
    rawEntry = "";
    resetBooleans();
}

function squareRoot() {
    let answer = (rawEntry == "") ? Math.sqrt(Number(previous), 2) : Math.sqrt(Number(rawEntry), 2);
    previous = answer;
    output.innerHTML = answer;
    rawEntry = "";
    resetBooleans();
}