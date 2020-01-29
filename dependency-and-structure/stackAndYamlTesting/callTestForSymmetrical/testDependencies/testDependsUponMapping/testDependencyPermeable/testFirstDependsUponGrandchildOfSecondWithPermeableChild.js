// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../../createItemYaml"),
	createStackFromLevels = require("../../../../createStackFromLevels");

module.exports =
	/** @type {import("../../../Parameter.d")} */
	({
		getActual,
		getExpected,
		getName,
	}) => {
		const
			stack =
				createStack(),
			yaml =
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
				];

		test(
			getName({
				stackDescription:
					"first depends upon grandchild of second with permeable child",
				yaml,
			}),
			() =>
				expect(
					getActual({ stack, yaml }),
				)
				.toEqual(
					getExpected({ stack, yaml }),
				),
		);
	};

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