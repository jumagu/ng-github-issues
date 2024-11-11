import { Injectable, signal } from '@angular/core';

import { injectQuery } from '@tanstack/angular-query-experimental';

import { State } from '../../interfaces';
import { getLabels, getIssues } from '../../actions';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private _selectedState = signal<State>(State.All);
  private _selectedLabels = signal(new Set<string>());

  public get selectedState() {
    return this._selectedState();
  }

  public get selectedLabels() {
    return this._selectedLabels();
  }

  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  public issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this._selectedState(),
        selectedLabels: [...this._selectedLabels()],
      },
    ],
    queryFn: () =>
      getIssues(this._selectedState(), [...this._selectedLabels()]),
  }));

  public setSelectedState(state: State) {
    this._selectedState.set(state);
  }

  public toggleLabels(label: string) {
    const labels = this._selectedLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this._selectedLabels.set(new Set(labels));
  }
}
