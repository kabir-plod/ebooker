// CURRENTLY WORKS FOR:
// parahumans.wordpress.com
// pactwebserial.wordpress.com

export default class WordpressParser implements Parser {
	// Prefixed with underscore in case `document` is accidentally used 
	// instead of `this.document`.
	_document: HTMLDocument;
	pageUrl: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		this._document = _document;
		this.pageUrl = pageUrl;
	}
	
	static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageURL: string) {
			return new WordpressParser(_document, pageURL);
		};
	}

	getTitle(): string {
		return this._document.querySelector('title').innerHTML;
	}

	// Cannot reliably parse author
	getAuthor(): string {
		return '';
	}

	getChapterUrls(): string[] {
		const links = this._document.getElementById('categories-2').getElementsByTagName('a');

		let chapterUrls;
		for (let i=0; i<links.length; i++) {
			chapterUrls.push(links[i].href);
		}

		return chapterUrls;
	}

	parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLDivElement> _document.querySelector('.entry-content')).innerText
		} 
	}
}
