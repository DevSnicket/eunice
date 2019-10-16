/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../../../testCreateStackFromYaml");

module.exports =
	() =>
		testCreateStackFromYaml({
			dependenciesInDescendantsOfItemPredicate:
				({ id }) => id === "second",
			stack:
				createStackAndAddDependencies(),
			stackDescription:
				"first depends upon same identifier as child of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: "child",
							id: "first",
						}),
						createItemYaml(
							{ id: "second" },
						),
					],
				],
		});

function createStackAndAddDependencies() {
	const stack =
		createStackFromLevels(
			[
				[
					{
						dependsUpon: mapItemsToDependsUpon([ "child" ]),
						id: "first",
					},
					{ id: "second" },
				],
			],
		);

	return stack;
}