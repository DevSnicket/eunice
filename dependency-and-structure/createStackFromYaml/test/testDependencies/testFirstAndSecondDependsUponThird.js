/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		const stack =
			createStackFromLevels(
				[
					[
						{ id: "item1" },
						{ id: "item2" },
						{ id: "item3" },
					],
				],
			);

		addDependencies();

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"first and second depends upon third",
			yaml:
				[
					createItemYaml({
						dependsUpon: "item3",
						id: "item1",
					}),
					createItemYaml({
						dependsUpon: "item3",
						id: "item2",
					}),
					"item3",
				],
		});

		function addDependencies() {
			const level = stack[0];

			level[0].dependsUpon = mapItemsToDependsUpon([ level[2] ]);
			level[1].dependsUpon = mapItemsToDependsUpon([ level[2] ]);

			level[2].dependents = [ level[0], level[1] ];
		}
	};