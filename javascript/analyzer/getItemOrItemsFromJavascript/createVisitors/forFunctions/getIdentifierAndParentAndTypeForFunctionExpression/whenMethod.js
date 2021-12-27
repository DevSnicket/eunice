// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	ancestors,
	parent: { key, type },
}) =>
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