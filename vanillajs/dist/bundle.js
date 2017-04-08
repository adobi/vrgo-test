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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class $
{
  static find(selector, context)
  {
    if (!context) {
      context = document;
    }
    return context.querySelector(selector);
  }

  static hasClass(element, className)
  {
    return element.classList.contains(className);
  }

  static toggleClass(element, className)
  {
    return element.classList.toggle(className);
  }
}

/* harmony default export */ __webpack_exports__["a"] = ($);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__repository_list__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);



class App
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
    this.repositoryList = new __WEBPACK_IMPORTED_MODULE_0__repository_list__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].find('#js-repository-list'), 'addyosmani')
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);



(() => {
  let app = new __WEBPACK_IMPORTED_MODULE_0__app__["default"](__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].find('#js-app'));

  app.run();
})();


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GithubApi
{
  constructor()
  {
    this.apiBase = 'https://api.github.com';
    this.lastPage = null;
  }

  getUserRepos(username, currentPage)
  {
    // let endpoint = `${this.apiBase}/users/${username}/repos?page=${currentPage}`;
    let endpoint = `data.json`;

    return fetch(endpoint)
      .then((response) => {
        this.lastPage = this.getLastPage(response.headers.get('Link'));
        return response.json();
      })
  }

  getLastPage(header)
  {
    if (!header) {
      return 0;
    }
    let token = header.split(', ')[1].split('>; ')[0].split('page=')[1].split('&')[0];
    return token;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GithubApi);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(1);


class Pager
{
  constructor(rootElement)
  {
    this.rootElement = rootElement;
    this._last = 0;
    this._current = 1;
    this.isRendered = false;

    this.bindEvents();

    this.repositoryList = __WEBPACK_IMPORTED_MODULE_1__app__["default"].getRepositoryList();
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

    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].find('#js-pagination').innerHTML = template.join('')
    this.isRendered = true;
  }

  activate()
  {
    let prev = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].find('.active', this.rootElement);
    if (prev) {
      __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].toggleClass(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].find('.active', this.rootElement), 'active');
    }
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].toggleClass(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].find(`[data-page="${this.current}"]`).parentNode, 'active')
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

/* harmony default export */ __webpack_exports__["a"] = (Pager);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__github_api__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pager__ = __webpack_require__(4);




class RepositoryList
{
  constructor(rootElement, username)
  {
    this.rootElement = rootElement;
    this.username = username;

    this.githubApi = new __WEBPACK_IMPORTED_MODULE_1__github_api__["a" /* default */]();
    this.repositories = [];

    this.pager = new __WEBPACK_IMPORTED_MODULE_2__pager__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].find('#js-pagination'));

    this.bindEvents();
  }

  fetchPage()
  {
    this.renderRepositoryList(this.getListLoadingTemplate());
    this.githubApi
      .getUserRepos(this.username, this.pager.current)
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        this.repositories = response;
        this.renderRepositoryList(this.getRepositoryListTemplate());

        this.pager.last = this.githubApi.lastPage;
        this.pager.render();
      });
  }

  getRepositoryListTemplate()
  {
    let template = [];
    for (let item of this.repositories) {
      template.push(`<a href="#" class="list-group-item" data-repo-id="${item.id}" data-src="js-repository-item">${item.name}</a>`);
    }

    return template.join('')
  }

  renderRepositoryList(template)
  {
    this.rootElement.innerHTML = template
  }

  getListLoadingTemplate()
  {
    return '<a class="list-group-item">Loading...</a>';
  }

  bindEvents()
  {
    this.rootElement.addEventListener('click', (e) => {
      let el = e.target;
      let src = el.dataset.src;

      switch(src) {
        case 'js-repository-item':
          console.log(el.dataset.repoId);
          break;
      }

      e.preventDefault();
    })
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RepositoryList);


/***/ })
/******/ ]);