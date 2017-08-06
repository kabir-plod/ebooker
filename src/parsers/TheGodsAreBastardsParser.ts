// See bottom of file for registrations with factory
import WordpressParser from './WordpressParser';
import ParserFactory from '../ParserFactory';
import { IParser } from './IParser';
import { IParserReturner } from './IParserReturner';
import { IChapter } from '../IChapter';


export default class TheGodsAreBastardsParser extends WordpressParser implements IParser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	public static getParserReturner(): IParserReturner {
		return function(_document: HTMLDocument, pageUrl: string) {
			return new TheGodsAreBastardsParser(_document, pageUrl);
		};
	}

	public getTitle() {
		return 'The Gods are Bastards';
	}

	public getAuthor() {
		return 'D. D. Webb';
	}

	public getChapterUrls(): string[] {
		return super.getChapterUrls();
	}

	public getChapter(): IChapter {
		return super.getChapter(); 
	}
}
