import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Summary {}
