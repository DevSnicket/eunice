// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createStackFromYaml, createYamlFromStack } from "@devsnicket/eunice-dependency-and-structure";
import { safeDump as formatYaml, safeLoad as parseYaml } from "js-yaml";

import countDependenciesInStack from "..";
import path from "path";
import runTestsFromFileSystem from "@devsnicket/eunice-run-tests-from-file-system";

runTestsFromFileSystem({
	caseFileName:
		"source.yaml",
	directoryAbsolutePath:
		path.join(__dirname, "test-cases/"),
	expectedFileName:
		"expected.yaml",
	getActualForTestCase,
	processArguments:
		process.argv,
});

function getActualForTestCase(
	{ content },
) {
	const stack =
		parseStackFromYaml(
			content,
		);

	countDependenciesInStack(
		stack,
	);

	return formatStackAsYaml(stack);
}

function parseStackFromYaml(
	yaml,
) {
	return (
		createStackFromYaml(
			// @ts-ignore
			parseYaml(
				yaml,
			),
		)
	);
}

function formatStackAsYaml(
	stack,
) {
	return (
		formatYaml(
			createYamlFromStack(stack),
			{ lineWidth: Number.MAX_SAFE_INTEGER },
		)
		.trimRight()
	);
}