import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-label.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'labels-selector',
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelector {

  labels = input.required<GitHubLabel[]>();

}
