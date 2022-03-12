class Calculator {
    constructor(previousOutput, currentOutput) {
        this.previousOutput = previousOutput;
        this.currentOutput = currentOutput;
        this.previousAnswer = 0;
        this.clear();
    }
    clear() {
        // innerText not innerHtml
        this.previousOutput.innerText = "Ans = " + this.previousAnswer;
        this.currentOutput.innerText = "0";
    }
    append(character) {
        let line = this.currentOutput.innerText;
        let checkIsAns = line.startsWith("A");
        if (line == "0" || checkIsAns) {
            if (checkIsAns) 
                this.previousOutput.innerText = line;
            this.currentOutput.innerText  = "";
            line = "";
        }

        if (!isNaN(character) || character == ".") {
            // isNaN -> is not a number
            this.currentOutput.innerText += character;
        }
        else if (line.charAt(line.length - 1) != " ") {
            if (line.length == 0)
                this.currentOutput.innerText = (checkIsAns? this.previousAnswer : '0') + ' ' + character + ' ';    
            else
                this.currentOutput.innerText += ' ' + character + ' ';
        }
    }
    delete() {
        let line = this.currentOutput.innerText;
        // because space also count as number -> -2
        let charCheck = line.charAt(line.length - 2);
        if (line == "0" || line.length == "1" || line.startsWith("A"))
            this.clear();
        else if (!isNaN(charCheck) || charCheck == ".")
            this.currentOutput.innerText = line.substring(0, line.length - 1);
        else {
            this.currentOutput.innerText = line.substring(0, line.length - 3);
        }

    }
    compute(a, operation, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch(operation) {
            case "+":
                return a+b;
            case "-":
                return a-b;
            case "*":
                return a*b;
            case "/":
                return a/b;
        }
    }
    calculate() {
        let line = this.currentOutput.innerText;
        let arr = [];
        if (line.charAt(line.length - 1) != " ") {
            arr = line.split(" ");
            // display math operation
            line = line.replaceAll(". ", ".0 ");
            if (line.endsWith("."))
                line = line.substring(0, line.length - 1) + ".0";
            console.log(line);
            this.previousOutput.innerText = line + " =";

            let start = arr[0];
            for (let i = 1; i < arr.length; i += 2) {
                console.log(start);
                start = this.compute(start, arr[i], arr[i + 1]);
            }

            this.previousAnswer = start;
            this.currentOutput.innerText = "Ans = " + start;
        }

    }

}



let numberButtons = document.querySelectorAll(".js__btn-num");
let delButton = document.querySelector(".js__btn-del");
let resetButton = document.querySelector(".js__btn-clear");
let equalButton = document.querySelector(".js__btn-equal");
let operationButtons = document.querySelectorAll(".js__btn-oper");
let previousTextOutput = document.querySelector(".js__output-prev");
let currentTextOutput = document.querySelector(".js__output-current");


let calc = new Calculator(previousTextOutput, currentTextOutput);


numberButtons.forEach(function (button) {
    button.addEventListener("click", function() {
        calc.append(this.innerText);
    });
});
operationButtons.forEach(function (button) {
    button.addEventListener("click", function() {
        calc.append(this.innerText);
    });
});
delButton.addEventListener("click", function() {
    calc.delete();
});
resetButton.addEventListener("click", function() {
    calc.clear();
});
equalButton.addEventListener("click", function() {
    calc.calculate();
})