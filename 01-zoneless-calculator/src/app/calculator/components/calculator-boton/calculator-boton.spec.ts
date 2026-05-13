import { Component } from '@angular/core';
import { CalculatorBoton } from './calculator-boton';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  imports: [CalculatorBoton],
  template: '<calculator-boton><span class="projected-content" > 7 </span></calculator-boton>'
})
class TestHostComponent {}

describe('CalculatorBoton', () => {

  let component : CalculatorBoton
  let fixture: ComponentFixture<CalculatorBoton>

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [CalculatorBoton],
    })

    fixture = TestBed.createComponent(CalculatorBoton)
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    const compiled  =  fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
  })
  it('should apply w-1/4 double size is false', () => {
   const htmlElement = fixture.nativeElement as HTMLElement;
   const hostCss = htmlElement.classList.value;
   expect(hostCss).toContain('w-1/4');
  })


it('should apply w-2/4 double size is true', () => {
   fixture.componentRef.setInput('isDoubleSize', true); // cambio por evento
  fixture.detectChanges();

  const htmlElement = fixture.nativeElement as HTMLElement;
   const hostCss = htmlElement.classList.value;
   expect(hostCss).toContain('w-2/4');
});

it('should apply is-command class when isCommand is true', () => {
  fixture.componentRef.setInput('isCommand', true); // cambio por evento
  fixture.detectChanges();

  const htmlElement = fixture.nativeElement as HTMLElement;
   const hostCss = htmlElement.classList.value;
   expect(hostCss).toContain('is-command');
});

it('should emit onClick when handleClick is called', () => {
  // Presionar el botón fisicamente
  // no nativeElement y termina emitiendo el valor

  const spy = vi.spyOn(component.onClick, 'emit' ); // cuando el onclick es emitido

  const buttonElement = (fixture.nativeElement as HTMLElement).querySelector('button');

  buttonElement!.innerText = ' 9 ';

  buttonElement?.click();

  expect(buttonElement).toBeTruthy(); // Existe el botón

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith('9');



});


it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', async done => {
  //  const buttonElement = (fixture.nativeElement as HTMLElement).querySelector('button');
  // buttonElement!.innerText = ' 9 ';
  component.contentValue()!.nativeElement.innerText = '9'; // similar a las de arriba
  component.keyboardPressedStyle('9');
  expect(component.isPressed()).toBe(true);


  // setTimeout(()=> {
  //   expect(false).toBe(true);
  //   done();
  // }, 101)
    await new Promise((resolve => {
    return setTimeout(resolve, 101)
  }))
  expect(component.isPressed()).toBe(false)

});

it('should NOT set isPressed if key does not match', () => {
  component.contentValue()!.nativeElement.innerText = '9';
  component.keyboardPressedStyle('8');
  expect(component.isPressed()).toBe(false);
});

it('should display projected content', () => {
  const fixtureHost = TestBed.createComponent(TestHostComponent);
  fixtureHost.detectChanges();

  const compiled = fixtureHost.nativeElement as HTMLElement;

  expect(compiled.querySelector('.projected-content')).toBeTruthy();
  expect(compiled.textContent.trim()).toBe('7');
})
})
