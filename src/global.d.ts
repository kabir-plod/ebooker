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
	getTitle(): string;
	getAuthor(): string;
	getCover?(): string;

	getChapterUrls(): string[];
	parseChapterFromDocument(_document: HTMLDocument): Chapter;
}