// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../stackAndYamlTesting/createItemYaml"),
	createStackFromLevels = require("../../../stackAndYamlTesting/createStackFromLevels"),
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