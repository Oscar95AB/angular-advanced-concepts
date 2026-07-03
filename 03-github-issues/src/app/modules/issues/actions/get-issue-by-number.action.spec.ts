import { environment } from '../../../../environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.action';
import { vi } from 'vitest'

const mockIssue = {
  id: 1,
  number: 123,
  title: 'Test issue',
  body: 'Test body'
}

const BASE_URL = environment.baseUrl

describe('getiIssueByNumber', () => {

  const mockIssueNumber = '123';

  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  })

  afterEach(() => {
    window.fetch = originalFetch;
  })

  it('should fetch and return an issue succesfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIssue)
    })
    const result = await getIssueByNumber(mockIssueNumber);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}`, {
      headers: {
        Authorization: `Bearer ${environment.gitHubToken}`
      }
    })
    expect(result).toEqual(mockIssue)

  })

  it('should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn()
    })

   await  expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(`Can't load issue ${mockIssueNumber}`)
  })

  it('should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network Error'))

   await  expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(`Can't load issue ${mockIssueNumber}`)
  })
})
