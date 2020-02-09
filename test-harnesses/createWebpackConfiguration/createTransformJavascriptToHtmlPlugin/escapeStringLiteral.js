/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

export default
stringLiteral =>
	escapeDoubleQuote(
		escapeBackslash(
			stringLiteral,
		),
	);

function escapeBackslash(
	stringLiteral,
) {
	return (
		stringLiteral
		.replace(
			/\\/g,
			"\\\\",
		)
	);
}

function escapeDoubleQuote(
	stringLiteral,
) {
	return (
		stringLiteral
		.replace(
			/"/g,
			"\\\"",
		)
	);
}