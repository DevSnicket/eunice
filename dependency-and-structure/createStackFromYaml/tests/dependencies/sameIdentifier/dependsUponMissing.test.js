// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../../stackAndYamlTesting/createItemYaml"),
	createStackFromLevels = require("../../../../stackAndYamlTesting/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

const identifier = "item";

testCreateStackFromYaml({
	stack:
		createStackFromLevels(
			[ [ {
				dependsUpon: [ { item: identifier } ],
				id: identifier,
			} ] ],
		),
	yaml:
		createItemYaml({
			dependsUpon: identifier,
			id: identifier,
		}),
});