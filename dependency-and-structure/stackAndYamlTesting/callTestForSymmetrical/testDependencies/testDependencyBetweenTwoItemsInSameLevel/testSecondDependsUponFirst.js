// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createItemYaml from "../../../createItemYaml";
import createStackAndGetFirstAndSecond from "./createStackAndGetFirstAndSecond";

export default
/** @type {import("../../Parameter.d")} */
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
				"first",
				createItemYaml({
					dependsUpon: "first",
					id: "second",
				}),
			];

	test(
		getName({
			stackDescription:
				"second depends upon first",
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
	const { first, second, stack } = createStackAndGetFirstAndSecond();

	second.dependsUpon =
		[ {
			item: first,
			itemOrFirstAncestorItem: first,
		} ];

	first.dependents =
		[ { item: second } ];

	return stack;
}