
import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '÷', 'x'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace']

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0')
  public subResult = signal('0')
  public lastOperator = signal('+')

  public constructNumber(value: string): void {
    // validar inputs
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value)
      return
    }

    // =
    if (value === '=') {
      this.calculateResult();
      return
    }

    //C
    if (value === 'C') {
      this.resultText.set('0')
      this.subResult.set('0')
      this.lastOperator.set('+')
      return
    }
    //Backspace
    if (value === 'Backspace') {
      if (this.resultText() === '0') return
      if (this.resultText().includes('-') && this.resultText().length ===2) {
        this.resultText.set('0')
        return}
      if (this.resultText().length === 1) {
        this.resultText.set('0')
        return
      }
      this.resultText.update(v => v.slice(0, -1))
      return
    }
    // operador
    if (operators.includes(value)) {
      // this.calculateResult()
      this.lastOperator.set(value)
      this.subResult.set(this.resultText())
      this.resultText.set('0')
      return
    }

    //Limitar numero de caracteres
    if (this.resultText().length >= 10) {
      console.log('Mac nosehuorh');
      return;
    }

    // validar decuimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.')
        return
      }
      this.resultText.update(text => text + '.')
      return
    }

    //0 iniicial

    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return
    }
    // +/-
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(text => text.slice(1))
        return
      }
      this.resultText.update(text => '-' + text)
      return
    }

    //Numeros
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value)
        return;
      }
      if (this.resultText() === '-0') {
        this.resultText.set('-' + value)
        return;
      }

      this.resultText.update(text => text + value)
      return
    }

  }

public calculateResult(){

  const number1 = parseFloat(this.subResult())
  const number2 = parseFloat(this.resultText())

  let result = 0;

  switch(this.lastOperator()) {
    case  '+':
      result = number1 + number2
      break;
    case  '-':
      result = number1 - number2
      break;
    case  '*':
    case  'x':
      result = number1 * number2
      break;

    case '÷':
    case  '/':
      result = number1 / number2
      break;
  }
  this.resultText.set(result.toString());
  this.subResult.set('0');

}
}
