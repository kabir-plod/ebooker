// CURRENTLY WORKS FOR:
// All fiction on royalroadl.com

export default class RoyalroadlParser implements Parser {
	// Prefixed with underscore in case `document` is accidentally used 
	// instead of `this.document`.
	protected _document: HTMLDocument;
	protected pageUrl: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		this._document = _document;
		this.pageUrl = pageUrl;
	}

	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageURL: string) {
			return new RoyalroadlParser(_document, pageURL);
		};
	}
	
	public getTitle(): string {
		return (<HTMLElement> this._document.querySelector('[property=name]')).innerText;
	}

	public getAuthor(): string {
		const elemText = (<HTMLElement> this._document.querySelector('[property=author]')).innerText;
		// Remove 'by ' from 'by <author>'
		return elemText.slice(3, elemText.length);
	}

	// TODO: make this work even when `Show All` chapters is not selected
	// Chapter entries are viewable in source html but not through document queries
	public getChapterUrls(): string[] {
		const links: NodeList = this._document.getElementById('chapters').querySelectorAll('a[href]');

		let chapterUrls = [];
		for (let i=0; i<links.length; i++) {
			chapterUrls.push( (<HTMLAnchorElement> links[i]).href );
		}

		return chapterUrls;
	}

	public parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLDivElement> _document.querySelector('.entry-content')).innerText
		} 
	}
}
