// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import combineCustomProperties from "./combineCustomProperties";
import combineDependsUpon from "./combineDependsUpon";
import combineItems from "./combineItems";
import groupBy from "lodash/groupBy";

export default
items =>
	combineItemsGroupedByType(
		groupBy(
			items,
			({ type }) => type,
		),
	);

function combineItemsGroupedByType({
	file: files,
	directory: directories,
	...unexpectedTypeGroups
}) {
	throwWhenAnyUnexpectedTypes(
		Object.keys(unexpectedTypeGroups),
	);

	return (
		{
			...combineCustomProperties([
				...directories,
				...files,
			]),
			...combineDependsUpon([
				...files,
				...directories,
			]),
			...combineItems({
				directories,
				files,
			}),
		}
	);
}

function throwWhenAnyUnexpectedTypes(
	types,
) {
	if (types.length)
		throw Error(`Unexpected types of ${formatTypes()}.`);

	function formatTypes() {
		return (
			types
			.map(type => `"${type}"`)
			.join(", ")
		);
	}
}