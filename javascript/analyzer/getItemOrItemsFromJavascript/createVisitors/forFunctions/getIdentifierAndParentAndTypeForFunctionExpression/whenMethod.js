// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		ancestors,
		parent,
	}) =>
		parent.kind !== "constructor"
		&&
		parent.type === "MethodDefinition"
		&&
		{
			identifier:
				parent.key.name,
			parent:
				getClassInAncestors(ancestors),
			type:
				"method",
		};

function getClassInAncestors(
	ancestors,
) {
	return ancestors[ancestors.length - 4];
}