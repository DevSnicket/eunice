// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

module.exports =
	subPath =>
		path.join(
			__dirname,
			"..",
			"dist",
			"harness",
			subPath,
		);