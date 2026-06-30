import { IssueService } from './../../services/issue';
import {  Component, inject } from '@angular/core';

import { IssuesService } from '../../services/issues.service';
import { LabelsSelector } from '../../components/labels-selector/labels-selector.component';
import { IssueItem } from "../../components/issue-item/issue-item";
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  imports: [LabelsSelector, IssueItem],
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

  onChangeState(newState: string) {
    const state = {
      'all': State.All,
      'open': State.Open,
      'closed': State.Closed,
    }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);

  }

}
