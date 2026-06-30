import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-label.interface';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'labels-selector',
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelector {

  labels = input.required<GitHubLabel[]>();
  issuesService = inject(IssuesService);

  isSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName)
  }

  onToggleLabel(labelName: string) {
    this.issuesService.toggleLabel(labelName);
  }
}
