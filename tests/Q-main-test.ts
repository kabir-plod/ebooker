import fictionpressTestInfo from './fictionpress-test';


const testInfoArr: TestInfo[] = [...fictionpressTestInfo];
let testInfoObj: {tabId: TestInfo} = {} as {tabId: TestInfo};
let createCallbackCounter: number = testInfoArr.length;
let updateCallbackCounter: number = testInfoArr.length;


// Register an event listener. When the toolbar button is clicked,
// this script will run
chrome.browserAction.onClicked.addListener(handleButtonClick);


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
				'url': testInfoArr[i].url
				// 'windowId': window.id
			}, 
			
			function callback(tab) {
				testInfoObj.tabId = testInfoArr[i];
				console.log('testInfoObj: ' + JSON.stringify(testInfoObj));
			}
		);
	}
}


chrome.tabs.onUpdated.addListener(activateTabOnLoad);


// Barrier. Waits for all tab urls to be set
// by using a counter before running tests.
function activateTabOnLoad(tabId, changeInfo) {
	console.log('update info: ' + JSON.stringify({tabId: tabId, changeInfo: changeInfo}));

	if (changeInfo.status === 'complete') {
		chrome.tabs.update(tabId, 
			{
				'active': true
			}
		);
	}
}


chrome.tabs.onActivated.addListener(runTestsForActiveTab);


function runTestsForActiveTab(activeInfo) {
	const testInfo: TestInfo = testInfoObj.tabId;

	console.log('Sending message');
	chrome.tabs.query(
		{
			active: true, 
			currentWindow: true
		}, 

		function callback(tabs) {
			console.log('active tabs: ' + JSON.stringify(tabs))
			chrome.runtime.sendMessage(tabs[0].id.toString(), {testInfo: testInfo});
		}
	);
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log('message: ' + request.message);
});