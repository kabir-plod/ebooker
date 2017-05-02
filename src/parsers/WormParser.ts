// See bottom of file for registrations with factory
import WordpressParser from './WordpressParser';
import ParserFactory from '../ParserFactory';


export default class WormParser extends WordpressParser implements Parser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}
	
	public static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageUrl: string) {
			return new WormParser(_document, pageUrl);
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


ParserFactory.register('parahumans.wordpress.com', WormParser.getParserReturner());
ParserFactory.register('pactwebserial.wordpress.com', WormParser.getParserReturner());