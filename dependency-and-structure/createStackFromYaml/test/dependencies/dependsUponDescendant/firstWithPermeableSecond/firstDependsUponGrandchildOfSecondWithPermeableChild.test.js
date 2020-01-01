/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../../../testCreateStackFromYaml");

testCreateStackFromYaml({
	stack:
		createStack(),
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
							dependencyPermeable: true,
							id: "child",
							items: "grandchild",
						}),
				}),
			],
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{
						dependencyPermeable: true,
						id: "second",
						items:
							[
								[
									{
										dependencyPermeable: true,
										id: "child",
										items: [ [ { id: "grandchild" } ] ],
									},
								],
							],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const items = stack[0];

		const grandchild = items[1].items[0][0].items[0][0];

		items[0].dependsUpon =
			[ {
				item: grandchild,
				itemOrFirstAncestorItem: grandchild,
			} ];

		grandchild.dependents = [ items[0] ];
	}
}