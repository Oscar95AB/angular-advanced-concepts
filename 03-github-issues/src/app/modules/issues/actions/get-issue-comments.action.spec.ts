import { getIssueComments } from './get-issue-comments.action';
import { environment } from '../../../../environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.action';
import { vi } from 'vitest'

const mockComments = [
  {
  id: 1,
  number: 123,
  title: 'Test issue 1',
  body: 'Test body 1'
},
  {
  id: 2,
  number: 321,
  title: 'Test issue 2',
  body: 'Test body 2'
}
]


const BASE_URL = environment.baseUrl

describe('getiIssueComment', () => {

  const mockIssueNumber = '123';

  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  })

  afterEach(() => {
    window.fetch = originalFetch;
  })

  it('should fetch and return an comments succesfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockComments)
    })
    const result = await getIssueComments(mockIssueNumber);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${environment.gitHubToken}`
      }
    })
    expect(result).toEqual(mockComments)

  })

  it('should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn()
    })

   await  expect(getIssueComments(mockIssueNumber)).rejects.toBe(`Can't load comments`)
  })

  it('should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network Error'))

   await  expect(getIssueComments(mockIssueNumber)).rejects.toBe(`Can't load comments`)
  })
})
