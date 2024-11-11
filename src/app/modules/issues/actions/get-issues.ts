import { delay } from '@/helpers';
import { GithubIssue, State } from '../interfaces';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.githubApiBaseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async (
  state: State = State.All,
  labels: string[] = []
): Promise<GithubIssue[]> => {
  const params = new URLSearchParams();
  params.append('state', state);

  if (labels.length > 0) {
    params.append('labels', labels.join(','));
  }

  try {
    await delay(1);
    const res = await fetch(`${BASE_URL}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!res.ok)
      throw new Error('Something went wrong, please try again later');

    const issues: GithubIssue[] = await res.json();

    return issues;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An error occurred while fetching the issues.');
    }
  }
};
