import * as models from '../models';
import requests from './requests';

export class RepositoriesService {
    public list(): Promise<models.Repository[]> {
        return requests.get('/repositories').then((res) => res.body as models.RepositoryList).then((list) => list.items || []);
    }

    public create({url, username, password}: {url: string, username: string, password: string}): Promise<models.Repository> {
        return requests.post('/repositories').send({ repo: url, username, password }).then((res) => res.body as models.Repository);
    }

    public delete(url: string): Promise<models.Repository> {
        return requests.delete(`/repositories/${encodeURIComponent(url)}`).send().then((res) => res.body as models.Repository);
    }

    public apps(repo: string, revision: string): Promise<models.AppInfo[]> {
        return requests.get(`/repositories/${encodeURIComponent(repo)}/apps`).query({revision})
            .then((res) => res.body.items as models.AppInfo[]);
    }

    public appDetails(repo: string, path: string, revision: string): Promise<models.AppDetails> {
        return requests.get(`/repositories/${encodeURIComponent(repo)}/apps/${encodeURIComponent(path)}`).query({revision})
            .then((res) => res.body as models.AppDetails);
    }
}
