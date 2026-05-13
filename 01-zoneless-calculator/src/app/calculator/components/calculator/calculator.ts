import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorBoton } from '../calculator-boton/calculator-boton';
import { CalculatorService } from '@/calculator/services/calculator';

@Component({
  selector: 'calculator',
  imports: [CalculatorBoton],
  templateUrl: './calculator.html' ,
  styleUrl: './calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }


})
export class Calculator {

  private calculatorService = inject(CalculatorService);

  public resultText = computed(()=>this.calculatorService.resultText())
  public subResultText = computed(()=>this.calculatorService.subResult())
  public lastOperator = computed(()=>this.calculatorService.lastOperator())

  // get resultText(): string {
  //   return this.calculatorService.resultText;
  // }

  public calculatorButtons = viewChildren(CalculatorBoton);
  handleClick(key: string){
    // console.log({key})
    this.calculatorService.constructNumber(key)
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalents: Record<string,string> = {
      Escape: 'C',
      Clear: 'C',
      'X': '*',
      '/': '÷',
      Enter: '='
    }
    this.handleClick(keyEquivalents[event.key] ?? event.key)

    this.calculatorButtons().forEach(button=>{

      button.keyboardPressedStyle(event.key)
    })
  }
}
