// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		ancestors,
		findBlockOrIdentifiableParentInAncestors,
		functionExpression,
		parent,
	}) =>
		parent.type !== "MethodDefinition"
		&&
		functionExpression.body.type === "BlockStatement"
		&&
		{
			identifier:
				getIdentifierFromFunctionExpression(
					functionExpression,
				),
			parent:
				findBlockOrIdentifiableParentInAncestors(
					ancestors,
				),
		};

function getIdentifierFromFunctionExpression(
	functionExpression,
) {
	return (
		functionExpression.id
		&&
		functionExpression.id.name
	);
}