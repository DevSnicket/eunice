// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackFromLevels = require("../../../../stackAndYamlTesting/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStackFromLevels(
			[ [ {
				dependsUpon: [ { item: "missing" } ],
				id: "item",
			} ] ],
		),
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