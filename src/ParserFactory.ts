import Ao3Parser from './parsers/Ao3Parser';
import FictionpressParser from './parsers/FictionpressParser';
import PracticalGuideToEvilParser from './parsers/PracticalGuideToEvilParser';
import RoyalroadlParser from './parsers/RoyalroadlParser';
import TheGodsAreBastardsParser from './parsers/TheGodsAreBastardsParser';
import TwigParser from './parsers/TwigParser';
import WildbowParser from './parsers/WildbowParser';
import { IParser } from './parsers/IParser';
import { IParserReturner } from './IParserReturner';


export default class ParserFactory {
	// TODO: invert dependencies so parser registers with factory instead
	private static parserMap = {
		'archiveofourown.org': Ao3Parser.getParserReturner(),
		'www.fictionpress.com': FictionpressParser.getParserReturner(),
		'www.fanfiction.net': FictionpressParser.getParserReturner(),
		'practicalguidetoevil.wordpress.com': PracticalGuideToEvilParser.getParserReturner(),
		'royalroadl.com': RoyalroadlParser.getParserReturner(),
		'tiraas.wordpress.com': TheGodsAreBastardsParser.getParserReturner(),
		'twigserial.wordpress.com': TwigParser.getParserReturner(),
		'parahumans.wordpress.com': WildbowParser.getParserReturner(),
		'pactwebserial.wordpress.com': WildbowParser.getParserReturner()
	};

	// public static register(hostname: string, parserReturner: IParserReturner): void {
	// 	this.parserMap[hostname] = parserReturner;
	// }

	public static getParser(hostname: string, _document: HTMLDocument, pageUrl: string): IParser {
		return this.parserMap[hostname](_document, pageUrl);
	}
}