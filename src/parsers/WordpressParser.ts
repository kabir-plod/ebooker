import BaseParser from './BaseParser';
import { IParser } from './IParser';
import { IChapter } from '../IChapter';


abstract class WordpressParser extends BaseParser implements IParser {
	constructor(_document: HTMLDocument, pageUrl: string) {
		super(_document, pageUrl);
	}

	public getTitle() {
		return document.querySelector('title').innerHTML;
	}

	// Cannot reliably get author
	public getAuthor() {
		return '';
	}

	public getChapterUrls(): string[] {
		const links = this._document.getElementsByClassName('entry-content')[0].getElementsByTagName('a');

		let chapterUrls;
		for (let i=0; i<links.length; i++) {
			chapterUrls.push(links[i].href);
		}

		return chapterUrls;
	}

	public getChapter(): IChapter {
		return {
			title: this.getChapterTitle(),
			author: this.getAuthor(),
			content: <HTMLDivElement> this._document.querySelector('.entry-content')
		} 
	}

	private getChapterTitle(): string {
		return this._document.querySelector('.entry-title').textContent;
	}
}


export default WordpressParser;
