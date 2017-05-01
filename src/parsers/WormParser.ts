// CURRENTLY WORKS FOR:
// parahumans.wordpress.com
// pactwebserial.wordpress.com
import WordpressParser from './WordpressParser';


export default class WormParser extends WordpressParser implements Parser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}
	
	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageURL: string) {
			return new WormParser(_document, pageURL);
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

	public parseChapterFromDocument(_document: HTMLDocument): Chapter {
		return super.parseChapterFromDocument(_document); 
	}
}
