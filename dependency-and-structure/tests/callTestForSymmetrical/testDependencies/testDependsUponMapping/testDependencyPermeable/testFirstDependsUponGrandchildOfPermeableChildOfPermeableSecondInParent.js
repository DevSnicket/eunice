/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../../createItemYaml"),
	createStackFromLevels = require("../../../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon grandchild of permeable child of permeable second in parent",
			yaml:
				createItemYaml({
					id:
						"parent",
					items:
						[
							createItemYaml({
								dependsUpon:
									{
										id: "parent",
										items: "grandchild",
									},
								id:
									"first",
							}),
							createItemYaml({
								dependencyPermeable:
									true,
								id:
									"second",
								items:
									{
										dependencyPermeable: true,
										id: "child",
										items: "grandchild",
									},
							}),
						],
				}),
		});

function createStack() {
	const stack =
		createStackFromLevels(
			[ [ {
				id:
					"parent",
				items:
					[ [
						{ id: "first" },
						{
							dependencyPermeable:
								true,
							id:
								"second",
							items:
								[ [ {
									dependencyPermeable: true,
									id: "child",
									items: [ [ { id: "grandchild" } ] ],
								} ] ],
						},
					] ],
			} ] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const parent = stack[0][0];

		const items = parent.items[0];

		const child = items[1].items[0][0];

		const grandchild = child.items[0][0];

		items[0].dependsUpon =
			[ {
				ancestors: [ parent ],
				item: grandchild,
				itemOrFirstAncestorItem: grandchild,
			} ];

		grandchild.dependents = [ items[0] ];

		return stack;
	}
}