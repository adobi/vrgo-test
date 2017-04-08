import $ from './utils';
import App from './app';
class Pager
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
    this._last = 0;
    this._current = 1;
    this.isRendered = false;

    this.bindEvents();

    this.repositoryList = App.getRepositoryList();
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
    this.activate();
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

  bindEvents()
  {
    this.rootElement.addEventListener('click', (e) => {
      let el = e.target;
      let src = el.dataset.src;

      switch(src) {
        case 'js-prev-page':
          if (this.current > 1) {
            this.current = this.current - 1;
            this.repositoryList.fetchPage();
          }
          break;
        case 'js-next-page':
          if (this.current < this.last) {
            this.current = this.current + 1;
            this.repositoryList.fetchPage();
          }
          break;
        case 'js-page':
          this.current = el.dataset.page;
          this.repositoryList.fetchPage();
          break;
      }

      e.preventDefault();
    })
  }
}

export default Pager
