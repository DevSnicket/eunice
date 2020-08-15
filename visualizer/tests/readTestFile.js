// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { readFile } from "fs-extra";

export default
async filePath => {
	const content =
		await readFile(
			filePath,
			"utf-8",
		);

	return (
		content
		.replace(
			/^\uFEFF/, // BOM
			"",
		)
	);
};