const prettyFormat = require("pretty-format");

module.exports =
	stack =>
		prettyFormat(
			stack,
			{ min: true },
		);