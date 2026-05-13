import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { signal } from '@angular/core';
import { CalculatorService } from '@/calculator/services/calculator';
import { By } from '@angular/platform-browser';
import { CalculatorBoton } from '../calculator-boton/calculator-boton';


class MockCalculatorService {
  resultText = signal('100');
  subResult = signal('20');
  lastOperator = signal('-');
  constructNumber = vi.fn();
}

describe('Calculator', () => {

  let component: Calculator
  let fixture: ComponentFixture<Calculator>
  let mockCalculatorService: MockCalculatorService;
  beforeEach(() => {
    mockCalculatorService = new MockCalculatorService();
    TestBed.configureTestingModule({
      imports: [Calculator],
      providers: [
        {
          provide: CalculatorService,
          useValue: mockCalculatorService
        }
      ]
    })

    fixture = TestBed.createComponent(Calculator)
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {

    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
  })

  it('should have initial values from service', () => {
    expect(component.resultText()).toBe('100')
    expect(component.subResultText()).toBe('20')
    expect(component.lastOperator()).toBe('-')
  });

  it('should display values in the template', () => {
    mockCalculatorService.resultText.set('50');
    mockCalculatorService.subResult.set('10');
    mockCalculatorService.lastOperator.set('+');

    fixture.detectChanges();

    const resulTextElement = (fixture.nativeElement as HTMLElement).querySelector('[test-id="result-text"]');
    expect(resulTextElement?.innerHTML).toBe('50');
    const subTextElement = (fixture.nativeElement as HTMLElement).querySelector('.text-4xl');
    expect(subTextElement?.innerHTML).toContain('10 +');

  });

  it('should call constructNumber when handleClick is called', () => {
    component.handleClick('5');
    expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('5');
  });

  it('should handle keyboard events correctly', () => {
    const event = new KeyboardEvent('keyup', {key:'1'}); // locrea
    document.dispatchEvent(event); // se lanza
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('1');
  });

  it('should handle special keyboard events (Enter -> =)', () => {
    const event = new KeyboardEvent('keyup', {key:'Enter'}); // locrea
    document.dispatchEvent(event); // se lanza
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
  });

  it('should handle special keyboard events (Escape -> C)', () => {
    const event = new KeyboardEvent('keyup', {key:'Escape'}); // locrea
    document.dispatchEvent(event); // se lanza
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');

  });

  it('should call constructNumber when button pressed', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(CalculatorBoton))


    const button = buttons[0];
    button.triggerEventHandler('onClick', 'c');

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('c')

  });

  it('should update resultText signal when service updates', () => {
    mockCalculatorService.resultText.set('999');
    fixture.detectChanges();

    expect(component.resultText()).toBe('999')

  })

  it('should have 19 calculator-button components with content projected', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('calculator-boton');

    expect(buttons.length).toBe(19);

    expect(buttons[0].querySelector('button')?.innerHTML.trim()).toContain('C')
    expect(buttons[1].querySelector('button')?.innerHTML.trim()).toContain('+/-')
    expect(buttons[2].querySelector('button')?.innerHTML.trim()).toContain('%')
    expect(buttons[3].querySelector('button')?.innerHTML.trim()).toContain('÷')


  });
})
