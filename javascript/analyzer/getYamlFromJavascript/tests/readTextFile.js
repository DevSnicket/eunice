// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import fileSystem from "fs-extra";

export default
async filePath =>
	removeByteOrderMark(
		await fileSystem.readFile(
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