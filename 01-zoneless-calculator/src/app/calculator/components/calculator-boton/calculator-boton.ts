import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-boton',
  imports: [],
  styleUrl: './calculator-boton.css',
  templateUrl: './calculator-boton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    class:'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
    // attribute: 'hola',
    // 'data-size': 'XL'
  },
  // encapsulation: ViewEncapsulation.None
})
export class CalculatorBoton {
  public isPressed = signal(false);

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public onClick = output<string>();

  public isCommand = input(false, {
    transform: (value: boolean | string ) => typeof value === 'string' ? value === '' :  value
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string ) => typeof value === 'string' ? value === '' :  value
  });

  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }
  @HostBinding('class.is-command') get commandStyle() {
    return this.isCommand();
  }

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return
    }
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string){
    if(!this.contentValue()){
      return
    }

    const value =  this.contentValue()?.nativeElement.innerText;

    if(value !== key)  return

    this.isPressed.set(true);

    setTimeout(()=> this.isPressed.set(false), 100)
  }
}
