// CURRENTLY WORKS FOR:
// practicalguidetoevil.wordpress.com/table-of-contents/
import WordpressParser from './WordpressParser';


export default class PracticalGuideToEvilParser extends WordpressParser implements Parser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageURL: string) {
			return new PracticalGuideToEvilParser(_document, pageURL);
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

	public parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return super.parseChapterFromDocument(_document);
	}
}
