class $
{
  static find(selector, context)
  {
    if (!context) {
      context = document;
    }
    return context.querySelector(selector);
  }

  static hasClass(element, className)
  {
    return element.classList.contains(className);
  }

  static toggleClass(element, className)
  {
    return element.classList.toggle(className);
  }
}

class App
{
  constructor(rootElement, username)
  {
    this.rootElement = rootElement;
    this.username = username;
    this.githubApi = new GithubApi();
    this.repositories = [];
    this.pager = new Pager($.find('#js-pagination'));
  }

  run ()
  {
    this.bindEvents();
    this.fetchPage()
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
    $.find('#js-repository-list', this.rootElement).innerHTML = template
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
        case 'js-prev-page':
          if (this.pager.current > 1) {
            this.pager.current = this.pager.current - 1;
            this.pager.activate();
            this.fetchPage();
          }
          break;
        case 'js-next-page':
          if (this.pager.current < this.pager.last) {
            this.pager.current = this.pager.current + 1;
            this.pager.activate();
            this.fetchPage();
          }
          break;
        case 'js-page':
          this.pager.current = el.dataset.page;
          this.pager.activate();
          this.fetchPage();
          break;
      }

      e.preventDefault();
    })
  }
}

class Pager
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
    this._last = 0;
    this._current = 1;
    this.isRendered = false;
  }

  set last(last)
  {
    this._last = last;
    return this;
  }

  get last()
  {
    return this._last;
  }

  set current(current)
  {
    this._current = current;
  }

  get current()
  {
    return this._current;
  }

  render()
  {
    if (this.isRendered) {
      return;
    }

    let template = ['<li><a href="#" data-src="js-prev-page">Prev</a></li>'];
    for(let i = 1; i <= this._last; i++) {
      template.push(`<li class="${i===1 ? 'active' : ''}"><a href="#" data-src="js-page" data-page="${i}">${i}</a></li>`)
    }
    template.push('<li><a href="#" data-src="js-next-page">Next</a></li>');

    $.find('#js-pagination').innerHTML = template.join('')
    this.isRendered = true;
  }

  activate()
  {
    let prev = $.find('.active', this.rootElement);
    if (prev) {
      $.toggleClass($.find('.active', this.rootElement), 'active');
    }
    $.toggleClass($.find(`[data-page="${this.current}"]`).parentNode, 'active')
  }
}

class GithubApi
{
  constructor()
  {
    this.apiBase = 'https://api.github.com';
    this.lastPage = null;
  }

  getUserRepos(username, currentPage)
  {

    let endpoint = `${this.apiBase}/users/${username}/repos?page=${currentPage}`;

    return fetch(endpoint)
      .then((response) => {
        this.lastPage = this.parseLinkHeader(response.headers.get('Link'));
        return response.json();
      })
  }

  parseLinkHeader(header)
  {
    let token = header.split(', ')[1].split('>; ')[0].split('page=')[1].split('&')[0];
    return token;
  }
}

function alma(response)
{
  console.log(response)
}

(() => {
  let app = new App($.find('#js-app'), 'addyosmani');

  app.run();
})();
