import $ from './utils';
import RepositoryList from './repository-list';
import App from './app';

class RepositoryDetails
{
  constructor()
  {
    this.bindEvents();
  }

  render(repo)
  {
    let template = `<nav class="nav-back"><a href="#" class="btn" data-src="js-back-to-list">Back</a></nav>
      <div class="repo-details">
        <h1 class="repo-name">${repo.name}</h1>
        <div class="details"><span class="label">Stars: ${repo.stargazers_count}</span> <span class="label">Forks: ${repo.forks_count}</span> <span class="label">Last update: ${repo.updated_at.split('T')[0]}</span></div>
        <p>${repo.description}</p>
        <div class="actions"><a class="btn" href="${repo.html_url}" target="_blank">View on github</a></div>
      </div>
    `;

    RepositoryDetails.rootElement.innerHTML = template;
  }

  bindEvents()
  {
    let el = RepositoryDetails.rootElement;

    el.addEventListener('click', (e) => {
      let el = e.target;
      let src = el.dataset.src;

      switch(src) {
        case 'js-back-to-list':

          App.showPage('repo-list');
          break;
      }

      if (src) {
        e.preventDefault();
      }
    })

    el.addEventListener('fetch-page', (e) => {
      this.fetchPage(e.detail.page)
    }, false)
  }
}

export default RepositoryDetails
