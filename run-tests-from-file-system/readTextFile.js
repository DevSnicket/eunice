/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const { readFile } = require("fs-extra");

module.exports =
	async filePath =>
		removeByteOrderMark(
			await readFile(
				filePath,
				"utf-8",
			),
		);

function removeByteOrderMark(
	file,
) {
	return (
		file
		.replace(
			/^\uFEFF/,
			"",
		)
	);
}