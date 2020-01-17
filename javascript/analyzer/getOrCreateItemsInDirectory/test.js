// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	fs = require("fs"),
	path = require("path"),
	{ promisify } = require("util");

const readFile = promisify(fs.readFile);

const
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

const testCasesDirectory = path.join(__dirname, "test-cases");

test(
	"Invalid syntax throws error with file path",
	async() =>
		(
			await expect(
				getOrCreateItemsInDirectory(
					{ directory: path.join(testCasesDirectory, "invalid") },
				),
			)
		)
		.rejects
		.toThrowError(
			`Analysis of file "${path.join("invalid", "index.js")}" raised the following error.\n\nUnexpected token (1:1)`,
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

describe(
	"Root item identifier",
	() => {
		const directory =
			path.join(
				testCasesDirectory,
				"root-item-identifier",
			);

		test.each(
			[
				[ "null-expected.yaml", null ],
				[ "specified-expected.yaml", "root-item-specified" ],
			],
		)(
			"%s",
			async(
				fileName,
				rootItemIdentifier,
			) => {
				expect(
					getYamlForItemOrItems(
						await getOrCreateItemsInDirectory({
							directory,
							rootItemIdentifier,
						}),
					),
				)
				.toBe(
					await readYamlFile({
						directoryPath: directory,
						fileName,
					}),
				);
			},
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