import RoyalroadlParser from '../src/parsers/RoyalroadlParser';


const royalroadlTestInfo: TestInfo[] =
[
	{
		testName: 'royalroadl parser, <20 chapters',
		url: 'https://royalroadl.com/fiction/3984',
		title: 'Trapped: The GM',
		author: 'Troll',
		chapterUrls: [
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/38623/1-people-who-just-won-t-shut-up',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/38944/2-playing-player',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/39646/3-a-holy-item',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/39665/4-the-taste-of-despair',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/39940/5-the-master-of-excuses',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/40419/6-manmade-monster',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/42075/7-jumping-to-conclusions-can-be-a-danger',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/42119/8-you-can-t-be-my-cat',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/42362/9-when-your-enemies-band-together',
			'https://royalroadl.com/fiction/3984/trapped-the-gm/chapter/42372/10-showdown-above-the-heavens'
		],
		parser: RoyalroadlParser.getParserReturner()
	}
];


export default royalroadlTestInfo;


