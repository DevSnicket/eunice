const fs = require("fs");

module.exports =
	async file =>
		removeBom(
			await fs.readFileSync(
				file,
				"utf-8",
			),
		);

function removeBom(
	text,
) {
	return (
		text.replace(
			/^\uFEFF/,
			"",
		)
	);
}