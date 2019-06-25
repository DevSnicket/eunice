/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports = value => getQuoted(getEscaped(value));

function getQuoted(
	value,
) {
	return `"${value}"`;
}

function getEscaped(
	value,
) {
	return (
		value
		.replace(/"/g, "\\$&")
		.replace(/\n/g, "\\n")
	);
}