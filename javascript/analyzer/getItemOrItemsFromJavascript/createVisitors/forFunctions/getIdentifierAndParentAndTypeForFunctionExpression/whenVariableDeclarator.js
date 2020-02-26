// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	ancestors,
	findBlockOrIdentifiableParentInAncestors,
	parent,
}) =>
	parent.type === "VariableDeclarator"
	&&
	{
		identifier:
			parent.id.name,
		parent:
			findBlockOrIdentifiableParentInAncestors(ancestors),
	};