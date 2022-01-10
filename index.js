class Calculator {
    sum(num1, num2){
        return num1 + num2;
    }
    rest(num1, num2){
        return num1 - num2;
    }
    division(num1, num2){
        return num1 / num2;
    }
    multiplication(num1, num2){
        return num1 * num2;
    }

}

class Display {
    constructor(displayPrevValue, displayValue){
        this.displayValue = displayValue;
        this.displayPrevValue = displayPrevValue;
        this.calculator = new Calculator();
        this.value = '';
        this.prevValue = '';
        this.type = undefined;
        this.signs = {
            sum: '+',
            rest: '-',
            multiplication: 'X',
            division: '%'
        }
    }

    delete(){
        this.value = this.value.toString().slice(0,-1);
        this.printValues();
    }

    deleteAll(){
        this.value = '';
        this.prevValue = '';
        this.type = undefined;
        this.printValues();
    }
    addNumbers(number){
        if(number === '.' && this.value.includes('.')) return
        this.value = this.value.toString() + number.toString();
        this.printValues();
    }

    printValues(){
        this.displayValue.textContent = this.value;
        this.displayPrevValue.textContent = `${this.prevValue} ${this.signs[this.type] || ''}` ;
    }

    calculate(){
        const prevValue = parseFloat(this.prevValue);
        const value = parseFloat(this.value);

        if( isNaN(value) || isNaN(prevValue)) return
        this.value = this.calculator[this.type](prevValue,value)
    }

    operation(type){
        this.type !== 'equal' && this.calculate();
        this.type = type;
        this.prevValue = this.value || this.prevValue;
        this.value = '';
        this.printValues();
    }
}
const displayPrevValue = document.getElementById('prev-value');
const displayValue = document.getElementById('value');
const buttonNumber = document.querySelectorAll('.number');
const buttonOperator = document.querySelectorAll('.operator');

const display = new Display(displayPrevValue, displayValue)

buttonNumber.forEach(button => {
    button.addEventListener('click', () =>
        display.addNumbers(button.innerHTML));    
})

buttonOperator.forEach(button => {
    button.addEventListener('click', () => display.operation(button.value))
})