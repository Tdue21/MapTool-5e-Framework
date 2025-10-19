/**
 * 
 * @param {string} description 
 * @returns {string}
 */
function parseMarkDown(description) {
	try {
		let data = MT.atob(description);
		data = replaceFunctionCalls(data);

		const renderer = {
			image(href, title, text) {
				try {
					if (href === null) {
						return text;
					}
					
					let size = 0;

					if (href.includes("=")) {
						let parts = href.split("=");
						href = parts[0];
						size = Number(parts[1]);
					}

					let out = `<img src="${href}" alt="${text}"`;
					if (title) {
						out += ` title="${title}"`;
					}

					if (size != 0) {
						out += `  width="${size}px"`;
					}

					out += '>';
					return out;
				} catch (error) {
					MT.printException("expandedImage", error);
					return false;
				}
			}
		};
		marked.use({ renderer });
		return marked.parse(data);
	} catch (error) {
		MT.printException("parseMarkDown", error);
	}
}
MTScript.registerMacro("parseMarkDown", parseMarkDown);


/**
 * 
 * @param {string} description 
 * @returns 
 */
function replaceFunctionCalls(description) {
	const regex = /\[(\w*?):(.*?)\]/gi;
	const result = description.replace(regex, (m, p1, p2, o, s) => {
		let result = MTScript.evalMacro(m);
		if (p1 == 'r') {
			return result;
		}
	});
	return result;
}
