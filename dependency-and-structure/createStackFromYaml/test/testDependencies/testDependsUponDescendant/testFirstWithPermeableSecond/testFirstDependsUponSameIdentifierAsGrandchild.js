/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../../tests/createStackFromLevels"),
	mapItemsToDependsUpon = require("../../../../../tests/mapItemsToDependsUpon"),
	testCreateStackFromYaml = require("../../../testCreateStackFromYaml");

module.exports =
	() =>
		testCreateStackFromYaml({
			stack:
				createStackFromLevels(
					[
						[
							{
								dependsUpon: mapItemsToDependsUpon([ "grandchild" ]),
								id: "first",
							},
							{
								dependencyPermeable:
									true,
								id:
									"second",
								items:
									[
										[
											{
												id: "child",
												items: [ [ { id: "grandchild" } ] ],
											},
										],
									],
							},
						],
					],
				),
			stackDescription:
				"first depends upon same identifier as grandchild",
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: "grandchild",
							id: "first",
						}),
						createItemYaml({
							dependencyPermeable:
								true,
							id:
								"second",
							items:
								createItemYaml({
									id: "child",
									items: "grandchild",
								}),
						}),
					],
				],
		});