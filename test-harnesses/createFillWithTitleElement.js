const { createElement } = require("react");

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