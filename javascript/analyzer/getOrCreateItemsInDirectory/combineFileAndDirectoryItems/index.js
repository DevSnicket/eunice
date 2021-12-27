// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import combineItemsByType from "./combineItemsByType";
import getWhenSingle from "../getWhenSingle";
import groupBy from "lodash/groupBy";

export default
items =>
	Object.entries(
		groupBy(
			items,
			item => item.id,
		),
	)
	.flatMap(combineItemsGroupedByIdentifier);

function combineItemsGroupedByIdentifier([
	id,
	items,
]) {
	return getWhenSingle(items) || combine();

	function combine() {
		return (
			{
				id,
				...combineItemsByType(items),
			}
		);
	}
}