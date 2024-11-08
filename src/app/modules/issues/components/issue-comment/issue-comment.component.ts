import { Component, input } from '@angular/core';

import { MarkdownModule } from 'ngx-markdown';

import { GithubIssue } from '../../interfaces';

@Component({
  selector: 'issue-comment',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent {
  public issue = input.required<GithubIssue>();
}
