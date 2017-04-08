import $ from './utils';
import GithubApi from './github-api';
import Pager from './pager';

class RepositoryList
{
  constructor(rootElement, username)
  {
    this.rootElement = rootElement;
    this.username = username;

    this.githubApi = new GithubApi();
    this.repositories = [];

    this.pager = new Pager($.find('#js-pagination'));

    this.bindEvents();
  }

  fetchPage()
  {
    this.renderRepositoryList(this.getListLoadingTemplate());
    this.githubApi
      .getUserRepos(this.username, this.pager.current)
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        this.repositories = response;
        this.renderRepositoryList(this.getRepositoryListTemplate());

        this.pager.last = this.githubApi.lastPage;
        this.pager.render();
      });
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
    this.rootElement.innerHTML = template
  }

  getListLoadingTemplate()
  {
    return '<a class="list-group-item">Loading...</a>';
  }

  bindEvents()
  {
    this.rootElement.addEventListener('click', (e) => {
      let el = e.target;
      let src = el.dataset.src;

      switch(src) {
        case 'js-repository-item':
          console.log(el.dataset.repoId);
          break;
      }

      e.preventDefault();
    })
  }
}

export default RepositoryList
