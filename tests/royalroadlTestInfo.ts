import RoyalroadlParser from '../src/parsers/RoyalroadlParser';


const royalroadlTestInfo: TestInfo[] =
[
	{
		testName: 'royalroadl parser, <20 chapters',
		url: 'https://royalroadl.com/fiction/3984',
		title: 'Trapped: The GM',
		author: 'Troll',
		chapterUrls: [
			'https://royalroadl.com/fiction/chapter/38623',
			'https://royalroadl.com/fiction/chapter/38944',
			'https://royalroadl.com/fiction/chapter/39646',
			'https://royalroadl.com/fiction/chapter/39665',
			'https://royalroadl.com/fiction/chapter/39940',
			'https://royalroadl.com/fiction/chapter/40419',
			'https://royalroadl.com/fiction/chapter/42075',
			'https://royalroadl.com/fiction/chapter/42119',
			'https://royalroadl.com/fiction/chapter/42362',
			'https://royalroadl.com/fiction/chapter/42372'
		],
		parser: RoyalroadlParser.getParserReturner()
	}
];


export default royalroadlTestInfo;


