class GithubApi
{
  constructor()
  {
    this.apiBase = 'https://api.github.com';
    this.lastPage = null;
  }

  getUserRepos(username, currentPage)
  {
    const endpoint = `${this.apiBase}/users/${username}/repos?page=${currentPage}`;
    // const endpoint = `data.json`;

    return fetch(endpoint)
      .then((response) => {
        this.lastPage = this.getLastPage(response.headers.get('Link'));
        return response.json();
      })
  }

  getLastPage(header)
  {
    if (!header) {
      return 10;
    }

    const token = header.split(', ')[1].split('>; ')[0].split('page=')[1].split('&')[0];

    return token;
  }
}

export default GithubApi
