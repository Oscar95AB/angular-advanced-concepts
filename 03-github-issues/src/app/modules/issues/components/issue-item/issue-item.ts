import { IssueService } from './../../services/issue';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GitHubIssue, State } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'issue-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './issue-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {

  issue = input.required<GitHubIssue>();
  issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open
  }

  since = '';

  prefetchData(){
    // this.issueService.prefetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue())
  }
}
