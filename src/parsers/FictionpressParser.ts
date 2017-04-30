// CURRENTLY WORKS FOR:
// All fiction on fictionpress.com and fanfiction.net

export default class FictionpressParser implements Parser {
	private NUM_SLASHES_FOR_URL_PREFIX = 5;

	private _document: HTMLDocument;
	private pageUrl: string;
	private urlPrefix: string;
	private urlPostfix: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		this._document = _document;
		this.pageUrl = pageUrl;
		this.urlPrefix = this.parseUrlPrefix(pageUrl);
		this.urlPostfix = this.parseUrlPostfix(pageUrl);
	}

	static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageURL: string) {
			return new FictionpressParser(_document, pageURL);
		};
	}

	getTitle(): string {
		console.log('_document: ' + this._document);
		return (<HTMLElement> this._document.querySelector('b.xcontrast_txt')).innerText;
	}

	getAuthor(): string {
		return (<HTMLElement> this._document.querySelectorAll('a.xcontrast_txt')[2]).innerText;
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
				chapterUrls.push(this.urlPrefix + (<HTMLOptionElement> options[i]).value + this.urlPostfix);
			}

			return chapterUrls;
		}
	}

	parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLElement> this._document.querySelector('#chapters')).innerText
		}
	}

	private parseUrlPrefix(pageUrl: string): string {
		const tokens = pageUrl.split('/');
		return tokens.slice(0, this.NUM_SLASHES_FOR_URL_PREFIX).join('/') + '/';
	}

	private parseUrlPostfix(pageUrl: string): string {
		const tokens = pageUrl.split('/');
		return '/' + tokens.slice(this.NUM_SLASHES_FOR_URL_PREFIX + 1, tokens.length).join('/');
	}
}
