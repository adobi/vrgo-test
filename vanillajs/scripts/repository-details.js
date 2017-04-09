import $ from './utils';
import RepositoryList from './repository-list';
import App from './app';

class RepositoryDetails
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
    this.bindEvents();
  }

  render(repo)
  {
    let template = `<a href="#" class="btn btn-default" data-src="js-back-to-list">Back</a>
      <h1>${repo.name}</h1>
      <h6>Stars: ${repo.stargazers_count} Forks: ${repo.forks_count} Last update: ${repo.updated_at}</h6>
      <p>${repo.description}</p>
      <a href="${repo.html_url}">View on github</a><a href="${repo.download_url}">Download</a>
    `;

    this.rootElement.innerHTML = template;
  }

  bindEvents()
  {
    let el = this.rootElement;

    el.addEventListener('click', (e) => {
      let el = e.target;
      let src = el.dataset.src;

      switch(src) {
        case 'js-back-to-list':

          App.showPage('repo-list')
          break;
      }

      e.preventDefault();
    })

    el.addEventListener('fetch-page', (e) => {
      this.fetchPage(e.detail.page)
    }, false)
  }
}

export default RepositoryDetails
