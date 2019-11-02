/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../../testCreateStackFromYaml");

module.exports =
	() =>
		testCreateStackFromYaml({
			stack:
				createStackFromLevels(
					[
						[
							{
								dependsUpon: [ { item: "child" } ],
								id: "first",
							},
							{
								id: "second",
								items: [ [ { id: "child" } ] ],
							},
						],
					],
				),
			stackDescription:
				"first depends upon same identifier as child of second",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: "child",
							id: "first",
						}),
						createItemYaml({
							id: "second",
							items: { id: "child" },
						}),
					],
				],
		});