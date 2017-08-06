import { IParser } from './IParser';


export interface IParserReturner {
	(_document: HTMLDocument, pageUrl: string): IParser
}