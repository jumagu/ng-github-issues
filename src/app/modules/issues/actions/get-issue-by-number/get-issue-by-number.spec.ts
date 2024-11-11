import { environment } from 'src/environments/environment';
import { getIssueByNumber } from './get-issue-by-number';

const BASE_URL = environment.githubApiBaseUrl;
const GITHUB_TOKEN = environment.githubToken;
const ISSUE_NUMBER = 123456;
const MOCK_ISSUE = {
  id: 123,
  number: ISSUE_NUMBER,
  body: 'Id non tempor elit aliquip qui in in irure labore.',
};

describe('getIssueByNumber', () => {
  it('should fetch issue successfully', async () => {
    const requestUrl = `${BASE_URL}/issues/${ISSUE_NUMBER}`;
    const issueResponse = new Response(JSON.stringify(MOCK_ISSUE), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(ISSUE_NUMBER.toString());

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    expect(issue).toEqual(MOCK_ISSUE as any);
  });

  it('should catch the error correctly on failure', async () => {
    const requestUrl = `${BASE_URL}/issues/${ISSUE_NUMBER}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssueByNumber(ISSUE_NUMBER.toString());
      expect(true).toBe(false);
    } catch (error) {
      expect((error as Error).message).toBe(
        'Something went wrong, please try again later'
      );
    }

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
  });
});
