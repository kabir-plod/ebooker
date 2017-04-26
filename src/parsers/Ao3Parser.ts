// CURRENTLY WORKS FOR:
// All fiction on archiveofourown.org

export default class Ao3Parser implements Parser {
	private TITLE_QUERY = 'h2.title';
	private AUTHOR_QUERY = 'h3.byline';
	private CHAPTER_SELECT_QUERY = 'select';
	private STORY_QUERY = '#chapters';

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
		return (<HTMLHeadingElement> this._document.querySelector(this.TITLE_QUERY)).innerText;
	}

	getAuthor(): string {
		return (<HTMLHeadingElement> this._document.querySelector(this.AUTHOR_QUERY)).innerText;
	}

	getChapterUrls(): string[] {
		const selectElem = this._document.getElementsByTagName(this.CHAPTER_SELECT_QUERY)[0];
		if (selectElem == undefined) {
			return [this.pageUrl];
		}
		else {
			const options = (<HTMLSelectElement> selectElem).options;
			let chapterUrls = [];
			for (let i=1; i<=options.length; i++) {
				chapterUrls.push(this.urlPrefix + (<HTMLOptionElement> options[i]).value);
			}

			return chapterUrls;
		}
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
