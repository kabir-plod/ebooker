// CURRENTLY WORKS FOR:
// twigserial.wordpress.com

export default class TwigParser implements Parser {
	private TITLE_QUERY = 'title';
	private STORY_QUERY = '.entry-content';
	private CHAPTER_SELECT_QUERY = 'select';

	private NUM_SLASHES_FOR_URL_PREFIX = 3;

	// Prefixed with underscore in case `document` is accidentally used 
	// instead of `this.document`.
	private _document: HTMLDocument;
	private pageUrl: string;
	private urlPrefix: string;

	constructor(document: HTMLDocument, pageUrl: string) {
		this._document = document;
		this.pageUrl = pageUrl;
		this.urlPrefix = this.parseUrlPrefix(pageUrl);
	}
	
	getTitle(): string {
		return this._document.querySelector(this.TITLE_QUERY).innerHTML;
	}

	getAuthor(): string {
		return '';
	}

	getChapterUrls(): string[] {
		const selectElem = this._document.getElementsByTagName(this.CHAPTER_SELECT_QUERY)[0];
		const options = (<HTMLSelectElement> selectElem).options;
		let chapterUrls = [];
		for (let i=1; i<=options.length; i++) {
			chapterUrls.push(this.urlPrefix + '?cat=' + (<HTMLOptionElement> options[i]).value);
		}

		return chapterUrls;
	}

	parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLDivElement> _document.querySelector(this.STORY_QUERY)).innerText
		} 
	}

	private parseUrlPrefix(pageUrl: string): string {
		const tokens = pageUrl.split('/');
		return tokens.slice(0, this.NUM_SLASHES_FOR_URL_PREFIX).join('/') + '/';
	}
}
