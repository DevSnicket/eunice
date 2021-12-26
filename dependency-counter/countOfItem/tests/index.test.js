// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	addDirectionAndMutualStackToDependenciesInStack,
	createStackFromYaml,
	createYamlFromStack,
} from "@devsnicket/eunice-dependency-and-structure";

import {
	safeDump as formatYaml,
	safeLoad as parseYaml,
} from "js-yaml";

import countOfItem from "..";
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
		createStackFromYaml(
			// @ts-ignore
			parseYaml(
				content,
			),
		);

	addDirectionAndMutualStackToDependenciesInStack(stack);

	addDependencyCountsInStack(stack);

	return formatStackAsYaml(stack);
}

function addDependencyCountsInStack(
	stack,
) {
	for (const level of stack)
		for (const item of level) {
			const dependencyCount = countOfItem(item);

			if (dependencyCount)
				item.dependencyCount = dependencyCount;

			if (item.items)
				addDependencyCountsInStack(item.items);
		}
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