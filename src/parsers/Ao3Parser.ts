// CURRENTLY WORKS FOR:
// All fiction on archiveofourown.org

export default class Ao3Parser implements Parser {
	private NUM_SLASHES_FOR_URL_PREFIX = 6;

	// Prefixed with underscore in case `document` is accidentally used 
	// instead of `this.document`
	private _document: HTMLDocument;
	private pageUrl: string;
	private urlPrefix: string;

	constructor(document: HTMLDocument, pageUrl: string) {
		this._document = document;
		this.pageUrl = pageUrl;
		this.urlPrefix = this.parseUrlPrefix(pageUrl);
	}

	getTitle(): string {
		return (<HTMLHeadingElement> this._document.querySelector('h2.title')).innerText;
	}

	getAuthor(): string {
		return (<HTMLHeadingElement> this._document.querySelector('h3.byline')).innerText;
	}

	getChapterUrls(): string[] {
		const selectElem = this._document.getElementsByTagName('select')[0];
		if (selectElem == undefined) {
			return [this.pageUrl];
		}
		else {
			const options = (<HTMLSelectElement> selectElem).options;
			let chapterUrls = [];
			for (let i=0; i<options.length; i++) {
				chapterUrls.push(this.urlPrefix + (<HTMLOptionElement> options[i]).value);
			}

			return chapterUrls;
		}
	}

	parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLDivElement> _document.querySelector('#chapters')).innerText
		} 
	}

	private parseUrlPrefix(pageUrl: string): string {
		const tokens = pageUrl.split('/');
		return tokens.slice(0, this.NUM_SLASHES_FOR_URL_PREFIX).join('/') + '/';
	}
}
