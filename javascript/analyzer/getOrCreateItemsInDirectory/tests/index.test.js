// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	fs = require("fs-extra"),
	getOrCreateItemsInDirectory = require(".."),
	getYamlForItemOrItems = require("../../getYamlForItemOrItems"),
	path = require("path");

const
	rootItemIdentifier = "rootItemIdentifier",
	testCasesDirectory = path.join(__dirname, "test-cases");

const emptyTestCaseDirectory = path.join(testCasesDirectory, "empty");

beforeAll(
	() => fs.ensureDir(emptyTestCaseDirectory),
);

test(
	"Empty directory returns null",
	async() =>
		expect(
			await getOrCreateItemsInDirectory(
				{ directory: emptyTestCaseDirectory },
			),
		)
		.toBeNull(),
);

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
	"Root item identifier and empty directory returns directory item",
	async() =>
		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						emptyTestCaseDirectory,
					rootItemIdentifier,
				}),
			),
		)
		.toBe("id: rootItemIdentifier\ntype: directory"),
);

test(
	"Root item identifier used in ancestor paths",
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
		fs.readFile(
			path.join(directoryPath, fileName),
			"utf-8",
		)
	);
}