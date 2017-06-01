// See bottom of file for registrations with factory
import WordpressParser from './WordpressParser';
import ParserFactory from '../ParserFactory';


export default class TheGodsAreBastardsParser extends WordpressParser implements Parser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	public static getParserReturner(): ParserReturner {
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

	public getChapter(): Chapter {
		return super.getChapter(); 
	}
}
