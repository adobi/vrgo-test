import App from './app';
import RepositoryList from './repository-list';
import Pager from './pager';
import $ from './utils';

require('../styles/app.scss');

let app = new App($.find('#js-app'));

let repositoryList = new RepositoryList($.find('#js-repository-list'), 'addyosmani')
let pager = new Pager()

app.run(repositoryList);
