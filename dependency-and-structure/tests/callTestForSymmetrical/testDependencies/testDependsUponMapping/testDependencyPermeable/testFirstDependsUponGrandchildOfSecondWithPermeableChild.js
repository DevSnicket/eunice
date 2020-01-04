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
				"first depends upon grandchild of second with permeable child",
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
								dependencyPermeable: true,
								id: "childOfSecond",
								items: "grandchildOfSecond",
							}),
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
						items:
							[
								[
									{
										dependencyPermeable: true,
										id: "childOfSecond",
										items: [ [ { id: "grandchildOfSecond" } ] ],
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
		const [ first, second ] = stack[0];

		const grandchild = second.items[0][0].items[0][0];

		first.dependsUpon =
			[ {
				item: grandchild,
				itemOrFirstAncestorItem: grandchild,
			} ];

		grandchild.dependents = [ first ];
	}
}