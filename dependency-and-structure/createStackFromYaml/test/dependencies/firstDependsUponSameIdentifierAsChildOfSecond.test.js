/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStackFromLevels(
			[
				[
					{
						dependsUpon: [ { item: "childOfSecond" } ],
						id: "first",
					},
					{
						id: "second",
						items: [ [ { id: "childOfSecond" } ] ],
					},
				],
			],
		),
	yaml:
		[
			[
				createItemYaml({
					dependsUpon: "childOfSecond",
					id: "first",
				}),
				createItemYaml({
					id: "second",
					items: { id: "childOfSecond" },
				}),
			],
		],
});