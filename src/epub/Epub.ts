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
	private containerXML: XMLDocument;


	constructor(title: string, author: string, chapters: Chapter[]) {
		this.title = title;
		this.author = author;
		this.chapters = chapters;

		this.titleXHTML = this.buildTitlePage();
		this.tocXHTML = this.buildTableOfContents(chapters);
		this.chaptersXHTML = this.formatChapterContent(chapters);
		console.log('chapter 2 doc');
		console.log(this.chaptersXHTML[1]);
		this.containerXML = this.buildContainerXML();
		this.packageOPF = this.buildPackageOPF(chapters);
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
			const chapterName = this.CHAPTER_PREFIX + (index+1)

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

	private setPackageMetadata(opf: XMLDocument) {
		const packageElem = opf.getElementById('package');
		// TODO: create unique ID
		packageElem.setAttribute('unique-identifier', 'pub-id')

		const title = opf.getElementById('title');
		title.textContent = this.title;

		const creator = opf.getElementById('creator');
		creator.textContent = this.author;

		// TODO: support other languages
		const lang = opf.getElementById('language');
		lang.textContent = 'en-US';

		const lastModified = opf.getElementById('last-modified');
		lastModified.textContent = new Date().toISOString();
	}


	private buildContainerXML(): XMLDocument {
		return EpubTemplates.ContainerXML;
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
			const a = DOMUtil.createElement(toc, 'a', {href: this.CHAPTER_PREFIX + (index+1)});
			a.textContent = ch.title;

			li.appendChild(a);

			ol.appendChild(li);
		});

		return toc;
	}
}