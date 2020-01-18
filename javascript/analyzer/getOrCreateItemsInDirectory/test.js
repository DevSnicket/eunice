// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	fs = require("fs"),
	path = require("path"),
	{ promisify } = require("util");

const readFile = promisify(fs.readFile);

const
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

const
	rootItemIdentifier = "rootItemIdentifier",
	testCasesDirectory = path.join(__dirname, "test-cases");

test(
	"Invalid syntax throws error with file path",
	async() =>
		(
			await expect(
				getOrCreateItemsInDirectory({
					directory: path.join(testCasesDirectory, "invalid"),
					rootItemIdentifier,
				}),
			)
		)
		.rejects
		.toThrowError(
			`Analysis of file "${path.join(rootItemIdentifier, "index.js")}" raised the following error.\n\nUnexpected token (1:1)`,
		),
);

test(
	"Valid syntax returns expected YAML",
	async() => {
		const validTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"valid",
			);

		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						validTestCasesDirectory,
					ignorePathPattern:
						new RegExp(`^(node_modules|ignoredSubdirectory\\${path.sep}ignoredSubdirectoryOfSubdirectory|ignored\\.js)`),
				}),
			),
		)
		.toBe(
			await readYamlFile({
				directoryPath: validTestCasesDirectory,
				fileName: "expected.yaml",
			}),
		);
	},
);

test(
	"Root item identifier ",
	async() => {
		const rootItemIdentifierTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"root-item-identifier",
			);

		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						rootItemIdentifierTestCasesDirectory,
					rootItemIdentifier,
				}),
			),
		)
		.toBe(
			await readYamlFile({
				directoryPath: rootItemIdentifierTestCasesDirectory,
				fileName: "expected.yaml",
			}),
		);
	},
);

function readYamlFile({
	directoryPath,
	fileName,
}) {
	return (
		readFile(
			path.join(directoryPath, fileName),
			"utf-8",
		)
	);
}