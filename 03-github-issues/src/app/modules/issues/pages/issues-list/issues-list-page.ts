import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IssuesService } from '../../services/issues.service';
import { LabelsSelector } from '../../components/labels-selector/labels-selector.component';
import { IssueItem } from "../../components/issue-item/issue-item";

@Component({
  selector: 'app-issues-list-page',
  imports: [RouterLink, LabelsSelector, IssueItem],
  standalone: true,
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage {

  public issuesService = inject(IssuesService);

  get query() {
    return this.issuesService.query;
  }
  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

}
