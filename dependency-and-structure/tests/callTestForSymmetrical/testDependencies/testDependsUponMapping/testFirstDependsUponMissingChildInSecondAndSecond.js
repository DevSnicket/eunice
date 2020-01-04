/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon missing child in second and second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							[
								"second",
								{
									id: "second",
									items: "missingChild",
								},
							],
						id:
							"first",
					}),
					"second",
				],
		});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{ id: "second" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		first.dependsUpon =
			[
				{
					item: second,
					itemOrFirstAncestorItem: second,
				},
				{
					ancestors: [ second ],
					item: "missingChild",
					itemOrFirstAncestorItem: second,
				},
			];

		second.dependents = [ first ];
	}
}