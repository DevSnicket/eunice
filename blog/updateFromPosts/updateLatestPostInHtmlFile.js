import updateInHtmlFile from "../../updateInHtmlFile.js";

export default ({
	filePath,
	post: { date, title },
}) =>
	updateInHtmlFile({
		filePath,
		replacements: [ {
			content:
				[
					`latest blog post (${date.replace(/-/g, "&#8209;")})`,
					`<a href="./blog">${title}</a>`,
				]
				.map(line => `<div>${line}</div>`)
				.join(""),
			tag:
				"blogLatest",
		} ]
	});
