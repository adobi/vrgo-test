import { Injectable } from '@angular/core';

@Injectable()
export class Github
{
    private apiBase: string = 'https://api.github.com';
    private _lastPage: number = 0;

    public getUserRepos(username, currentPage)
    {
        // let endpoint = `${this.apiBase}/users/${username}/repos?page=${currentPage}`;
        let endpoint = '../data.json';
        return fetch(endpoint)
            .then((response) => {
                this._lastPage = this.getLastPage(response.headers.get('Link'));
                return response.json();
            });
    }

    public getLastPage(header)
    {
        if (!header) {
            return 10;
        }
        let token = header.split(', ')[1].split('>; ')[0].split('page=')[1].split('&')[0];
        return token;
    }

    public get lastPage()
    {
        return this._lastPage;
    }

    public getRepository(userName: string, repositoryName: string)
    {
        const endpoint = `${this.apiBase}/repos/${userName}/${repositoryName}`;

        return fetch(endpoint).then((response: any) => response.json() );
    }
}
