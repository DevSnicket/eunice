// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

export default
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