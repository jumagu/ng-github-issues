import { environment } from 'src/environments/environment';
import { getIssueComments } from './get-issue-comments';

const BASE_URL = environment.githubApiBaseUrl;
const GITHUB_TOKEN = environment.githubToken;
const ISSUE_NUMBER = 123456;
const MOCK_COMMENTS = [
  {
    id: 1,
    body: 'Deserunt aute adipisicing laborum sit.',
    user: {
      login: 'User 1',
    },
  },
  {
    id: 2,
    body: 'Minim mollit nulla dolore laboris reprehenderit.',
    user: {
      login: 'User 2',
    },
  },
];

describe('getIssueComments', () => {
  it('should fetch issue comments successfully', async () => {
    const requestUrl = `${BASE_URL}/issues/${ISSUE_NUMBER}/comments`;
    const issueResponse = new Response(JSON.stringify(MOCK_COMMENTS), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const comments = await getIssueComments(ISSUE_NUMBER.toString());

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    expect(comments).toEqual(MOCK_COMMENTS as any);
  });

  it('should catch the error correctly on failure', async () => {
    const requestUrl = `${BASE_URL}/issues/${ISSUE_NUMBER}/comments`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssueComments(ISSUE_NUMBER.toString());
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
