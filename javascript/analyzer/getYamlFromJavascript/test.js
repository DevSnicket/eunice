/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const path = require("path");

const
	getYamlFromJavascript = require("."),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

runTestsFromFileSystem({
	action:
		javascript => getYamlFromJavascript({ javascript }),
	caseFileName:
		".js",
	directory:
		path.join(__dirname, "test-cases"),
	expectedFileName:
		".yaml",
	processArguments:
		process.argv,
});

if (typeof test !== "undefined") {
	describe(
		"Class properties proposal enabled",
		() => {
			test(
				"Class with field value of literal returns class.",
				() =>
					expect(
						getYamlFromJavascript({
							babelParserPlugins: [ "classProperties" ],
							javascript: "class Class { field = false; }",
						}),
					)
					.toEqual(
						"- Class",
					),
			);

			test(
				"Class with static field value of literal returns class.",
				() =>
					expect(
						getYamlFromJavascript({
							babelParserPlugins: [ "classProperties" ],
							javascript: "class Class { static field = false; }",
						}),
					)
					.toEqual(
						"- Class",
					),
			);
		},
	);

	test(
		"React JSX enabled and function call in content of element returns depends upon function.",
		() =>
			expect(
				getYamlFromJavascript({
					babelParserPlugins: [ "jsx" ],
					javascript: "<element>{called()}</element>",
				}),
			)
			.toEqual(
				"dependsUpon: called",
			),
	);
}