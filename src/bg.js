// Does not fire if the browser action has a popup
chrome.browserAction.onClicked.addListener( () => {
	console.log('button clicked');

	chrome.tabs.executeScript(null, {
		file: 'content-script.js',
		runAt: 'document_idle'
	});
});
