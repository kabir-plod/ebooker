export interface IParserReturner {
	(_document: HTMLDocument, pageUrl: string): Parser
}