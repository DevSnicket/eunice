// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../../createItemYaml";
import createStackFromLevels from "../../../../createStackFromLevels";

export default
/** @type {import("../../../Parameter.d")} */
({
	getActual,
	getExpected,
	getName,
}) => {
	const
		stack =
			createStackFromLevels(
				[
					[
						{
							dependsUpon: [ { item: "grandchildOfSecond" } ],
							id: "first",
						},
						{
							dependencyPermeable:
								true,
							id:
								"second",
							items:
								[
									[
										{
											id: "childOfSecond",
											items: [ [ { id: "grandchildOfSecond" } ] ],
										},
									],
								],
						},
					],
				],
			),
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
							id: "childOfSecond",
							items: "grandchildOfSecond",
						}),
				}),
			];

	test(
		getName({
			stackDescription:
				"first depends upon same identifier as grandchild",
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