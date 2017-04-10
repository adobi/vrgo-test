import App from './app';
import RepositoryList from './repository-list';
import Pager from './pager';
import RepositoryDetails from './repository-details';
import $ from './utils';

require('../styles/app.scss');

const app = new App($.find('#js-app'));

RepositoryList.rootElement = $.find('#js-repository-list');
Pager.rootElement = $.find('#js-pagination');
RepositoryDetails.rootElement = $.find('#js-repository-details-page');

const repositoryList = new RepositoryList('addyosmani');

app.run(repositoryList);
