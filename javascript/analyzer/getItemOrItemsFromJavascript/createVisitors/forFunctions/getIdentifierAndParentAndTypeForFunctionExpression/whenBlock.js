// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const findBlockOrIdentifiableParentInAncestors = require("../../findBlockOrIdentifiableParentInAncestors");

module.exports =
	({
		ancestors,
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