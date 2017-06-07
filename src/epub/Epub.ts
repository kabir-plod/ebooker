import * as JSZip from 'jszip';
import DOMUtil from '../util/DOMUtil';
import EpubTemplates from './EpubTemplates';


export default class Epub {
	private CHAPTER_PREFIX = 'chapter_';

	private title: string;
	private author: string;
	private chapters: Chapter[];

	private titleXHTML: HTMLDocument;
	private tocXHTML: HTMLDocument;
	private chaptersXHTML: HTMLDocument[];
	// Meta
	private mimeType: string = 'application/epub+zip';
	private packageOPF: XMLDocument;
	private containerXMLSerialized: string = EpubTemplates.ContainerXMLSerialized;


	constructor(title: string, author: string, chapters: Chapter[]) {
		this.title = title;
		this.author = author;
		this.chapters = chapters;

		this.titleXHTML = this.buildTitlePage();
		this.tocXHTML = this.buildTableOfContents(chapters);
		this.chaptersXHTML = this.formatChapterContent(chapters);
		this.packageOPF = this.buildPackageOPF(chapters);
	}

	// TODO: pass arguments instead of using state?
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


	private buildPackageOPF(chapters: Chapter[]): XMLDocument {
		const opf = EpubTemplates.PackageOPF;

		this.setPackageMetadata(opf);
		// TODO: add cover image

		const manifest = opf.getElementById('manifest');
		const spine = opf.getElementById('spine');

		chapters.map( (ch, index) => {
			const chapterName = this.getChapterName(index);

			const item = DOMUtil.createElement(opf, 'item', 
				{
					'id': chapterName,
					'href': chapterName,
					'media-type': 'application/xhtml+xml'
				})
			manifest.appendChild(item);

			const itemref = DOMUtil.createElement(opf, 'itemref', 
				{
					'idref': chapterName,
					'linear':'yes'
				})
			spine.appendChild(itemref);
		});

		console.log('package.opf');
		console.log(opf);

		return opf;
	}

	// CCYY-MM-DDThh:mm:ssZ
	private getDate() {
		const date = new Date();

		function pad(number) {
			if (number < 10) {
				return '0' + number;
			}
			return number;
		}

		return date.getUTCFullYear() +
		'-' + pad(date.getUTCMonth() + 1) +
		'-' + pad(date.getUTCDate()) +
		'T' + pad(date.getUTCHours()) +
		':' + pad(date.getUTCMinutes()) +
		':' + pad(date.getUTCSeconds()) +
		'Z';
	}

	private setPackageMetadata(opf: XMLDocument) {
		const packageElem = opf.getElementById('package');
		// TODO: create unique ID
		packageElem.setAttribute('unique-identifier', 'uid')

		const title = opf.getElementById('title');
		title.textContent = this.title;

		const creator = opf.getElementById('creator');
		creator.textContent = this.author;

		const publisher = opf.getElementById('publisher');
		publisher.textContent = 'PLACEHOLDER';

		const uid = opf.getElementById('uid');
		uid.textContent = 'PLACEHOLDER';

		// TODO: support other languages
		const lang = opf.getElementById('language');
		lang.textContent = 'en';

		const lastModified = opf.getElementById('last-modified');
		lastModified.textContent = this.getDate();
		console.log('last modified: ' + lastModified.textContent);
	}


	private formatChapterContent(chapters: Chapter[]): HTMLDocument[] {
		const s = new XMLSerializer();
		const parser = new DOMParser();

		return chapters.map( ch => {
			const doc = parser.parseFromString(s.serializeToString(ch.content), 'text/html');

			doc.title = this.title;

			const section = DOMUtil.createElement(doc, 'section', {role: 'doc-chapter'});
			DOMUtil.wrapElement(doc.body.firstElementChild, section);

			DOMUtil.unwrapElement(section.firstElementChild);

			const h1 = doc.createElement('h1');
			h1.textContent = ch.title;

			const header = doc.createElement('header');
			header.appendChild(h1);
			section.insertBefore(header, section.firstElementChild);

			return doc;
		});
	}

	

	private buildTableOfContents(chapters: Chapter[]): HTMLDocument {
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