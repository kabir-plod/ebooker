import * as test from 'tape';
import fictionpressTestInfo from './fictionpress-test';


const testInfoArr: TestInfo[] = [...fictionpressTestInfo];


testInfoArr.map( (testInfo) => {
	// console.log(testInfo);

	const xhr = new XMLHttpRequest();

	xhr.onload = function() {
		console.log( (<HTMLElement> xhr.responseXML.querySelector('b.xcontrast_txt')).innerText );

		const parser = testInfo.parser(xhr.responseXML, testInfo.url);

		test(testInfo.testName, t => {
			t.plan(3);

			t.equal(parser.getTitle(), testInfo.title);
			t.equal(parser.getAuthor(), testInfo.author);
			t.deepEqual(parser.getChapterUrls(), testInfo.chapterUrls);
		});
	}

	xhr.onerror = function() {
		console.log('Error while getting document.');
	}

	xhr.open('GET', testInfo.url);
	xhr.responseType = 'document';
	xhr.send();
});
