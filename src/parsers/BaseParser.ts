import { IParser } from './IParser';


abstract class BaseParser implements IParser {
	// Prefixed with underscore in case `document` is accidentally used 
	// instead of `this.document`
	protected _document: HTMLDocument;
	protected pageUrl: string;

	constructor(_document: HTMLDocument, pageUrl: string) {
		this._document = _document;
		this.pageUrl = pageUrl;
	}

	// static getParserReturner() to be implemented by subclass

	public abstract getTitle();
	public abstract getAuthor();
	public abstract getChapterUrls();
	public abstract getChapter();
}


export default BaseParser;
