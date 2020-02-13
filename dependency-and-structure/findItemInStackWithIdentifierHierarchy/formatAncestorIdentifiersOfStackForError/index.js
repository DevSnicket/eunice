// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
/** @type {import("./Parameter.d")} */
stack =>
	ofItemWhenHasValue(stack.parent)
	||
	"";

/** @param {import("./Parameter.d").Item} item */
function ofItemWhenHasValue(
	item,
) {
	return (
		item
		&&
		` in hierarchy ${formatHierarchy()}`
	);

	function formatHierarchy() {
		return (
			joinIdentifiers(
				getIdentifiersOfItemAndAncestors(
					item,
				),
			)
		);
	}
}

/** @param {import("./Parameter.d").Item} item */
function * getIdentifiersOfItemAndAncestors(
	item,
) {
	yield `"${item.id}"`;

	if (item.level.stack.parent)
		for (const ancestor of getIdentifiersOfItemAndAncestors(item.level.stack.parent))
			yield ancestor;
}

function joinIdentifiers(
	identifiers,
) {
	return (
		[ ...identifiers ]
		.reverse()
		.join("->")
	);
}