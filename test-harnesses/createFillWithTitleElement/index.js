const { createElement } = require("react");

require("./index.css");

module.exports =
	({
		content,
		title,
	}) =>
		createElement(
			"div",
			{ className: "fill-with-title" },
			createElement("div", null, title),
			content,
		);