const { readFileSync } = require("fs");

module.exports =
	filePath =>
		readFileSync(
			filePath,
			"utf-8",
		)
		.replace(
			/^\uFEFF/, // BOM
			"",
		);