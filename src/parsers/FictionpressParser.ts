// CURRENTLY WORKS FOR:
// All fiction on fictionpress.com and fanfiction.net

export default class FictionpressParser implements Parser {
	private TITLE_QUERY = 'b.xcontrast_txt';
	private AUTHOR_QUERY = 'a.xcontrast_txt'; // querySelectorAll required for author
	private CHAPTER_SELECT_QUERY = 'select';
	private STORY_QUERY = '#chapters';

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


	getTitle(): string {
		return (<HTMLElement> this._document.querySelector(this.TITLE_QUERY)).innerText;
	}

	getAuthor(): string {
		return (<HTMLElement> this._document.querySelectorAll(this.AUTHOR_QUERY)[2]).innerText;
	}

	getChapterUrls(): string[] {
		const selectElem = this._document.getElementsByTagName(this.CHAPTER_SELECT_QUERY)[0];
		if (selectElem == undefined) {
			return [this.pageUrl];
		}
		else {
			const numChapters = (<HTMLSelectElement> selectElem).options.length;
			let chapterUrls = [];
			for (let i=1; i<=numChapters; i++) {
				chapterUrls.push(this.urlPrefix + i.toString() + this.urlPostfix);
			}

			return chapterUrls;
		}
	}

	parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return {
			data: (<HTMLElement> this._document.querySelector(this.STORY_QUERY)).innerText
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
