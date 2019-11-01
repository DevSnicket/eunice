/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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