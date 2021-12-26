// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import generateAncestorPairs from "./generateAncestorPairs";
import getDirectionBetweenItemsWhenMutualStack from "./getDirectionBetweenItemsWhenMutualStack";

export default
(/** @type {import("./Parameter.d")} */{
	from,
	to,
}) =>
	getDirectionBetweenFirstAncestorOrThrowError(
		generateAncestorPairs({
			from,
			to,
		}),
	);

function getDirectionBetweenFirstAncestorOrThrowError(
	ancestorPairs,
) {
	for (const ancestorPair of ancestorPairs) {
		const directionAndMutualStack = getDirectionBetweenItemsWhenMutualStack(ancestorPair);

		if (directionAndMutualStack)
			return directionAndMutualStack;
	}

	throw Error("Could not find direction between items in first mutual stack.");
}