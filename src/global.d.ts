interface Chapter {
	title?: string;
	author?: string;
	data: string;
}

interface EpubOption {
	title: string;
	author: string;
	cover?: string;
	content: Chapter[];
}

interface Parser {
	// Typescript does not allow declaration of static methods  in interfaces as of version 2.2.
	// Workarounds are clumsy (see https://github.com/Microsoft/TypeScript/issues/13462)
	// In addition, abstract classes are unable to declare abstract static methods -
	// again, workarounds are difficult to implement and difficult to understand.
	// This comment is a reminder to implement

	// static getParserReturner(): ParserReturner

	getTitle(): string;
	getAuthor(): string;
	getCover?(): string;

	getChapterUrls(): string[];
	parseChapterFromDocument(_document: HTMLDocument): Chapter;
}

interface ParserReturner {
	(_document: HTMLDocument, pageUrl): Parser
}