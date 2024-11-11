import { TestBed } from '@angular/core/testing';

import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';

import { State } from '../../interfaces';
import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAngularQuery(queryClient)],
      teardown: {
        destroyAfterEach: false,
      },
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch labels', async () => {
    const { data } = await service.labelsQuery.refetch();

    expect(data).toHaveSize(30);
    const label1 = data![0];
    expect(typeof label1.color).toBe('string');
    expect(typeof label1.default).toBe('boolean');
    expect(typeof label1.description).toBe('string');
    expect(typeof label1.id).toBe('number');
    expect(typeof label1.name).toBe('string');
    expect(typeof label1.node_id).toBe('string');
    expect(typeof label1.url).toBe('string');
  });

  it('should fetch issues with specific state', async () => {
    service.setSelectedState(State.Closed);
    expect(service.selectedState).toBe(State.Closed);
    const { data: closedIssues } = await service.issuesQuery.refetch();
    closedIssues?.forEach((issue) => {
      expect(issue.state).toBe(State.Closed);
    });

    service.setSelectedState(State.Open);
    expect(service.selectedState).toBe(State.Open);
    const { data: openIssues } = await service.issuesQuery.refetch();
    openIssues?.forEach((issue) => {
      expect(issue.state).toBe(State.Open);
    });
  });

  it('should toggle labels', () => {
    const label = 'Accessibility';

    service.toggleLabels(label);
    expect(service.selectedLabels.has(label)).toBeTruthy();

    service.toggleLabels(label);
    expect(service.selectedLabels.has(label)).toBeFalsy();
  });

  it('should fetch labels by label(s)', async () => {
    const label = 'Accessibility';

    service.toggleLabels(label);
    expect(service.selectedLabels.has(label)).toBeTruthy();

    const { data: issuesByLabels } = await service.issuesQuery.refetch();
    issuesByLabels?.forEach((issue) => {
      const hasLabel = issue.labels.some((l) => l.name === label);
      expect(hasLabel).toBe(true);
    });
  });
});
