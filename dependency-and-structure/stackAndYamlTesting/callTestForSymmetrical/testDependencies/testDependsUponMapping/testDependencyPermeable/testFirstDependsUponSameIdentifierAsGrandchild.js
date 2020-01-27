// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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
								dependsUpon: [ { item: "grandchildOfSecond" } ],
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
												id: "childOfSecond",
												items: [ [ { id: "grandchildOfSecond" } ] ],
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
						dependsUpon: "grandchildOfSecond",
						id: "first",
					}),
					createItemYaml({
						dependencyPermeable:
							true,
						id:
							"second",
						items:
							createItemYaml({
								id: "childOfSecond",
								items: "grandchildOfSecond",
							}),
					}),
				],
		});