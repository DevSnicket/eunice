/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

module.exports =
	() =>
		testCreateStackFromYaml({
			stack:
				createStackFromLevels(
					[ [ {
						dependsUpon: mapItemsToDependsUpon([ "missing" ]),
						id: "item",
					} ] ],
				),
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