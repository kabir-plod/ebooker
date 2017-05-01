// CURRENTLY WORKS FOR:
// tiraas.wordpress.com/table-of-contents/
import WordpressParser from './WordpressParser';


export default class TheGodsAreBastardsParser extends WordpressParser implements Parser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageURL: string) {
			return new TheGodsAreBastardsParser(_document, pageURL);
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

	public parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return super.parseChapterFromDocument(_document); 
	}
}
