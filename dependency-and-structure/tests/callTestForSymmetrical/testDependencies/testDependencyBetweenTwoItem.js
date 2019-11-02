/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createFirstAndSecondLevel = require("../createFirstAndSecondLevel"),
	createItemYaml = require("../../createItemYaml"),
	createStackFromLevels = require("../../createStackFromLevels");

module.exports =
	test =>
		[
			createFirstDependsUponSecondTestCase(),
			createSecondDependsUponFirstTestCase(),
		]
		.forEach(
			test,
		);

function createFirstDependsUponSecondTestCase() {
	return (
		{
			stack:
				createStack(),
			stackDescription:
				"first depends upon second",
			yaml:
				[
					createItemYaml({
						dependsUpon: "second",
						id: "first",
					}),
					"second",
				],
		}
	);

	function createStack() {
		const { first, second, stack } = createStackAndGetFirstAndSecond();

		first.dependsUpon =
			[ {
				item: second,
				itemOrFirstAncestorItem: second,
			} ];
		second.dependents =
			[ first ];

		return stack;
	}
}

function createSecondDependsUponFirstTestCase() {
	return (
		{
			stack:
				createStack(),
			stackDescription:
				"second depends upon first",
			yaml:
				[
					"first",
					createItemYaml({
						dependsUpon: "first",
						id: "second",
					}),
				],
		}
	);

	function createStack() {
		const { first, second, stack } = createStackAndGetFirstAndSecond();

		second.dependsUpon =
			[ {
				item: first,
				itemOrFirstAncestorItem: first,
			} ];
		first.dependents =
			[ second ];

		return stack;
	}
}

function createStackAndGetFirstAndSecond() {
	const stack = createStackFromLevels([ createFirstAndSecondLevel() ]);

	const level = stack[0];

	return (
		{
			first: level[0],
			second: level[1],
			stack,
		}
	);
}