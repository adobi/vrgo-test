import $ from './utils';
import RepositoryList from './repository-list'

class Pager
{
  constructor()
  {
    this._last = 0;
    this._current = 1;
    this.isRendered = false;
    this.bindEvents();
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
    RepositoryList.rootElement.dispatchEvent(new CustomEvent('fetch-page', {detail: {page: this.current}}));
  }

  get current()
  {
    return this._current;
  }

  render()
  {
    if (this.isRendered || this._last <= this._current) {
      return;
    }

    let template = ['<li><a href="#" data-src="js-prev-page">Prev</a></li>'];

    for(let i = 1; i <= this._last; i++) {
      template.push(`<li class="${i===1 ? 'active' : ''}"><a href="#" data-src="js-page" data-page="${i}">${i}</a></li>`)
    }
    template.push('<li><a href="#" data-src="js-next-page">Next</a></li>');

    Pager.rootElement.innerHTML = template.join('');
    this.isRendered = true;
  }

  activate()
  {
    const prev = $.find('.active', Pager.rootElement);

    if (prev) {
      $.toggleClass($.find('.active', Pager.rootElement), 'active');
    }
    $.toggleClass($.find(`[data-page="${this.current}"]`, Pager.rootElement).parentNode, 'active');
  }

  bindEvents()
  {
    const el = Pager.rootElement;

    el.addEventListener('click', (e) => {
      const el = e.target;
      const src = el.dataset.src;

      switch(src) {
        case 'js-prev-page':
          if (this.current > 1) {
            this.current = +this.current - 1;
          }
          break;
        case 'js-next-page':
          if (this.current < this.last) {
            this.current = +this.current + 1;
          }
          break;
        case 'js-page':
          this.current = el.dataset.page;
          break;
      }

      if (src) {
        e.preventDefault();
      }
    });


    el.addEventListener('render', (e) => {
      this.last = +e.detail.page;
      this.render();
    }, false);
  }
}

export default Pager
