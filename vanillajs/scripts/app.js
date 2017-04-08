import RepositoryList from './repository-list';
import $ from './utils';

class App
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
  }


  run(repositoryList)
  {
    App.repositoryList = repositoryList;

    App.repositoryList.fetchPage(1)
  }

  static getRepositoryList()
  {
    return App.repositoryList;
  }
}

export default App
