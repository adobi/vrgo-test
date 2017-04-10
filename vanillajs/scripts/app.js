import $ from './utils';

class App
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;

    App.repositoryListPage = $.find('#js-repository-list-page');
    App.repositoryDetailsPage = $.find('#js-repository-details-page');
  }


  run(repositoryList)
  {
    repositoryList.fetchPage(1);
  }

  static showPage(page)
  {
    switch (page) {
      case 'repo-list':
      case 'repo-details':
        $.toggleClass(App.repositoryListPage, 'hide');
        $.toggleClass(App.repositoryDetailsPage, 'hide');

        break;
    }
  }
}

export default App
