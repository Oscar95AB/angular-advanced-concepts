import { CalculatorService } from '@/calculator/services/calculator';
import { TestBed } from '@angular/core/testing';
import{ vi } from 'vitest'
describe('CalculatorService', () => {

  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({}); // Cama de TestBed
    service = TestBed.inject(CalculatorService);

    // vi.clearAllMocks(); --> Mock que tiene valor por defecto
    // rset pone la implementación oficial
    vi.resetAllMocks();

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResult()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResult.set('456');
    service.lastOperator.set('*')
    service.constructNumber('C');
    expect(service.resultText()).toBe('0');
    expect(service.subResult()).toBe('0');
    expect(service.lastOperator()).toBe('+');
    service.constructNumber('1');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1')
    service.constructNumber('2');
    expect(service.resultText()).toBe('12')
    service.constructNumber('3');
    expect(service.resultText()).toBe('123')

  });

  it('should handle operators correctly', () => {

    const operators = ['+', '-', '*', '/', '÷', 'x'];

    operators.forEach( operator => {
    service.resultText.set('12');
    service.constructNumber(operator)

    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe(operator);
    })


  });

  it('should calculate result correctly for addition', () => {

    service.constructNumber('1')
    service.constructNumber('+')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('3')
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('1')
    service.constructNumber('-')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('-1')
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('1')
    service.constructNumber('*')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('2')
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('2')
    service.constructNumber('/')
    service.constructNumber('1')
    service.constructNumber('=')
    expect(service.resultText()).toBe('2')
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1')
    service.constructNumber('.')
    service.constructNumber('2')
    service.constructNumber('.')
    service.constructNumber('+')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('3.2')
  });

  it('should handle decimal point starting with 0', () => {
    service.constructNumber('.')
    service.constructNumber('2')
    service.constructNumber('+')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('2.2')
  });

  it('should handle sign change +/-', () => {
      service.constructNumber('.')
    service.constructNumber('2')
    service.constructNumber('+')
    service.constructNumber('+/-')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('-1.8')
  });

  it('should handle backspace', () => {
     service.constructNumber('1')
     service.constructNumber('1')
     service.constructNumber('Backspace')
    service.constructNumber('*')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('2')
  });

  it('should handle backspace with negative numbers', () => {
     service.constructNumber('1')
     service.constructNumber('+/-')
     service.constructNumber('1')
     service.constructNumber('Backspace')

    service.constructNumber('*')
    service.constructNumber('2')
    service.constructNumber('=')
    expect(service.resultText()).toBe('-2')
  });

  it('should handle max length', () => {

    const consoleSpy = vi.spyOn(console, 'log');
    consoleSpy.mockImplementation(()=>{})


    for(let i = 0; i<20; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10)
    expect(service.resultText()).toBe('1111111111')

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(10);
  });

  it('should handle invalid input', () => {

    const consoleSpy = vi.spyOn(console, 'log');

    service.resultText.set('15');
    service.constructNumber('ABC');

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input', 'ABC');

  });

})
