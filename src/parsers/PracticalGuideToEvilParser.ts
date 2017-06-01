// See bottom of file for registrations with factory
import WordpressParser from './WordpressParser';
import ParserFactory from '../ParserFactory';


export default class PracticalGuideToEvilParser extends WordpressParser implements Parser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageUrl: string) {
			return new PracticalGuideToEvilParser(_document, pageUrl);
		};
	}

	public getTitle() {
		return 'A Practical Guide to Evil';
	}

	public getAuthor() {
		return 'Erraticerrata';
	}

	public getChapterUrls(): string[] {
		return super.getChapterUrls();
	}

	public getChapter(): Chapter {
		return super.getChapter();
	}
}
