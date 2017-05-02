// Does not fire if the browser action has a popup
chrome.browserAction.onClicked.addListener( () => {
	chrome.tabs.executeScript({
		file: 'content-script.js',
		runAt: 'document_idle'
	});
});
