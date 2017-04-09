import $ from './utils';
import GithubApi from './github-api';
import Pager from './pager';
import App from './app';
import RepositoryDetails from './repository-details';

class RepositoryList
{
  constructor(rootElement, username)
  {
    RepositoryList.rootElement = rootElement;
    this.username = username;

    this.githubApi = new GithubApi();

    this.repositoryDetails =  new RepositoryDetails($.find('#js-repository-details-page'));

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
    let el = RepositoryList.rootElement;

    el.addEventListener('click', (e) => {
      let el = e.target;
      let src = el.dataset.src;

      switch(src) {
        case 'js-repository-item':
          this.onRepositoryItemClicked(+el.dataset.repoId)
          break;
      }

      e.preventDefault();
    })

    el.addEventListener('fetch-page', (e) => {
      this.fetchPage(e.detail.page)
    }, false)
  }

  onRepositoryItemClicked(repoId)
  {
    let repo = this.findRepo(repoId);
    this.repositoryDetails.render(repo)

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
