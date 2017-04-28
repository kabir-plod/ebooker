// CURRENTLY WORKS FOR:
// twigserial.wordpress.com

import WordpressParser from './WordpressParser';


export default class TwigParser extends WordpressParser implements Parser  {
	private NUM_SLASHES_FOR_URL_PREFIX = 3;
	private urlPrefix: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);

		this.urlPrefix = this.parseUrlPrefix(pageUrl);
	}

	// getTitle(), getAuthor() and getChapterFromDocument() implemented by WordpressParser

	getChapterUrls(): string[] {
		const selectElem = this._document.getElementsByTagName('select')[0];
		const options = selectElem.options;

		let chapterUrls = [];
		// Skip i=0. Corresponds to 'Select Category' option
		for (let i=1; i<options.length; i++) {
			chapterUrls.push(this.urlPrefix + '?cat=' + (<HTMLOptionElement> options[i]).value);
		}

		return chapterUrls;
	}

	private parseUrlPrefix(pageUrl: string): string {
		const tokens = pageUrl.split('/');
		return tokens.slice(0, this.NUM_SLASHES_FOR_URL_PREFIX).join('/') + '/';
	}
}
