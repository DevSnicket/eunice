// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createPropertyWhenAny = require("./createPropertyWhenAny");

module.exports =
	({
		directories,
		files,
	}) =>
		createPropertyWhenAny({
			name:
				"items",
			values:
				[
					...combineFiles(files),
					...combineDirectories(directories),
				],
		});

function combineFiles(
	files,
) {
	return (
		files.flatMap(
			({ items }) => items || [],
		)
	);
}

function combineDirectories(
	directories,
) {
	return (
		directories.map(
			({ items }) => items,
		)
	);
}