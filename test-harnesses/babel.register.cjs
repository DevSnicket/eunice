/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	escapeRegExp = require("lodash/escapeRegExp"),
	path = require("path");

require("@babel/register")(
	{ ignore: createIgnore() },
);

function createIgnore() {
	return [ new RegExp(formatPattern(), "i") ];

	function formatPattern() {
		const separator = escapeRegExp(path.sep);

		return `^${getAbsolutePath()}${getSubdirectories()}node_modules${separator}(?!@devsnicket)`;

		function getAbsolutePath() {
			return escapeRegExp(path.resolve("."));
		}

		function getSubdirectories() {
			return `(?:${separator}.*)?${separator}`;
		}
	}
}