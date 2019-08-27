// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { readFile } = require("fs-extra");

module.exports =
	async filePath =>
		removeBom(
			await readFile(
				filePath,
				"utf-8",
			),
		);

function removeBom(
	text,
) {
	return text.replace(/^\uFEFF/, "");
}