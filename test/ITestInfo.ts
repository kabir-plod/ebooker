import { IParserReturner } from '../src/parsers/IParserReturner';


export interface ITestInfo {
	testName: string;
	url: string;
	title: string;
	author: string;
	chapterUrls: string[];
	parser: IParserReturner;
}
