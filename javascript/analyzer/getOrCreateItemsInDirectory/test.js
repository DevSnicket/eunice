/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
	"Valid JavaScript files return expected YAML",
	async() => {
		const supportedTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"valid",
			);

		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						supportedTestCasesDirectory,
					ignorePathPattern:
						new RegExp(`^(node_modules|ignoredSubdirectory\\${path.sep}ignoredSubdirectoryOfSubdirectory|ignored\\.js)`),
				}),
			),
		)
		.toBe(
			await readExpectedFile(),
		);

		async function readExpectedFile() {
			return (
				getWithPathSeparator(
					await readFile(
						path.join(supportedTestCasesDirectory, "expected.yaml"),
						"utf-8",
					),
				)
			);

			function getWithPathSeparator(
				expected,
			) {
				return expected.replace(/\//g, path.sep);
			}
		}
	},
);

test(
	"File with not supported declaration throws error with file path",
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
			"Analysis of file \"index.js\" raised the following error.\n\nUnexpected token (1:1)",
		),
);