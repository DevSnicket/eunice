/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

module.exports =
	() => {
		const identifier = "item";

		const stack = createStackFromLevels([ [ { id: identifier } ] ]);

		addDependencies();

		testCreateStackFromYaml({
			stack,
			stackDescription:
				"self dependent",
			yaml:
				createItemYaml({
					dependsUpon: identifier,
					id: identifier,
				}),
		});

		function addDependencies() {
			const item = stack[0][0];

			item.dependsUpon =
				[ {
					item,
					itemOrFirstAncestorItem: item,
				} ];

			item.dependents = [ item ];
		}
	};