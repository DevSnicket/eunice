/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const prettyFormat = require("pretty-format");

module.exports =
	stack =>
		prettyFormat(
			stack,
			{ min: true },
		);