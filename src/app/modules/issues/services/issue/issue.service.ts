import { Injectable, signal } from '@angular/core';

import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';

import { GithubIssue } from '../../interfaces';
import { getIssueComments, getIssueByNumber } from '../../actions';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private _issueNumber = signal<string | null>(null);
  private _queryClient = injectQueryClient();

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber()],
    queryFn: () => getIssueByNumber(this._issueNumber()!),
    enabled: !!this._issueNumber(),
    staleTime: 1000 * 60,
    retry: false,
  }));

  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber(), 'comments'],
    queryFn: () => getIssueComments(this._issueNumber()!),
    enabled: !!this._issueNumber(),
    retry: false,
  }));

  public setIssueNumber(num: string) {
    this._issueNumber.set(num);
  }

  public prefetchIssue(issueNumber: string) {
    return this._queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssueByNumber(issueNumber),
      staleTime: 1000 * 60,
    });
  }

  public setIssueData(issue: GithubIssue) {
    this._queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  }
}
