/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./tests/fictionpress-test.ts ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FictionpressParser_1 = __webpack_require__(/*! ../src/parsers/FictionpressParser */ 27);
var fictionpressTestInfo = [
    {
        testName: 'fictionpress parser, single chapter',
        url: 'https://www.fanfiction.net/s/2048837/1/Reminiscence',
        title: 'Reminiscence',
        author: 'Kenya Starflight',
        chapterUrls: ['https://www.fanfiction.net/s/2048837/1/Reminiscence'],
        parser: FictionpressParser_1.default.getParserReturner()
    },
    {
        testName: 'fictionpress parser, multiple chapters',
        url: 'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest',
        title: 'When Darkness Shines Brightest',
        author: 'JulmaSatu',
        chapterUrls: [
            'https://www.fictionpress.com/s/3305498/1/When-Darkness-Shines-Brightest',
            'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest',
            'https://www.fictionpress.com/s/3305498/3/When-Darkness-Shines-Brightest',
            'https://www.fictionpress.com/s/3305498/4/When-Darkness-Shines-Brightest'
        ],
        parser: FictionpressParser_1.default.getParserReturner()
    }
];
exports.default = fictionpressTestInfo;


/***/ }),

/***/ 27:
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/parsers/FictionpressParser.ts ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FictionpressParser = (function () {
    function FictionpressParser(_document, pageUrl) {
        this.NUM_SLASHES_FOR_URL_PREFIX = 5;
        this._document = _document;
        this.pageUrl = pageUrl;
        this.urlPrefix = this.parseUrlPrefix(pageUrl);
        this.urlPostfix = this.parseUrlPostfix(pageUrl);
    }
    FictionpressParser.getParserReturner = function () {
        return function (_document, pageURL) {
            return new FictionpressParser(_document, pageURL);
        };
    };
    FictionpressParser.prototype.getTitle = function () {
        console.log('_document: ' + this._document);
        return this._document.querySelector('b.xcontrast_txt').innerText;
    };
    FictionpressParser.prototype.getAuthor = function () {
        return this._document.querySelectorAll('a.xcontrast_txt')[2].innerText;
    };
    FictionpressParser.prototype.getChapterUrls = function () {
        var selectElem = this._document.getElementsByTagName('select')[0];
        if (selectElem == undefined) {
            return [this.pageUrl];
        }
        else {
            var numChapters = selectElem.options.length;
            var chapterUrls = [];
            for (var i = 0; i < numChapters; i++) {
                chapterUrls.push(this.urlPrefix + i.toString() + this.urlPostfix);
            }
            return chapterUrls;
        }
    };
    FictionpressParser.prototype.parseChapterFromDocument = function (_document) {
        return {
            data: this._document.querySelector('#chapters').innerText
        };
    };
    FictionpressParser.prototype.parseUrlPrefix = function (pageUrl) {
        var tokens = pageUrl.split('/');
        return tokens.slice(0, this.NUM_SLASHES_FOR_URL_PREFIX).join('/') + '/';
    };
    FictionpressParser.prototype.parseUrlPostfix = function (pageUrl) {
        var tokens = pageUrl.split('/');
        return '/' + tokens.slice(this.NUM_SLASHES_FOR_URL_PREFIX + 1, tokens.length).join('/');
    };
    return FictionpressParser;
}());
exports.default = FictionpressParser;


/***/ }),

/***/ 28:
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./tests/Q-main-test.ts ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fictionpress_test_1 = __webpack_require__(/*! ./fictionpress-test */ 25);
var testInfoArr = fictionpress_test_1.default.slice();
var testInfoObj = {};
var createCallbackCounter = testInfoArr.length;
var updateCallbackCounter = testInfoArr.length;
chrome.browserAction.onClicked.addListener(handleButtonClick);
function handleButtonClick() {
    chrome.windows.create({
        'incognito': true
    }, function callback(window) {
        setupBrowser(window);
    });
}
function setupBrowser(window) {
    var _loop_1 = function (i) {
        chrome.tabs.create({
            'url': testInfoArr[i].url
        }, function callback(tab) {
            testInfoObj.tabId = testInfoArr[i];
            console.log('testInfoObj: ' + JSON.stringify(testInfoObj));
        });
    };
    for (var i = 0; i < testInfoArr.length; i++) {
        _loop_1(i);
    }
}
chrome.tabs.onUpdated.addListener(activateTabOnLoad);
function activateTabOnLoad(tabId, changeInfo) {
    console.log('update info: ' + JSON.stringify({ tabId: tabId, changeInfo: changeInfo }));
    if (changeInfo.status === 'complete') {
        chrome.tabs.update(tabId, {
            'active': true
        });
    }
}
chrome.tabs.onActivated.addListener(runTestsForActiveTab);
function runTestsForActiveTab(activeInfo) {
    var testInfo = testInfoObj.tabId;
    console.log('Sending message');
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function callback(tabs) {
        console.log('active tabs: ' + JSON.stringify(tabs));
        chrome.runtime.sendMessage(tabs[0].id.toString(), { testInfo: testInfo });
    });
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('message: ' + request.message);
});


/***/ })

/******/ });
//# sourceMappingURL=buttonclick-event-script.js.map