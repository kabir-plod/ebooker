import { IChapter } from '../IChapter';


export interface IParser {
	// Typescript does not allow declaration of static methods in interfaces as of version 2.2.
	// Workarounds are clumsy (see https://github.com/Microsoft/TypeScript/issues/13462)
	// Abstract classes too are unable to declare abstract static methods -
	// again, workarounds are difficult to implement and difficult to understand.
	// This comment is a reminder to implement

	// public static getParserReturner(): IParserReturner

	getTitle(): string;
	getAuthor(): string;
	getCover?(): string;

	getChapterUrls(): string[];
	getChapter(): IChapter;
}