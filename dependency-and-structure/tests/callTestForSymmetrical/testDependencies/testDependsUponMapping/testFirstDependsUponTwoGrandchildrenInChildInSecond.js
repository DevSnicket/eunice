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
				"first depends upon two grandchildren in child in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"second",
								items:
									{
										id: "childOfSecond",
										items: [ "firstGrandchildOfSecond", "secondGrandchildOfSecond" ],
									},
							},
						id:
							"first",
					}),
					createItemYaml({
						id:
							"second",
						items:
							createItemYaml({
								id: "childOfSecond",
								items: [ "firstGrandchildOfSecond", "secondGrandchildOfSecond" ],
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
						id: "second",
						items:
							[ [
								{
									id: "childOfSecond",
									items:
										[ [
											{ id: "firstGrandchildOfSecond" },
											{ id: "secondGrandchildOfSecond" },
										] ],
								},
							] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const childOfSecond = second.items[0][0];

		const
			[
				firstGrandchildOfSecond,
				secondGrandchildOfSecond,
			]
			=
			childOfSecond.items[0];

		first.dependsUpon =
			[
				{
					ancestors: [ childOfSecond, second ],
					item: firstGrandchildOfSecond,
					itemOrFirstAncestorItem: firstGrandchildOfSecond,
				},
				{
					ancestors: [ childOfSecond, second ],
					item: secondGrandchildOfSecond,
					itemOrFirstAncestorItem: secondGrandchildOfSecond,
				},
			];
		firstGrandchildOfSecond.dependents = [ first ];
		secondGrandchildOfSecond.dependents = [ first ];
	}
}