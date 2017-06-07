export default class DOMUtil {

	public static createElement(doc: Document, elemType: string, attributes?): Element {
		const elem = doc.createElement(elemType);
		
		if (attributes !== undefined) {
			for (let key in attributes) {
				elem.setAttribute(key, attributes[key]);
			}
		}

		return elem;
	}

	public static wrapElement(elem: Element, wrapper: Element): void {
		elem.parentNode.insertBefore(wrapper, elem);
		wrapper.appendChild(elem);
	}

	public static unwrapElement(elem: Element): void {
		const parent = elem.parentNode;
		while (elem.firstChild) {
			parent.insertBefore(elem.firstChild, elem);
		}
		parent.removeChild(elem);
	}
}
