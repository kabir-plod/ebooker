// import fictionpressTestInfo from './fictionpress-test';


// const testInfoArr: TestInfo[] = [...fictionpressTestInfo];
// let createCallbackCounter: number = testInfoArr.length;
// let updateCallbackCounter: number = testInfoArr.length;


// // Register an event listener. When the toolbar button is clicked,
// // this script will run
// chrome.browserAction.onClicked.addListener(handleButtonClick);


// // Create new incognito window to run tests. 
// function handleButtonClick() {
// 	chrome.windows.create(
// 		{
// 			'incognito': true
// 		}, 

// 		function callback(window) {
// 			setupBrowser(window);
// 		}
// 	);
// }


// // Open test urls in tabs. This is not done in the chrome.windows.create 
// // function since we need the tabId for each url.
// function setupBrowser(window: chrome.windows.Window) {
// 	for (let i=0; i<testInfoArr.length; i++) {
// 		chrome.tabs.create(
// 			{
// 				'url': testInfoArr[i].url
// 				// 'windowId': window.id
// 			}, 
			
// 			function callback(tab) {
// 				testInfoArr[i].tabId = tab.id;
// 			}
// 		);
// 	}
// }


// chrome.tabs.onCreated.addListener(addUpdateListenerAfterAllCallbacks);


// // Barrier. Waits for all tab urls to be set
// // by using a counter before running tests.
// function addUpdateListenerAfterAllCallbacks() {
// 	createCallbackCounter -= 1;
// 	if (createCallbackCounter == 0) {
// 		chrome.tabs.onUpdated.addListener(addActivateListenerAfterAllCallbacks);
// 	}
// }


// // Barrier. Waits for all tab urls to be set
// // by using a counter before running tests.
// function addActivateListenerAfterAllCallbacks(tabId: number, changeInfo) {

// 	console.log('update info: ' + JSON.stringify({tabId: tabId, changeInfo: changeInfo}));

// 	if (changeInfo.status === 'complete') {
// 		updateCallbackCounter -= 1;
// 	}

// 	if (updateCallbackCounter == 0) {
// 		chrome.tabs.onActivated.addListener(addActivateListenerAfterAllCallbacks);
// 	}
// }


// function runTestForActiveTab


// // For every testInfo object, 
// // 1. go to the relevant tab
// // 2. run tests
// // 3. close tab
// function runTests() {
// 	testInfoArr.map( testInfo => {
// 		chrome.tabs.update(testInfo.tabId, {'active': true}, function callback() {
			
// 			setTimeout( () => {
// 				console.log('Sending message');
// 				chrome.runtime.sendMessage(testInfo, ()=>{});
// 			},
// 			2000);
// 		});
// 	});
// }
