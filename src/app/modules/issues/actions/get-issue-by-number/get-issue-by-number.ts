import { delay } from '@/helpers';
import { GithubIssue } from '../../interfaces';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.githubApiBaseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GithubIssue> => {
  try {
    await delay(1);
    const res = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!res.ok)
      throw new Error('Something went wrong, please try again later');

    const issue: GithubIssue = await res.json();

    return issue;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An error occurred while fetching the issue.');
    }
  }
};
