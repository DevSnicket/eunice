// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { readFileSync } from "fs";

export default
filePath =>
	readFileSync(
		filePath,
		"utf-8",
	)
	.replace(
		/^\uFEFF/, // BOM
		"",
	);