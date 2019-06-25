/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

module.exports =
	() => {
		const stack = createStackFromLevels([ [ { id: "item" } ] ]);

		stack[0][0].dependsUpon = mapItemsToDependsUpon([ "missing" ]);

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"depends upon missing",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: { id: "missing" },
							id: "item",
						}),
					],
				],
		});
	};