// Does not fire if the browser action has a popup
chrome.browserAction.onClicked.addListener( () => {
	console.log('button clicked');

	chrome.tabs.executeScript(null, {
		file: 'content-script.js',
		runAt: 'document_idle'
	});

	chrome.tabs.create({
		'url': chrome.extension.getURL('index.html'), 
		'active': true
	});
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer == "Madame... Bovary") {}
      port.postMessage({question: "I don't get it."});
  	  console.log("I don't get it");
  	}
  });
});