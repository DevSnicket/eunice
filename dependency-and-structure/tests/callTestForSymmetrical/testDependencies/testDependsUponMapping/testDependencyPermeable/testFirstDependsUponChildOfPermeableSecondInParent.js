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
				"first depends upon child of permeable second in parent",
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
										items: "childOfSecond",
									},
								id:
									"first",
							}),
							createItemYaml({
								dependencyPermeable: true,
								id: "second",
								items: "childOfSecond",
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
							dependencyPermeable: true,
							id: "second",
							items: [ [ { id: "childOfSecond" } ] ],
						},
					] ],
			} ] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const parent = stack[0][0];

		const [ first, second ] = parent.items[0];

		const child = second.items[0][0];

		first.dependsUpon =
			[ {
				ancestors: [ parent ],
				item: child,
				itemOrFirstAncestorItem: child,
			} ];

		child.dependents = [ first ];

		return stack;
	}
}