// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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