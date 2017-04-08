import RepositoryList from './repository-list';
import $ from './utils';

class App
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
    this.repositoryList = new RepositoryList($.find('#js-repository-list'), 'addyosmani')
  }

  run()
  {
    this.repositoryList.fetchPage()
  }

  static getRepositoryList()
  {
    return this.repositoryList;
  }
}

export default App
