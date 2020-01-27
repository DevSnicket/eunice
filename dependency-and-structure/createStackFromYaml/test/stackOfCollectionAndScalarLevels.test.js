// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createStackFromLevels = require("../../stackAndYamlTesting/createStackFromLevels"),
	testCreateStackFromYaml = require("./testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStackFromLevels(
			[
				[ { id: "upper" } ],
				[ { id: "lower" } ],
			],
		),
	yaml:
		[ [ "upper" ], "lower" ],
});