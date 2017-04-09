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
    repositoryList.fetchPage(1)
  }
}

export default App
