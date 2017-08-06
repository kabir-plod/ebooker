// See bottom of file for registrations with factory
import WordpressParser from './WordpressParser';
import ParserFactory from '../ParserFactory';
import { IParser } from './IParser';
import { IParserReturner } from './IParserReturner';
import { IChapter } from '../IChapter';


export default class WildbowParser extends WordpressParser implements IParser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}
	
	public static getParserReturner(): IParserReturner {
		return function(_document: HTMLDocument, pageUrl: string) {
			return new WildbowParser(_document, pageUrl);
		};
	}

	public getTitle(): string {
		return super.getTitle();
	}

	public getAuthor(): string {
		return 'Wildbow';
	}

	public getChapterUrls(): string[] {
		const links = this._document.getElementById('categories-2').getElementsByTagName('a');

		let chapterUrls;
		for (let i=0; i<links.length; i++) {
			chapterUrls.push(links[i].href);
		}

		return chapterUrls;
	}

	public getChapter(): IChapter {
		return super.getChapter(); 
	}
}
