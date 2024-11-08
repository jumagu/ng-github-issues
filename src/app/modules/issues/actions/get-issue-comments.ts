import { delay } from '@/helpers';
import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.githubApiBaseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueComments = async (
  issueNumber: string
): Promise<GithubIssue[]> => {
  try {
    await delay(1);
    const res = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) throw new Error('');

    const issue: GithubIssue[] = await res.json();

    return issue;
  } catch (error) {
    throw new Error('');
  }
};
