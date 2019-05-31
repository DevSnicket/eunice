const fs = require("fs-extra");

module.exports =
	async filePath =>
		removeBom(
			await fs.readFile(
				filePath,
				"utf-8",
			),
		);

function removeBom(
	text,
) {
	return text.replace(/^\uFEFF/, "");
}