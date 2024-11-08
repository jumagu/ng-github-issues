import { delay } from '@/helpers';
import { GithubLabel } from '../interfaces';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.githubApiBaseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getLabels = async (): Promise<GithubLabel[]> => {
  try {
    await delay(1);
    const res = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) throw new Error('');

    const labels: GithubLabel[] = await res.json();

    return labels;
  } catch (error) {
    throw new Error('');
  }
};
