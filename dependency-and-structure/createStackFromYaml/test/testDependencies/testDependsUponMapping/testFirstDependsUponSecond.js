/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

module.exports =
	() => {
		const stack =
			createStackFromLevels(
				[
					[
						{ id: "item1" },
						{ id: "item2" },
					],
				],
			);

		const level = stack[0];

		level[0].dependsUpon = mapItemsToDependsUpon([ level[1] ]);
		level[1].dependents = [ level[0] ];

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"first depends upon second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: { id: "item2" },
							id: "item1",
						}),
						"item2",
					],
				],
		});
	};