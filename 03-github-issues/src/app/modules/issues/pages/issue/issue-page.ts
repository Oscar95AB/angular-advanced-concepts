import { IssueService } from './../../services/issue';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment';

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, CommonModule, IssueCommentComponent],
  templateUrl: './issue-page.html',
})
export default class IssuePage {

  route = inject(ActivatedRoute);
  issueService = inject(IssueService);

  issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map(params => params.get('number') ?? ''),
      tap( number => this.issueService.setIssueNumber(number))
    )
  )
   issueComment = toSignal<string>(
    this.route.paramMap.pipe(
      map(params => params.get('number') ?? ''),
      tap( number => this.issueService.setIssueNumber(number))
    )
  )

   public issueQuery = this.issueService.issueQuery;
   public issueComments = this.issueService.issueComments;



}
