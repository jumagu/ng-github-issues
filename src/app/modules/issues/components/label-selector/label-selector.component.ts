import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { GithubLabel } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issue-label-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-selector.component.html',
  host: {
    class: 'block overflow-x-auto',
  },
})
export default class LabelSelectorComponent {
  private _issuesService = inject(IssuesService);
  public labels = input.required<GithubLabel[]>();

  public isSelected(labelName: string): boolean {
    return this._issuesService.selectedLabels.has(labelName);
  }

  public toggleLabelHandler(labelName: string): void {
    this._issuesService.toggleLabels(labelName);
  }
}
