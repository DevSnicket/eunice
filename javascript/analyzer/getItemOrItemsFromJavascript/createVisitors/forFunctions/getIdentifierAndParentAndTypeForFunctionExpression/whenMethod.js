// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		ancestors,
		parent: { key, kind, type },
	}) =>
		kind !== "constructor"
		&&
		[ "ClassProperty", "MethodDefinition" ].includes(type)
		&&
		{
			identifier:
				key.name,
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