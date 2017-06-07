interface EpubTemplate {
	TitlePageXHTML: HTMLDocument,
	TocXHTML: HTMLDocument,
	PackageOPF: XMLDocument,
	ContainerXML: XMLDocument
}


const parser = new DOMParser();

// From https://github.com/IDPF/epub3-samples/tree/master/31/moby-dick-mo-xhtml
const templates: EpubTemplate = {
	TitlePageXHTML: parser.parseFromString(
		`<?xml version="1.0" encoding="utf-8"?>
		<!DOCTYPE html>
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title id="title"></title>
			<meta charset="utf-8"/>
		</head>
		<body>
		</body>
		</html>`,

		'text/html'
	),

	TocXHTML: parser.parseFromString(
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
	),


	PackageOPF: parser.parseFromString(
		`<?xml version="1.0" encoding="UTF-8"?>
		<package id="package" xmlns="http://www.idpf.org/2007/opf" version="3.1" xml:lang="en" 
		prefix="dc: http://purl.org/dc/elements/1.1/">

			<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
				<dc:title id="title"></dc:title>
				<dc:creator id="creator"></dc:creator>
				<dc:identifier id="pub-id">idpf.epub31.samples.moby-dick.xhtml</dc:identifier>
				<dc:language id="language"></dc:language>
				<dc:publisher></dc:publisher>
				<meta id="last-modified" property="dcterms:modified"></meta>
				<meta property="dc:contributor">ebooker</meta>
			</metadata>

			<manifest id="manifest">
				<item id="toc" properties="nav" href="toc.xhtml" media-type="application/xhtml+xml"/>
				<item id="titlepage" href="titlepage.xhtml" media-type="application/xhtml+xml"/>
			</manifest>

			<spine id="spine">
			</spine>
		</package>`, 

		'application/xml'
	),


	ContainerXML: parser.parseFromString(
		`<?xml version="1.0" encoding="UTF-8"?><container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
			<rootfiles>
				<rootfile full-path="EPUB/package.opf" media-type="application/oebps-package+xml"/>
			</rootfiles>
		</container>`,

		'application/xml'
	)
}

export default templates;