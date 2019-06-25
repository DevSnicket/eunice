/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	fs = require("fs"),
	path = require("path");

const
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

const testCasesDirectory = path.join(__dirname, "test-cases");

test(
	"Valid JavaScript files return expected YAML",
	() => {
		const supportedTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"valid",
			);

		expect(
			getYamlForItemOrItems(
				getOrCreateItemsInDirectory({
					directory: supportedTestCasesDirectory,
					ignoreDirectoryNames: [ "node_modules" ],
				}),
			),
		)
		.toBe(readExpectedFile());

		function readExpectedFile() {
			return (
				fs.readFileSync(
					path.join(supportedTestCasesDirectory, "expected.yaml"),
					"utf-8",
				)
				.replace(/\//g, path.sep)
			);
		}
	},
);

test(
	"File with not supported declaration throws error with file path",
	() =>
		expect(
			() =>
				getOrCreateItemsInDirectory(
					{ directory: path.join(testCasesDirectory, "invalid") },
				),
		)
		.toThrowError(
			"Analysis of file \"index.js\" raised the following error.\n\nUnexpected token (1:1)",
		),
);