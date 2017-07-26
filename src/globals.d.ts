interface Chapter {
	title?: string;
	author?: string;
	content: HTMLElement;
}

interface EpubOption {
	title: string;
	author: string;
	cover?: string;
	content: Chapter[];
}

interface Parser {
	// Typescript does not allow declaration of static methods in interfaces as of version 2.2.
	// Workarounds are clumsy (see https://github.com/Microsoft/TypeScript/issues/13462)
	// Abstract classes too are unable to declare abstract static methods -
	// again, workarounds are difficult to implement and difficult to understand.
	// This comment is a reminder to implement

	// public static getParserReturner(): ParserReturner

	getTitle(): string;
	getAuthor(): string;
	getCover?(): string;

	getChapterUrls(): string[];
	getChapter(): Chapter;
}

interface ParserReturner {
	(_document: HTMLDocument, pageUrl: string): Parser
}