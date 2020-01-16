// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

module.exports =
	({
		directory,
		file,
	}) =>
		createForSubdirectory({
			directory,
			subdirectory:
				path.dirname(file),
		});

function createForSubdirectory({
	directory,
	subdirectory,
}) {
	return (
		{
			absolute:
				subdirectory,
			relative:
				path.relative(
					directory,
					subdirectory,
				),
		}
	);
}