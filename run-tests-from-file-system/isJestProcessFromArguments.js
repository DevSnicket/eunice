/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

/* istanbul ignore file: test would be a mirror of implementation */

const path = require("path");

module.exports =
	argumentsOfProcess => isSecondArgumentJest(argumentsOfProcess[1]);

function isSecondArgumentJest(
	argument,
) {
	return (
		argument.endsWith("jest")
		||
		argument.endsWith("jest.js")
		||
		argument.endsWith(path.join("jest-worker", "build", "child.js"))
	);
}