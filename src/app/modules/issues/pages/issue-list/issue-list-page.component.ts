import { Component, inject } from '@angular/core';

import { State } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';
import LabelSelectorComponent from '../../components/label-selector/label-selector.component';
import { IssueItemSkeletonComponent } from '../../components/issue-item-skeleton/issue-item-skeleton.component';
import { LabelSelectorSkeletonComponent } from '../../components/label-selector-skeleton/label-selector-skeleton.component';

const STATES: Record<string, State> = {
  all: State.All,
  open: State.Open,
  closed: State.Closed,
};

@Component({
  selector: 'issue-list-page',
  standalone: true,
  imports: [
    IssueItemComponent,
    LabelSelectorComponent,
    IssueItemSkeletonComponent,
    LabelSelectorSkeletonComponent,
  ],
  templateUrl: './issue-list-page.component.html',
})
export default class IssueListPageComponent {
  private _issuesService = inject(IssuesService);

  public get labelsQuery() {
    return this._issuesService.labelsQuery;
  }

  public get issuesQuery() {
    return this._issuesService.issuesQuery;
  }

  public get selectedState() {
    return this._issuesService.selectedState;
  }

  public setSelectedState(state: string) {
    this._issuesService.setSelectedState(STATES[state]);
  }
}
