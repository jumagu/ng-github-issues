import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { GithubIssue, State } from '../../interfaces';
import { IssueService } from '../../services/issue/issue.service';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {
  private _issueService = inject(IssueService);
  public issue = input.required<GithubIssue>();

  public get isOpen() {
    return this.issue().state === State.Open;
  }

  public prefetchIssue() {
    // this._issueService.prefetchIssue(this.issue().number.toString());
    this._issueService.setIssueData(this.issue());
  }
}
