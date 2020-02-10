// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

/**
  * @typedef Stack
  * @property {Item} [parent]
  *
  * @typedef Item
  * @property {Level} level
  * @property {Stack} [items]
  *
  * @typedef Level
  * @property {Items & Stack} stack
  *
  * @typedef Items
  * @property {function(Level):Number} indexOf
 */

import generateAncestors from "./generateAncestors";
import getDirectionBetweenItemsWhenMutualStack from "./getDirectionBetweenItemsWhenMutualStack";

export default
/**
 * @param {Object} parameter
 * @param {Item} parameter.from
 * @param {Item} parameter.to
 * @returns {{direction: "above"|"below"|"same"|"self", stack: Stack}}
 */
({
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

	/* istanbul ignore next: error is only thrown when there is gap in the implementation */
	throw Error("Could not find direction between items in first mutual stack.");
}