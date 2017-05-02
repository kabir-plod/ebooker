export default class ParserFactory {
	// Key is the actual website hostname, not 'hostname'.
	private static parserMap: {hostname: ParserReturner} = {} as {hostname: ParserReturner};

	public static register(hostname: string, parserReturner: ParserReturner): void {
		this.parserMap[hostname] = parserReturner;

		console.log('parserMap on next line: ');
		console.log(this.parserMap);
	}

	public static getParser(hostname, _document, pageUrl): Parser {
		return this.parserMap[hostname](_document, pageUrl);
	}
}