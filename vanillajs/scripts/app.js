import $ from './utils';

class App
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
  }


  run(repositoryList)
  {
    repositoryList.fetchPage(1)
  }

  static showPage(page)
  {
    switch (page) {
      case 'repo-list':
      case 'repo-details':
        $.toggleClass($.find('#js-repository-list-page'), 'hide')
        $.toggleClass($.find('#js-repository-details-page'), 'hide')

        break;
    }
  }
}

export default App
