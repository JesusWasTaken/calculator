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
    if (rawEntry != "") {
        savedOperation = operation;
        output.innerHTML = operation;
        previous = Number(rawEntry);
        resetBooleans();
    } else {
        alert("Please enter a number first");
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
            case "%" :
                answer = previous % operand;
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
    previous = 0;
    savedOperation = "";
    output.innerHTML = "";
    resetBooleans();
}

function del() {
    let ans ="";
    if (rawEntry[rawEntry.length-1] == ".") {
        dotPressed = false;
    }
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
    if (rawEntry[0] == "-") {
        rawEntry = rawEntry.substring(1,rawEntry.length);
    } else {
        rawEntry = "-"+rawEntry;
    }
}

function delCurr() {
    resetBooleans();
    output.innerHTML = rawEntry;
}

// reset all security booleans and clear the current Entry
function resetBooleans() {
    isNegative = false;
    dotPressed = false;
    requestOpreator = false;
    rawEntry="";
}

// scientific mode functions

function switchMode() {
    scientificMode = !scientificMode;
    let hidden = document.getElementById("hiddenContainer");
    let container = document.getElementById("container");
    let string = scientificMode ? "grid" : "none";
    document.getElementById("scientific").style.display = string;
  
    if (string == "grid") {
        hidden.style.display = string;
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
            hidden.style.display = string;
        }, 500);
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
    resetBooleans();
}

function squareRoot() {
    let answer = (rawEntry == "") ? Math.sqrt(previous) : Math.sqrt(Number(rawEntry));
    previous = answer;
    output.innerHTML = answer;
    resetBooleans();
}

// side bar functions

function invert() {
    rawEntry=1;
    operator("/");
}

function specCalc(option) {
    let operand = (rawEntry == "") ? previous : Number(rawEntry);
    let answer = 0;

    switch (option) {
        case "log" :
            if (operand >= 0) {
                answer = Math.log(operand);
            } else {
                alert("Neperian logarithme of a negative number doesn't exists");
            }
            break;
        case "sin" :
            answer = Math.sin(operand);
            break;
        case "cos" :
            answer = Math.cos(operand);
            break;
        case "%" :
            answer = operand / 100;
            break;
        case "abs" :
            answer = Math.abs(operand);
            break;
        default :
            console.log("reached default at specCalc switch");
    }

    previous = answer;
    output.innerHTML = answer;
    resetBooleans();
}