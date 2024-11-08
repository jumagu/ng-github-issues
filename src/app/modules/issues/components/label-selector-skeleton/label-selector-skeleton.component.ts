import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issue-label-selector-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-selector-skeleton.component.html',
  host: {
    class: 'block overflow-x-scroll',
  },
})
export class LabelSelectorSkeletonComponent {
  public items: number[] = Array.from(
    { length: 30 },
    () => Math.floor(Math.random() * (150 - 100 + 1)) + 100
  );
}
