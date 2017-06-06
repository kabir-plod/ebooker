// See bottom of file for registrations with factory
import BaseParser from './BaseParser';
import ParserFactory from '../ParserFactory';


export default class Ao3Parser extends BaseParser implements Parser {
	private urlPrefix: string;
	private NUM_SLASHES_FOR_URL_PREFIX = 6;

	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
		this.urlPrefix = this.parseUrlPrefix(pageUrl);
	}

	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageUrl: string) {
			return new Ao3Parser(_document, pageUrl);
		};
	}

	public getTitle(): string {
		return (<HTMLHeadingElement> this._document.querySelector('h2.title')).innerText.trim();
	}

	public getAuthor(): string {
		return (<HTMLHeadingElement> this._document.querySelector('h3.byline')).innerText.trim();
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
				chapterUrls.push(this.urlPrefix + (<HTMLOptionElement> options[i]).value);
			}

			return chapterUrls;
		}
	}

	public getChapter(): Chapter {
		return {
			title: this.getChapterTitle(),
			author: this.getAuthor(),
			content: <HTMLDivElement> this._document.querySelector('#chapters')
		} 
	}

	// TODO: reuse code from getChapterUrls
	private getChapterTitle(): string {
		const selectElem = this._document.getElementsByTagName('select')[0];
		if (selectElem == undefined) {
			return this.getTitle();
		}
		else {
			const options = (<HTMLSelectElement> selectElem).options;
			return options[options.selectedIndex].textContent;
		}
	}

	private parseUrlPrefix(pageUrl: string): string {
		const tokens = pageUrl.split('/');
		return tokens.slice(0, this.NUM_SLASHES_FOR_URL_PREFIX).join('/') + '/';
	}
}
