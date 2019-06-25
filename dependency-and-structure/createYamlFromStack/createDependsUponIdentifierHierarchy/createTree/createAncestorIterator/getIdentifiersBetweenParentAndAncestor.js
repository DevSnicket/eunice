/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	({
		ancestor,
		item,
	}) =>
		withBaseAncestor(ancestor)
		.getAncestorIdentifiersOfParent(item);

function withBaseAncestor(
	baseAncestor,
) {
	return { getAncestorIdentifiersOfParent };

	function getAncestorIdentifiersOfParent(
		item,
	) {
		return getAncestorIdentifiers(item.level.stack.parent);
	}

	function * getAncestorIdentifiers(
		parent,
	) {
		yield parent.id;

		if (parent !== baseAncestor)
			for (const identifier of getAncestorIdentifiersOfParent(parent))
				yield identifier;
	}
}