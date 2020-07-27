// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import generateAncestors from "./generateAncestors";
import getDirectionBetweenItemsWhenMutualStack from "./getDirectionBetweenItemsWhenMutualStack";

export default
(/** @type {import("./Parameter.d")} */{
	from,
	to,
}) =>
	getDirectionBetweenItemsWhenMutualStack({
		from,
		to,
	})
	||
	getDirectionBetweenFirstAncestorOrThrowError(
		generateAncestors(
			[
				{
					from,
					to,
				},
			],
		),
	);

function getDirectionBetweenFirstAncestorOrThrowError(
	ancestors,
) {
	for (const ancestor of ancestors) {
		const direction = getDirectionBetweenItemsWhenMutualStack(ancestor);

		if (direction)
			return direction;
	}

	throw Error("Could not find direction between items in first mutual stack.");
}