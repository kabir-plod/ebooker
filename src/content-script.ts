import ParserFactory from './ParserFactory';

const parser = ParserFactory.getParser(window.location.hostname, document, window.location.href);