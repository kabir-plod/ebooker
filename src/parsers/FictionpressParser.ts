// See bottom of file for registrations with factory
import BaseParser from './BaseParser';
import ParserFactory from '../ParserFactory';


ParserFactory.register('www.fictionpress.com', FictionpressParser.getParserReturner());
ParserFactory.register('www.fanfiction.net', FictionpressParser.getParserReturner());


export default class FictionpressParser extends BaseParser implements Parser {
	private NUM_SLASHES_FOR_URL_PREFIX = 5;
	private urlPrefix: string;
	private urlPostfix: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
		this.urlPrefix = this.parseUrlPrefix(this.pageUrl);
		this.urlPostfix = this.parseUrlPostfix(this.pageUrl);
	}

	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageUrl: string) {
			return new FictionpressParser(_document, pageUrl);
		};
	}

	public getTitle(): string {
		return (<HTMLElement> this._document.querySelector('b.xcontrast_txt')).innerText;
	}

	public getAuthor(): string {
		return (<HTMLElement> this._document.querySelectorAll('a.xcontrast_txt')[2]).innerText;
	}

	public getChapterUrls(): string[] {
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

	public parseChapterFromDocument(_document: HTMLDocument): Chapter {
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
