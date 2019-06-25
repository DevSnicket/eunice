/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	callTestForSymmetrical = require("../../tests/callTestForSymmetrical"),
	createStackFromLevels = require("../../tests/createStackFromLevels"),
	formatStackForDescription = require("../../tests/formatStackForDescription"),
	testCreateStackFromYaml = require("./testCreateStackFromYaml"),
	testDependencies = require("./testDependencies");

describe(
	"createStackFromYaml",
	() => {
		callTestForSymmetrical(
			testCreateStackFromYaml,
		);

		testStackOfCollectionAndScalarLevels();

		testDependencies();
	},
);

function testStackOfCollectionAndScalarLevels() {
	const stack =
		createStackFromLevels(
			[
				[ { id: "item1" } ],
				[ { id: "item2" } ],
			],
		);

	testCreateStackFromYaml({
		stack,
		stackDescription:
			formatStackForDescription(stack),
		yaml:
			[ [ "item1" ], "item2" ],
	});
}