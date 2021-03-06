import * as test from 'tape';
import fictionpressTestInfo from './parser/fictionpressTestInfo';
import ao3TestInfo from './parser/ao3TestInfo';
import royalroadlTestInfo from './parser/royalroadlTestInfo';
import { IParser } from '../src/parsers/IParser';
import { ITestInfo } from './ITestInfo';


const testInfoArr: ITestInfo[] = [...fictionpressTestInfo, ...ao3TestInfo, ...royalroadlTestInfo];
// Key is the actual address of the website, not 'url'.
let parsers: { url: IParser } = {} as { url: IParser };
let requestCounter = testInfoArr.length;


testInfoArr.map((testInfo, index) => {
	const xhr = new XMLHttpRequest();

	xhr.onload = function() {
		parsers[testInfo.url] = testInfo.parser(xhr.responseXML, testInfo.url);

		requestCounter -= 1;
		if (requestCounter === 0) {
			testParsers();
		}
	}

	xhr.onerror = function() {
		console.log('Error while getting document.');
	}

	xhr.open('GET', testInfo.url);
	xhr.responseType = 'document';
	xhr.send();
});


function testParsers() {
	testInfoArr.map((testInfo, index) => {
		test(testInfo.testName, t => {
			const parser = parsers[testInfo.url];

			t.plan(3);

			t.equal(parser.getTitle(), testInfo.title);
			t.equal(parser.getAuthor(), testInfo.author);
			t.deepEqual(parser.getChapterUrls(), testInfo.chapterUrls);
		});
	});
}