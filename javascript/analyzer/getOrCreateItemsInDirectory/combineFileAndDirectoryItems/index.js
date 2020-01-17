// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const
	combineItemsByType = require("./combineItemsByType"),
	getWhenSingle = require("../getWhenSingle"),
	{ groupBy } = require("lodash");

module.exports =
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