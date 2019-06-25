/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const getIdentifierPropertyOrValue = require("../getIdentifierPropertyOrValue");

module.exports =
	({
		baseAncestor,
		item,
	}) =>
		withBaseAncestor(baseAncestor)
		.createWithAncestors({
			ancestor: item.level.stack.parent,
			items: getIdentifierPropertyOrValue(item),
		});

function withBaseAncestor(
	baseAncestor,
) {
	return { createWithAncestors };

	function createWithAncestors({
		ancestor,
		items,
	}) {
		const dependsUpon =
			{
				id: getIdentifierPropertyOrValue(ancestor),
				items,
			};

		return (
			ancestor === baseAncestor
			?
			dependsUpon
			:
			createWithAncestors({
				ancestor: ancestor.level.stack.parent,
				items: dependsUpon,
			})
		);
	}
}