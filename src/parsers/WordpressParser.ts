abstract class WordpressParser implements Parser {
	// Prefixed with underscore in case `document` is accidentally used 
	// instead of `this.document`.
	protected _document: HTMLDocument;
	protected pageUrl: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		this._document = _document;
		this.pageUrl = pageUrl;
	}

	public getTitle() {
		return document.querySelector('title').innerHTML;
	}

	// Cannot reliably get author
	public getAuthor() {
		return '';
	}

	public getChapterUrls(): string[] {
		const links = this._document.getElementsByClassName('entry-content')[0].getElementsByTagName('a');

		let chapterUrls;
		for (let i=0; i<links.length; i++) {
			chapterUrls.push(links[i].href);
		}

		return chapterUrls;
	}

	public parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLDivElement> _document.querySelector('.entry-content')).innerText
		} 
	}
}


export default WordpressParser;
