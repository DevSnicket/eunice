// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ copy } = require("fs-extra"),
	path = require("path");

const directoryName = "monaco-editor";

module.exports =
	({
		from,
		to,
	}) =>
		copy(
			path.join(from, directoryName),
			path.join(to, directoryName),
		);