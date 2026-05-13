import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorView from './calculator-view';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  template: '<div>MockCalculator</div>'
})
class MockCalculator {}

describe('CalculatorViewComponent', () => {

  let component : CalculatorView
  let fixture: ComponentFixture<CalculatorView>

  beforeEach(()=> {
    // Sobreescribimos el Calculator
    TestBed.configureTestingModule({
      imports: [CalculatorView],
    }).overrideComponent(CalculatorView, {
      set: {
        imports: [MockCalculator]
      }
    })

    fixture = TestBed.createComponent(CalculatorView)
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should render the calculator component', () => {
    const compile = fixture.nativeElement as HTMLElement;
    expect(compile.querySelector('calculator')).toBeTruthy();
  })

  it('should contain that specific css classes in the wrapper', () => {
    const compile = fixture.nativeElement as HTMLElement;
    const divElement = compile.querySelector('div')

    const expectedClasses = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    expectedClasses.forEach( className => {
      expect(divElement?.classList).toContain(className);
    })
  })
})
