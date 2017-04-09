/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = function () {
  function $() {
    _classCallCheck(this, $);
  }

  _createClass($, null, [{
    key: "find",
    value: function find(selector, context) {
      if (!context) {
        context = document;
      }
      return context.querySelector(selector);
    }
  }, {
    key: "hasClass",
    value: function hasClass(element, className) {
      return element.classList.contains(className);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(element, className) {
      return element.classList.toggle(className);
    }
  }]);

  return $;
}();

exports.default = $;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _githubApi = __webpack_require__(6);

var _githubApi2 = _interopRequireDefault(_githubApi);

var _pager = __webpack_require__(2);

var _pager2 = _interopRequireDefault(_pager);

var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

var _repositoryDetails = __webpack_require__(16);

var _repositoryDetails2 = _interopRequireDefault(_repositoryDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepositoryList = function () {
  function RepositoryList(rootElement, username) {
    _classCallCheck(this, RepositoryList);

    RepositoryList.rootElement = rootElement;
    this.username = username;

    this.githubApi = new _githubApi2.default();

    this.repositoryDetails = new _repositoryDetails2.default(_utils2.default.find('#js-repository-details-page'));

    this.repositories = [];
    this.bindEvents();
  }

  _createClass(RepositoryList, [{
    key: 'fetchPage',
    value: function fetchPage(page) {
      var _this = this;

      this.renderRepositoryList(this.getListLoadingTemplate());
      this.githubApi.getUserRepos(this.username, page).catch(function (error) {
        console.log(error);
      }).then(function (response) {
        return _this.onFetchPageCompleted(response);
      });
    }
  }, {
    key: 'onFetchPageCompleted',
    value: function onFetchPageCompleted(response) {
      this.repositories = response;
      this.renderRepositoryList(this.getRepositoryListTemplate());

      _pager2.default.rootElement.dispatchEvent(new CustomEvent('render', { detail: { page: this.githubApi.lastPage } }));
    }
  }, {
    key: 'getRepositoryListTemplate',
    value: function getRepositoryListTemplate() {
      var template = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.repositories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          template.push('<a href="#" class="list-group-item" data-repo-id="' + item.id + '" data-src="js-repository-item">' + item.name + '</a>');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return template.join('');
    }
  }, {
    key: 'renderRepositoryList',
    value: function renderRepositoryList(template) {
      RepositoryList.rootElement.innerHTML = template;
    }
  }, {
    key: 'getListLoadingTemplate',
    value: function getListLoadingTemplate() {
      return '<a class="list-group-item">Loading...</a>';
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      var el = RepositoryList.rootElement;

      el.addEventListener('click', function (e) {
        var el = e.target;
        var src = el.dataset.src;

        switch (src) {
          case 'js-repository-item':
            _this2.onRepositoryItemClicked(+el.dataset.repoId);
            break;
        }

        if (src) {
          e.preventDefault();
        }
      });

      el.addEventListener('fetch-page', function (e) {
        _this2.fetchPage(e.detail.page);
      }, false);
    }
  }, {
    key: 'onRepositoryItemClicked',
    value: function onRepositoryItemClicked(repoId) {
      var repo = this.findRepo(repoId);
      this.repositoryDetails.render(repo);

      _app2.default.showPage('repo-details');
    }
  }, {
    key: 'findRepo',
    value: function findRepo(id) {
      return this.repositories.filter(function (item) {
        return item.id === id;
      })[0];
    }
  }]);

  return RepositoryList;
}();

exports.default = RepositoryList;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _repositoryList = __webpack_require__(1);

var _repositoryList2 = _interopRequireDefault(_repositoryList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pager = function () {
  function Pager() {
    _classCallCheck(this, Pager);

    Pager.rootElement = _utils2.default.find('#js-pagination');
    this._last = 0;
    this._current = 1;
    this.isRendered = false;
    this.bindEvents();
  }

  _createClass(Pager, [{
    key: 'render',
    value: function render() {
      if (this.isRendered) {
        return;
      }

      var template = ['<li><a href="#" data-src="js-prev-page">Prev</a></li>'];
      for (var i = 1; i <= this._last; i++) {
        template.push('<li class="' + (i === 1 ? 'active' : '') + '"><a href="#" data-src="js-page" data-page="' + i + '">' + i + '</a></li>');
      }
      template.push('<li><a href="#" data-src="js-next-page">Next</a></li>');

      Pager.rootElement.innerHTML = template.join('');
      this.isRendered = true;
    }
  }, {
    key: 'activate',
    value: function activate() {
      var prev = _utils2.default.find('.active', Pager.rootElement);
      if (prev) {
        _utils2.default.toggleClass(_utils2.default.find('.active', Pager.rootElement), 'active');
      }
      _utils2.default.toggleClass(_utils2.default.find('[data-page="' + this.current + '"]', Pager.rootElement).parentNode, 'active');
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      var el = Pager.rootElement;

      el.addEventListener('click', function (e) {
        var el = e.target;
        var src = el.dataset.src;
        switch (src) {
          case 'js-prev-page':
            if (_this.current > 1) {
              _this.current = +_this.current - 1;
            }
            break;
          case 'js-next-page':
            if (_this.current < _this.last) {
              _this.current = +_this.current + 1;
            }
            break;
          case 'js-page':
            _this.current = el.dataset.page;
            break;
        }

        if (src) {
          e.preventDefault();
        }
      });

      el.addEventListener('render', function (e) {
        _this.last = e.detail.page;
        _this.render();
      }, false);
    }
  }, {
    key: 'last',
    set: function set(last) {
      this._last = last;
      return this;
    },
    get: function get() {
      return this._last;
    }
  }, {
    key: 'current',
    set: function set(current) {
      this._current = current;
      this.activate();
      _repositoryList2.default.rootElement.dispatchEvent(new CustomEvent('fetch-page', { detail: { page: this.current } }));
    },
    get: function get() {
      return this._current;
    }
  }]);

  return Pager;
}();

exports.default = Pager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(rootElement) {
    _classCallCheck(this, App);

    this.rootElement = rootElement;
  }

  _createClass(App, [{
    key: 'run',
    value: function run(repositoryList) {
      repositoryList.fetchPage(1);
    }
  }], [{
    key: 'showPage',
    value: function showPage(page) {
      switch (page) {
        case 'repo-list':
        case 'repo-details':
          _utils2.default.toggleClass(_utils2.default.find('#js-repository-list-page'), 'hide');
          _utils2.default.toggleClass(_utils2.default.find('#js-repository-details-page'), 'hide');

          break;
      }
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

var _repositoryList = __webpack_require__(1);

var _repositoryList2 = _interopRequireDefault(_repositoryList);

var _pager = __webpack_require__(2);

var _pager2 = _interopRequireDefault(_pager);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(4);

var app = new _app2.default(_utils2.default.find('#js-app'));

var repositoryList = new _repositoryList2.default(_utils2.default.find('#js-repository-list'), 'addyosmani');
var pager = new _pager2.default();

app.run(repositoryList);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GithubApi = function () {
  function GithubApi() {
    _classCallCheck(this, GithubApi);

    this.apiBase = 'https://api.github.com';
    this.lastPage = null;
  }

  _createClass(GithubApi, [{
    key: 'getUserRepos',
    value: function getUserRepos(username, currentPage) {
      var _this = this;

      // let endpoint = `${this.apiBase}/users/${username}/repos?page=${currentPage}`;
      var endpoint = 'data.json';

      return fetch(endpoint).then(function (response) {
        _this.lastPage = _this.getLastPage(response.headers.get('Link'));
        return response.json();
      });
    }
  }, {
    key: 'getLastPage',
    value: function getLastPage(header) {
      if (!header) {
        return 10;
      }
      var token = header.split(', ')[1].split('>; ')[0].split('page=')[1].split('&')[0];
      return token;
    }
  }]);

  return GithubApi;
}();

exports.default = GithubApi;

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _repositoryList = __webpack_require__(1);

var _repositoryList2 = _interopRequireDefault(_repositoryList);

var _app = __webpack_require__(3);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepositoryDetails = function () {
  function RepositoryDetails(rootElement) {
    _classCallCheck(this, RepositoryDetails);

    this.rootElement = rootElement;
    this.bindEvents();
  }

  _createClass(RepositoryDetails, [{
    key: 'render',
    value: function render(repo) {
      var template = '<nav class="nav-back"><a href="#" class="btn" data-src="js-back-to-list">Back</a></nav>\n      <div class="repo-details">\n        <h1 class="repo-name">' + repo.name + '</h1>\n        <div class="details"><span class="label">Stars: ' + repo.stargazers_count + '</span> <span class="label">Forks: ' + repo.forks_count + '</span> <span class="label">Last update: ' + repo.updated_at.split('T')[0] + '</span></div>\n        <p>' + repo.description + '</p>\n        <div class="actions"><a class="btn" href="' + repo.html_url + '" target="_blank">View on github</a></div>\n      </div>\n    ';

      this.rootElement.innerHTML = template;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      var el = this.rootElement;

      el.addEventListener('click', function (e) {
        var el = e.target;
        var src = el.dataset.src;

        switch (src) {
          case 'js-back-to-list':

            _app2.default.showPage('repo-list');
            break;
        }

        if (src) {
          e.preventDefault();
        }
      });

      el.addEventListener('fetch-page', function (e) {
        _this.fetchPage(e.detail.page);
      }, false);
    }
  }]);

  return RepositoryDetails;
}();

exports.default = RepositoryDetails;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map