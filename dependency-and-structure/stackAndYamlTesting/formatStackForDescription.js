// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const prettyFormat = require("pretty-format");

module.exports =
	stack =>
		prettyFormat(
			stack,
			{ min: true },
		);