import Ao3Parser from '../src/parsers/Ao3Parser';


const fictionpressTestInfo: TestInfo[] =
[
	{
		testName: 'ao3, single chapter',
		url: 'https://archiveofourown.org/works/827193',
		title: 'Musings of an Old Man',
		author: 'sanctum_c',
		chapterUrls: ['https://archiveofourown.org/works/827193'],
		parser: Ao3Parser.getParserReturner()
	},
	{
		testName: 'ao3, multiple chapters',
		url: 'https://archiveofourown.org/works/10748805/chapters/23831163',
		title: 'Sher Trek: The Denevan Problem',
		author: 'CaresaToland',
		chapterUrls: [
			'https://archiveofourown.org/works/10748805/chapters/23830950',
			'https://archiveofourown.org/works/10748805/chapters/23831007',
			'https://archiveofourown.org/works/10748805/chapters/23831052',
			'https://archiveofourown.org/works/10748805/chapters/23831163',
			'https://archiveofourown.org/works/10748805/chapters/23831286'
		],
		parser: Ao3Parser.getParserReturner()
	}
];


export default fictionpressTestInfo;
