import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { IssuesService } from './issues.service';
import { TestBed } from '@angular/core/testing';
import { State } from '../interfaces';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // ✅ faster failure tests
    },
  },
})

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(queryClient)],
    })
    service = TestBed.inject(IssuesService);
  });
  afterEach(() => {
    queryClient.clear();
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default values', () => {
    expect(service.selectedState()).toBe(State.All);
    expect(service.selectedLabels()).toEqual(new Set<string>);
    expect(service.query.isLoading()).toBe(true);
    expect(service.issuesQuery.isLoading()).toBe(true);
  });

  it('should set selectedLabels', () => {
    const label = 'Accesibility';

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(true);

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(false);

  })

  it('should set selectedn state , open close, all', () => {

    const newState = State.Closed;
    service.showIssuesByState(newState);
    expect(service.selectedState()).toBe(newState)

  })

  it('should result labelsQuery when is called', async () => {
    expect(service.query.status()).toBe('pending');

    const { data, status } = await service.query.refetch();
    expect(status).toBe('success');
    expect(data?.length).toBe(30);

    const label = data!.at(0)!;


    expect(typeof label.id).toBe('number') //: 2732535159,
    expect(typeof label.node_id).toBe('string') //: 'MDU6TGFiZWwyNzMyNTM1MTU5',
    expect(typeof label.url).toBe('string') //: 'https://api.github.com/repos/angular/angular/labels/Accessibility',
    expect(typeof label.name).toBe('string') //: 'Accessibility',
    expect(typeof label.color).toBe('string') //: 'b52eea',
    expect(typeof label.default).toBe('boolean') //: false,
    expect(typeof label.description).toBe('string') //: 'issues related to accessibility
  })

  it('should set selectedLabels and get issues by label', async () => {

    const myLabel = 'Accesibility';
    service.toggleLabel(myLabel);
    expect(service.selectedLabels().has(myLabel)).toBe(true);
    TestBed.tick()
    const { data, status } = await service.issuesQuery.refetch();
    expect(status).toBe('success');

    data!.forEach(issue => {
      const hasLabel = issue.labels.some(
        label => label.name === myLabel
      );
      expect(hasLabel).toBe('true');
    })
  });


});
