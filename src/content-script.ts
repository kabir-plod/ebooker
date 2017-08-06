import FictionpressParser from './parsers/FictionpressParser';
import ParserFactory from './ParserFactory';
import Epub from './epub/Epub';
import { IChapter } from './IChapter';


const hostname = window.location.hostname;
const href = window.location.href;
let parser = ParserFactory.getParser(hostname, document, href);

const chapterUrls = parser.getChapterUrls();
let chapters: IChapter[] = new Array(chapterUrls.length);

let requestCounter = chapterUrls.length;


var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
  if (msg['question'] == "Who's there?") {
    port.postMessage({answer: "Madame"});
  	  console.log("Madame");
	}
  else if (msg['question'] == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});


// TODO: run in background thread?
chapterUrls.map( (url, index) => {
	const xhr = new XMLHttpRequest();

	xhr.onload = function() {
		parser = ParserFactory.getParser(hostname, xhr.responseXML, href);
		chapters[index] = parser.getChapter();
		
		console.log('parser chapter ' + index);

		requestCounter -= 1;
		if (requestCounter == 0) {
			packEpub(parser.getTitle(), parser.getAuthor(), chapters);
		}
	}

	xhr.onerror = function() {
		console.log({err: 'Error while getting document at url: ' + xhr.responseURL});
	}

	xhr.open('GET', url);
	xhr.responseType = 'document';
	xhr.send();
});


function packEpub(title: string, author: string, chapters: IChapter[]) {
	const epub = new Epub(title, author, chapters);
	// epub.export();
}