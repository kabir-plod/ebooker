// CURRENTLY WORKS FOR:
// practicalguidetoevil.wordpress.com/table-of-contents/

import WordpressParser from './WordpressParser';


export default class PracticalGuideToEvilParser extends WordpressParser implements Parser {

	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	// getTitle(), getAuthor() and getChapterFromDocument() implemented by WordpressParser

	static getParserReturner(): ParserReturner {
		return function(_document: HTMLDocument, pageURL: string) {
			return new PracticalGuideToEvilParser(_document, pageURL);
		};
	}

	public getChapterUrls(): string[] {
		const links = this._document.getElementsByClassName('entry-content')[0].getElementsByTagName('a');

		let chapterUrls;
		for (let i=0; i<links.length; i++) {
			chapterUrls.push(links[i].href);
		}

		return chapterUrls;
	}
}
