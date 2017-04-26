import { assert } from 'chai';
import FictionpressParser from '../src/parsers/FictionpressParser';


describe('fictionpress parser tests', function() {

	it('fictionpress single chapter', function() {
		browser
		.url('https://www.fanfiction.net/s/2048837/1/Reminiscence')
		.then( function() {
			const parser = new FictionpressParser(document, 'https://www.fanfiction.net/s/2048837/1/Reminiscence');

			assert.equal(parser.getTitle(), 'Reminiscence');
			assert.equal(parser.getAuthor(), 'Kenya Starflight');
			assert.deepEqual(parser.getChapterUrls(), ['https://www.fanfiction.net/s/2048837/1/Reminiscence']);
		})
	}


	it('fictionpress multiple chapter', function() {
		browser
		.url('https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest')
		.then( function() {
			const parser = new FictionpressParser(document, 'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest');

			assert.equal(parser.getTitle(), 'When Darkness Shines Brightest');
			assert.equal(parser.getAuthor(), 'JulmaSatu');
			assert.deepEqual(parser.getChapterUrls(), [
				'https://www.fictionpress.com/s/3305498/1/When-Darkness-Shines-Brightest',
				'https://www.fictionpress.com/s/3305498/2/When-Darkness-Shines-Brightest',
				'https://www.fictionpress.com/s/3305498/3/When-Darkness-Shines-Brightest',
				'https://www.fictionpress.com/s/3305498/4/When-Darkness-Shines-Brightest'
			]);
		})


		.end();
	}
});
