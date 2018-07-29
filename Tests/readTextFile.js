const readFileSync = require("fs").readFileSync;

module.exports =
	filePath =>
		readFileSync(
			filePath,
			"utf-8"
		)
		.replace(
			/^\uFEFF/, // BOM
			""
		);