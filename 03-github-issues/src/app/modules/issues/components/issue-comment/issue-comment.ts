import { CommonModule } from '@angular/common';
import { GitHubIssue } from './../../interfaces/github-issue.interface';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';
@Component({
  selector: 'issue-comment',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './issue-comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueCommentComponent {
  issue = input.required<GitHubIssue |undefined>();
}
