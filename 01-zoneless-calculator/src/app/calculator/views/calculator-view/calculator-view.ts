import { Calculator } from './../../components/calculator/calculator';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator-view',
  imports: [
    Calculator
  ],
  templateUrl: './calculator-view.html',
  styleUrl: './calculator-view.css',
})
export default class CalculatorView { }
