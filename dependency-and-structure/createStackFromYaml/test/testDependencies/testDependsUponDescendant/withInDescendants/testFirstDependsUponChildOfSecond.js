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
				"first depends upon child of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: "child",
							id: "first",
						}),
						createItemYaml({
							id: "second",
							items: { id: "child" },
						}),
					],
				],
		});

function createStackAndAddDependencies() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{
						id: "second",
						items: [ [ { id: "child" } ] ],
					},
				],
			],
		);

	const items = stack[0];

	const child = items[1].items[0][0];

	items[0].dependsUpon = mapItemsToDependsUpon([ child ]);
	child.dependents = [ items[0] ];

	return stack;
}