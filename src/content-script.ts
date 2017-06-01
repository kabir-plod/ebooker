import FictionpressParser from './parsers/FictionpressParser';
import ParserFactory from './ParserFactory';


const hostname = window.location.hostname;
const href = window.location.href;
let parser = ParserFactory.getParser(hostname, document, href);

const chapterUrls = parser.getChapterUrls();
let chapters: Chapter[] = new Array(chapterUrls.length);

let requestCounter = chapterUrls.length;


chapterUrls.map( (url, index) => {
	const xhr = new XMLHttpRequest();

	xhr.onload = function() {
		parser = ParserFactory.getParser(hostname, xhr.responseXML, href);
		chapters[index] = parser.getChapter();
		
		console.log('parser chapter ' + index);

		requestCounter -= 1;
		if (requestCounter == 0) {
			packEpub();
		}
	}

	xhr.onerror = function() {
		console.log({err: 'Error while getting document at url: ' + xhr.responseURL});
	}

	xhr.open('GET', url);
	xhr.responseType = 'document';
	xhr.send();
});


function packEpub() {
	console.log('chapter 30: ');
	console.log(chapters[29]);
	// return new Epub(chapterArr, null);
}