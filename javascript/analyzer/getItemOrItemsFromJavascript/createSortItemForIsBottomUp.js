// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { groupBy } = require("lodash");

module.exports =
	isBottomUp =>
		isBottomUp
		?
		reverseItems
		:
		sortItemsWithVariablesThenParametersAtBottom;

function sortItemsWithVariablesThenParametersAtBottom(
	items,
) {
	return (
		items
		&&
		items.length
		&&
		sortItemsFromTypeGroups(
			groupBy(items, getRelevantTypeOf),
		)
	);

	function getRelevantTypeOf(
		{ type },
	) {
		return whenSpecified() || "other";

		function whenSpecified() {
			return (
				[ "parameter", "variable" ].includes(type)
				&&
				type
			);
		}
	}

	function sortItemsFromTypeGroups({
		other,
		parameter,
		variable,
	}) {
		return (
			[
				...other,
				...variable || [],
				...parameter || [],
			]
		);
	}
}

function reverseItems(
	items,
) {
	return items && items.reverse();
}