// See bottom of file for registrations with factory
import BaseParser from './BaseParser';
import ParserFactory from '../ParserFactory';
import { IParser } from './IParser';
import { IParserReturner } from './IParserReturner';
import { IChapter } from '../IChapter';


export default class RoyalroadlParser extends BaseParser implements IParser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	public static getParserReturner(): IParserReturner {
		return function(_document: HTMLDocument, pageUrl: string) {
			return new RoyalroadlParser(_document, pageUrl);
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

	public getChapter(): IChapter {
		return {
			title: this.getChapterTitle(),
			author: this.getAuthor(),
			content: <HTMLDivElement> this._document.querySelector('.entry-content')
		} 
	}

	private getChapterTitle(): string {
		// TODO
		return 'PLACEHOLDER'
	}
}
