const path = require("path");

module.exports =
	subPath =>
		path.join(
			__dirname,
			"..",
			"dist",
			"harness",
			subPath,
		);