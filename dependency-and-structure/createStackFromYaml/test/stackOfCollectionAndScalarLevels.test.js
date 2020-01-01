/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createStackFromLevels = require("../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("./testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStackFromLevels(
			[
				[ { id: "item1" } ],
				[ { id: "item2" } ],
			],
		),
	yaml:
		[ [ "item1" ], "item2" ],
});