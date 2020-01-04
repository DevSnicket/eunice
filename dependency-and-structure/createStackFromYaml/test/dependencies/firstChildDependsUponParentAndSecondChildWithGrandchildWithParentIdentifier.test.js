/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../tests/createItemYaml"),
	createStackFromLevels = require("../../../tests/createStackFromLevels"),
	testCreateStackFromYaml = require("../testCreateStackFromYaml");

const parentIdentifier = "parent";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		{
			id:
				parentIdentifier,
			items:
				[
					createItemYaml({
						dependsUpon: parentIdentifier,
						id: "firstChild",
					}),
					createItemYaml({
						id: "secondChild",
						items: parentIdentifier,
					}),
				],
		},
});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{
						id: parentIdentifier,
						items:
							[
								[
									{ id: "firstChild" },
									{
										id: "secondChild",
										items: [ [ { id: parentIdentifier } ] ],
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
		const parent = stack[0][0];

		const firstChild = parent.items[0][0];

		firstChild.dependsUpon =
			[ {
				item: parent,
				itemOrFirstAncestorItem: parent,
			} ];

		parent.dependents = [ firstChild ];
	}
}