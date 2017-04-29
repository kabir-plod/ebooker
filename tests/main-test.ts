import * as test from 'tape';
import fictionpressTestInfo from './fictionpress-test';


const testInfoArr: TestInfo[] = [...fictionpressTestInfo];
let callbackCounter: number = testInfoArr.length;


// Create new incognito window to run tests. 
function handleButtonClick() {
	chrome.windows.create(
		{
			'incognito': true
		}, 

		function callback(window) {
			setupBrowser(window);
		}
	);
}


// Open test urls in tabs. This is not done in the chrome.windows.create 
// function since we need the tabId for each url.
function setupBrowser(window: chrome.windows.Window) {
	for (let i=0; i<testInfoArr.length; i++) {
		chrome.tabs.create(
			{
				'url': testInfoArr[i].url,
				'windowId': window.id
			}, 
			
			function callback(tab) {
				testInfoArr[i].tabId = tab.id;
				runTestsAfterAllCallbacks();
			}
		);
	}
}


// Barrier. Waits for all tab creation callbacks to end
// by using a counter before running tests.
function runTestsAfterAllCallbacks() {
	callbackCounter -= 1;
	if (callbackCounter == 0) {
		runTests();
	}
}


// For every testInfo object, 
// 1. go to the relevant tab
// 2. run tests
// 3. close tab
function runTests() {
	testInfoArr.map( testInfo => {
		test(testInfo.testName, t => {
			chrome.tabs.update(testInfo.tabId, {'active': true}, function callback() {

				const parser = testInfo.parser(document, testInfo.url);

				t.equal(parser.getTitle(), testInfo.title);
				t.equal(parser.getAuthor(), testInfo.author);
				t.deepEqual(parser.getChapterUrls(), testInfo.chapterUrls);

				chrome.tabs.remove(testInfo.tabId);

			});
		});
	});
}


// Register an event listener. When the toolbar button is clicked,
// this script will run
chrome.browserAction.onClicked.addListener(handleButtonClick);
