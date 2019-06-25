/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const { readFileSync } = require("fs");

module.exports =
	filePath =>
		readFileSync(
			filePath,
			"utf-8",
		)
		.replace(
			/^\uFEFF/, // BOM
			"",
		);