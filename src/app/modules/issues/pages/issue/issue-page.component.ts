import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { map, tap } from 'rxjs';

import { IssueService } from '../../services/issue.service';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';
import { IssueCommentSkeletonComponent } from '../../components/issue-comment-skeleton/issue-comment-skeleton.component';

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [IssueCommentComponent, IssueCommentSkeletonComponent],
  templateUrl: './issue-page.component.html',
})
export default class IssuePageComponent {
  private _location = inject(Location);
  private _issueService = inject(IssueService);

  public route = inject(ActivatedRoute);
  public issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((num) => this._issueService.setIssueNumber(num))
    )
  );

  public get issueQuery() {
    return this._issueService.issueQuery;
  }

  public get issueCommentsQuery() {
    return this._issueService.issueCommentsQuery;
  }

  public goBack(): void {
    this._location.back();
  }
}
