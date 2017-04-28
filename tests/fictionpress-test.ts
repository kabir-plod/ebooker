import * as test from 'tape';
import FictionpressParser from '../src/parsers/FictionpressParser';

export default runFictionpressParserTests;

function runFictionpressParserTests() {
	test('fictionpress parser, single page', t => {
		
		
		const parser = new FictionpressParser(document, 'https://www.fanfiction.net/s/2048837/1/Reminiscence');

		t.equal(parser.getTitle(), 'Reminiscence');
		t.equal(parser.getAuthor(), 'Kenya Starflight');
		t.deepEqual(parser.getChapterUrls(), ['https://www.fanfiction.net/s/2048837/1/Reminiscence']);
	});
}