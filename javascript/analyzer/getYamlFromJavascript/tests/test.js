// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const path = require("path");

const
	getYamlFromJavascript = require(".."),
	readJavascriptAndYamlFromDirectoryName = require("./readJavascriptAndYamlFromDirectoryName"),
	runTestsFromFileSystem = require("@devsnicket/eunice-run-tests-from-file-system");

describe(
	"With JS file extension",
	() =>
		runJavascriptAndYamlTestsFromFileSystem({
			directoryName: "js-file-extension",
			parameters: { fileExtensions: [ ".js" ] },
		}),
);

describe(
	"Class properties proposal enabled",
	() =>
		runJavascriptAndYamlTestsFromFileSystem({
			directoryName: "class-properties",
			parameters: { babelParserPlugins: [ "classProperties" ] },
		}),
);

if (typeof test !== "undefined") {
	test(
		"No file extensions does not remove extension from module import file path.",
		async() => {
			const { javascript, yaml } = await readJavascriptAndYamlFromDirectoryName("no-file-extensions");

			expect(getYamlFromJavascript({ javascript }))
			.toEqual(yaml);
		},
	);

	test(
		"React JSX enabled and function call in content of element returns depends upon function.",
		async() => {
			const { javascript, yaml } = await readJavascriptAndYamlFromDirectoryName("jsx");

			expect(
				getYamlFromJavascript({
					babelParserPlugins: [ "jsx" ],
					javascript,
				}),
			)
			.toEqual(yaml);
		},
	);
}

function runJavascriptAndYamlTestsFromFileSystem({
	directoryName,
	parameters,
}) {
	runTestsFromFileSystem({
		caseFileName:
			".js",
		directoryAbsolutePath:
			path.join(__dirname, "test-cases", directoryName),
		expectedFileName:
			".yaml",
		getActualForTestCase:
			javascript =>
				getYamlFromJavascript({
					...parameters,
					javascript,
				}),
		processArguments:
			process.argv,
	});
}