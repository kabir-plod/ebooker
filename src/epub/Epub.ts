import * as JSZip from 'jszip';
import DOMUtil from '../util/DOMUtil';
import DateUtil from '../util/DateUtil';
import EpubTemplates from './EpubTemplates';
import { IChapter } from '../IChapter';


export default class Epub {
	private CHAPTER_PREFIX = 'chapter_';

	private title: string;
	private author: string;
	private chapters: IChapter[];

	private titleXHTML: HTMLDocument;
	private tocXHTML: HTMLDocument;
	private chaptersXHTML: HTMLDocument[];
	// Meta
	private mimeType: string = 'application/epub+zip';
	private packageOPF: XMLDocument;
	private containerXMLSerialized: string = EpubTemplates.ContainerXMLSerialized;


	constructor(title: string, author: string, chapters: IChapter[]) {
		this.title = title;
		this.author = author;
		this.chapters = chapters;

		this.titleXHTML = this.buildTitlePage();
		this.tocXHTML = this.buildTableOfContents(chapters);
		this.chaptersXHTML = this.formatChapterContent(chapters);
		this.packageOPF = this.buildPackageOPF(chapters);
	}


	public export() {
		const zip = new JSZip();
		const s = new XMLSerializer();

		zip.file('mimetype', this.mimeType);
		zip.file('META-INF/container.xml', this.containerXMLSerialized);
		zip.file('EPUB/package.opf', s.serializeToString(this.packageOPF));
		zip.file('EPUB/titlepage.xhtml', s.serializeToString(this.titleXHTML))
		zip.file('EPUB/toc.xhtml', s.serializeToString(this.tocXHTML));

		this.chaptersXHTML.map( (ch, index) => {
			zip.file('EPUB/' + this.getChapterName(index), s.serializeToString(ch));
		});

		zip.generateAsync({type:"blob"})
		.then( blob => {
			var a = document.createElement('a');
			a.href = URL.createObjectURL(blob);
			a.download = this.title + '.epub';
			a.click();
		});

		// TODO: remove objects from memory
	}


	private getChapterName(index) {
		return this.CHAPTER_PREFIX + (index+1) + '.xhtml';
	}


	private buildTitlePage(): HTMLDocument {
		const titleDoc = EpubTemplates.TitlePageXHTML;
		titleDoc.getElementById('title').textContent = this.title;

		return titleDoc;
	}


	private buildPackageOPF(chapters: IChapter[]): XMLDocument {
		const opf = EpubTemplates.PackageOPF;

		this.setPackageMetadata(opf);
		// TODO: add cover image

		const manifest = opf.getElementById('manifest');
		const spine = opf.getElementById('spine');

		chapters.map( (ch, index) => {
			const chapterName = this.getChapterName(index);

			const item = DOMUtil.createElement(opf, 'item', 
				{'id': chapterName, 'href': chapterName, 'media-type': 'application/xhtml+xml'})
			manifest.appendChild(item);

			const itemref = DOMUtil.createElement(opf, 'itemref', 
				{'idref': chapterName, 'linear':'yes'})
			spine.appendChild(itemref);
		});

		return opf;
	}
	

	private setPackageMetadata(opf: XMLDocument) {
		// TODO: create unique ID
		opf.getElementById('package').setAttribute('unique-identifier', 'uid');
		opf.getElementById('title').textContent = this.title;
		opf.getElementById('creator').textContent = this.author;
		opf.getElementById('publisher').textContent = 'PLACEHOLDER';
		opf.getElementById('uid').textContent = 'PLACEHOLDER';
		// TODO: support other languages
		opf.getElementById('language').textContent = 'en';
		opf.getElementById('last-modified').textContent = DateUtil.getDateString();
	}


	private formatChapterContent(chapters: IChapter[]): HTMLDocument[] {
		return chapters.map( ch => {
			const doc = EpubTemplates.ContentXHTML;

			doc.title = this.title;
			doc.getElementById('chapter-title').textContent = ch.title;

			const section = doc.getElementById('content-section');
			section.appendChild(ch.content);
			DOMUtil.unwrapElement(ch.content);

			return doc;
		});
	}


	private buildTableOfContents(chapters: IChapter[]): HTMLDocument {
		const toc = EpubTemplates.TocXHTML;
		toc.title = this.title;

		const ol = toc.getElementById('ol');

		chapters.map( (ch, index) => {
			const li = DOMUtil.createElement(toc, 'li');
			const a = DOMUtil.createElement(toc, 'a', {href: this.getChapterName(index)});
			a.textContent = ch.title;

			li.appendChild(a);

			ol.appendChild(li);
		});

		return toc;
	}
}