/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() =>
		testCreateStackFromYaml({
			stack:
				createStackAndAddDependencies(),
			stackDescription:
				"first depends upon same identifier as grandchild of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: "grandchild",
							id: "first",
						}),
						createItemYaml({
							id:
								"second",
							items:
								createItemYaml({
									id: "child",
									items: "grandchild",
								}),
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
						items:
							[
								[
									{
										id: "child",
										items: [ [ { id: "grandchild" } ] ],
									},
								],
							],
					},
				],
			],
		);

	stack[0][0].dependsUpon = mapItemsToDependsUpon([ "grandchild" ]);

	return stack;
}