import * as test from 'tape';

chrome.runtime.sendMessage({message: 'send testInfo', _document: JSON.stringify(document)}, function(response) {
	console.log('response with testInfo on next line: ');
	console.log(JSON.parse(response));

	const testInfo = JSON.parse(response.testInfo);

	test(testInfo.testName, t => {
		console.log('title: ' + (<HTMLElement> document.querySelector('b.xcontrast_txt')).innerText);

		t.plan(3);

		const parser = testInfo.parser(document, testInfo.url);
		t.equal(parser.getTitle(), testInfo.title);
		t.equal(parser.getAuthor(), testInfo.author);
		t.deepEqual(parser.getChapterUrls(), testInfo.chapterUrls);
	});	

	// chrome.tabs.remove(testInfo.tabId);
});
