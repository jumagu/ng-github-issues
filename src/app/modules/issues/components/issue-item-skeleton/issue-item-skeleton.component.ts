import { Component } from '@angular/core';

@Component({
  selector: 'issue-item-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './issue-item-skeleton.component.html',
})
export class IssueItemSkeletonComponent {
  public labels = Array.from({ length: 3 });
}
