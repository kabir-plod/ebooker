export default class Epub {
	private CHAPTER_PREFIX = 'ch_';

	private title: string;
	private author: string;
	private chapters: Chapter[];

	private toc: HTMLDocument;

	constructor(title: string, author: string, chapters: Chapter[]) {
		this.title = title;
		this.author = author;
		this.chapters = chapters;

		this.buildTableOfContents(chapters);
	}

	buildTableOfContents(chapters: Chapter[]) {
		// From https://github.com/IDPF/epub3-samples/tree/master/31/moby-dick-mo-xhtml/EPUB
		let toc = new DOMParser().parseFromString(
			`<?xml version="1.0" encoding="utf-8"?>
			<!DOCTYPE html>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
			<head>
				<meta charset="utf-8"/>
			</head>
			<body>
				<section class="frontmatter TableOfContents">
					<header>
						<h1>Contents</h1>
					</header>
					<nav id="nav" role="doc-toc" epub:type="toc">
						<ol id="ol">
							
						</ol>
					</nav>
				</section>
			</body>
			</html>`,
			
			'text/html'
		);

		toc.title = this.title;

		const ol = toc.getElementById('ol');

		for (let i=0; i<chapters.length; i++) {
			// TODO: avoid elemet re-creation?
			const li = toc.createElement('li');
			const a = toc.createElement('a');
			li.appendChild(a);

			li.firstElementChild.setAttribute('href', this.CHAPTER_PREFIX + (i+1))
			li.firstElementChild.textContent = chapters[i].title;

			ol.appendChild(li);
		}

		this.toc = toc;
	}
}