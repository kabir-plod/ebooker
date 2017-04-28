// CURRENTLY WORKS FOR:
// All fiction on royalroadl.com

export default class WordpressParser implements Parser {
	// Prefixed with underscore in case `document` is accidentally used 
	// instead of `this.document`.
	_document: HTMLDocument;
	pageUrl: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		this._document = _document;
		this.pageUrl = pageUrl;
	}
	
	getTitle(): string {
		return (<HTMLElement> this._document.querySelector('[property=name]')).innerText;
	}

	getAuthor(): string {
		return (<HTMLElement> this._document.querySelector('.mt-card-name')).innerText;
	}

	getChapterUrls(): string[] {
		const links: NodeList = this._document.getElementById('chapters').querySelectorAll('a[href]');

		let chapterUrls;
		for (let i=0; i<links.length; i++) {
			chapterUrls.push( (<HTMLAnchorElement> links[i]).href );
		}

		return chapterUrls;
	}

	parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLDivElement> _document.querySelector('.entry-content')).innerText
		} 
	}
}
