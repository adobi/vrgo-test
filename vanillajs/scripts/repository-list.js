import GithubApi from './github-api';
import Pager from './pager';
import App from './app';
import RepositoryDetails from './repository-details';

class RepositoryList
{
  constructor(username)
  {
    this.username = username;

    this.githubApi = new GithubApi();

    this.repositoryDetails =  new RepositoryDetails();
    this.pager = new Pager();

    this.repositories = [];
    this.bindEvents();
  }

  fetchPage(page)
  {
    this.renderRepositoryList(this.getListLoadingTemplate());
    this.githubApi
      .getUserRepos(this.username, page)
      .catch((error) => {
        console.log(error);
      })
      .then((response) => this.onFetchPageCompleted(response));
  }

  onFetchPageCompleted(response) {
    this.repositories = response;
    this.renderRepositoryList(this.getRepositoryListTemplate());

    Pager.rootElement.dispatchEvent(new CustomEvent('render', {detail: {page: this.githubApi.lastPage}}));
  }

  getRepositoryListTemplate()
  {
    let template = [];
    for (let item of this.repositories) {
      template.push(`<a href="#" class="list-group-item" data-repo-id="${item.id}" data-src="js-repository-item">${item.name}</a>`);
    }

    return template.join('')
  }

  renderRepositoryList(template)
  {
    RepositoryList.rootElement.innerHTML = template
  }

  getListLoadingTemplate()
  {
    return '<a class="list-group-item">Loading...</a>';
  }

  bindEvents()
  {
    const el = RepositoryList.rootElement;

    el.addEventListener('click', (e) => {
      const el = e.target;
      const src = el.dataset.src;

      switch(src) {
        case 'js-repository-item':
          this.onRepositoryItemClicked(+el.dataset.repoId)
          break;
      }

      if (src) {
        e.preventDefault();
      }
    });

    el.addEventListener('fetch-page', (e) => {
      this.fetchPage(e.detail.page)
    }, false);
  }

  onRepositoryItemClicked(repoId)
  {
    const repo = this.findRepo(repoId);

    this.repositoryDetails.render(repo);

    App.showPage('repo-details')
  }

  findRepo(id)
  {
    return this.repositories.filter((item) => {
      return item.id === id;
    })[0]
  }
}

export default RepositoryList
