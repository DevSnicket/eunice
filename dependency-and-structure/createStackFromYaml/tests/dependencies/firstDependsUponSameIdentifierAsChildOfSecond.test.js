// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../stackAndYamlTesting/createItemYaml";
import createStackFromLevels from "../../../stackAndYamlTesting/createStackFromLevels";
import testCreateStackFromYaml from "../testCreateStackFromYaml";

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