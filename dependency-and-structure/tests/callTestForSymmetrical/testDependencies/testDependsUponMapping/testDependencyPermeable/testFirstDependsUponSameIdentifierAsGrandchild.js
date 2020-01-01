/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../createItemYaml"),
	createStackFromLevels = require("../../../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStackFromLevels(
					[
						[
							{
								dependsUpon: [ { item: "grandchild" } ],
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
		});