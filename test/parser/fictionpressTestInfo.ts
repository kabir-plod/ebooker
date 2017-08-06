import FictionpressParser from '../../src/parsers/FictionpressParser';
import { ITestInfo } from '../ITestInfo';


const fictionpressTestInfo: ITestInfo[] =
[
	{
		testName: 'fictionpress parser on fanfiction, single chapter',
		url: 'https://www.fanfiction.net/s/2048837/1/Reminiscence',
		title: 'Reminiscence',
		author: 'Kenya Starflight',
		chapterUrls: ['https://www.fanfiction.net/s/2048837/1/Reminiscence'],
		parser: FictionpressParser.getParserReturner()
	},
	{
		testName: 'fictionpress parser on fictionpress, multiple chapters',
		url: 'https://www.fictionpress.com/s/2161167/2/Elevators',
		title: 'Elevators',
		author: 'Imaginary Parachute',
		chapterUrls: [
			'https://www.fictionpress.com/s/2161167/1/Elevators',
			'https://www.fictionpress.com/s/2161167/2/Elevators',
			'https://www.fictionpress.com/s/2161167/3/Elevators',
			'https://www.fictionpress.com/s/2161167/4/Elevators',
			'https://www.fictionpress.com/s/2161167/5/Elevators'
		],
		parser: FictionpressParser.getParserReturner()
	}
];


export default fictionpressTestInfo;


