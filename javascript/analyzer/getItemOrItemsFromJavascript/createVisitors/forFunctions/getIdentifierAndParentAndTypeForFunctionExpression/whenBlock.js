// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { findBlockOrIdentifiableParent } = require("../../parentFunctionsFromAncestors");

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
				findBlockOrIdentifiableParent(
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