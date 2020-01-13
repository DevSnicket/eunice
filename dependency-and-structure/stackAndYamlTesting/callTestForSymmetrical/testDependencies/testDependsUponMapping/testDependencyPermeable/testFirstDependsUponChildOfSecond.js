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
				"first depends upon child of second",
			yaml:
				[
					createItemYaml({
						dependsUpon: "childOfSecond",
						id: "first",
					}),
					createItemYaml({
						dependencyPermeable: true,
						id: "second",
						items: "childOfSecond",
					}),
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
						items: [ [ { id: "childOfSecond" } ] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const child = second.items[0][0];

		first.dependsUpon =
			[ {
				item: child,
				itemOrFirstAncestorItem: child,
			} ];

		child.dependents = [ first ];
	}
}