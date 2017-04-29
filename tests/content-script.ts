import * as test from 'tape';

chrome.runtime.sendMessage({message: 'content script ready'});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    const testInfo = request.testInfo;
    console.log('request: ' + JSON.stringify(testInfo));

    test(testInfo.testName, t => {
    	console.log('INSIDE TEST ' + testInfo);

		t.plan(3);

		const parser = testInfo.parser(document, testInfo.url);
		t.equal(parser.getTitle(), testInfo.title);
		t.equal(parser.getAuthor(), testInfo.author);
		t.deepEqual(parser.getChapterUrls(), testInfo.chapterUrls);
	});	

	// chrome.tabs.remove(testInfo.tabId);	
});

