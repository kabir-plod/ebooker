import FictionpressParser from '../src/parsers/FictionpressParser';


const fictionpressTestInfo: TestInfo[] =
[
	{
		testName: 'fictionpress parser, single chapter',
		url: 'https://www.fanfiction.net/s/2048837/1/Reminiscence',
		title: 'Reminiscence',
		author: 'Kenya Starflight',
		chapterUrls: ['https://www.fanfiction.net/s/2048837/1/Reminiscence'],
		parser: FictionpressParser.getParserReturner()
	},
	{
		testName: 'fictionpress parser, multiple chapters',
		url: 'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest',
		title: 'When Darkness Shines Brightest',
		author: 'JulmaSatu',
		chapterUrls: [
			'https://www.fictionpress.com/s/3305498/1/When-Darkness-Shines-Brightest',
			'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest',
			'https://www.fictionpress.com/s/3305498/3/When-Darkness-Shines-Brightest',
			'https://www.fictionpress.com/s/3305498/4/When-Darkness-Shines-Brightest'
		],
		parser: FictionpressParser.getParserReturner()
	}
];


export default fictionpressTestInfo;


