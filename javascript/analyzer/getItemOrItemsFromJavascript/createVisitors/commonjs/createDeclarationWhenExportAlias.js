// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getIdentifierAndTypeWhenExport = require("./getIdentifierAndTypeWhenExport"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors");

module.exports =
	({
		ancestors,
		assignmentExpression,
	}) => {
		const declaration =
			createDeclarationWhenAssignmentExpressionOfExport(
				assignmentExpression,
			);

		return (
			declaration
			&&
			!findBlockOrIdentifiableParent(ancestors)
			&&
			declaration
		);
	};

function createDeclarationWhenAssignmentExpressionOfExport({
	left,
	right,
}) {
	const alias = getNameWhenIdentifier(right);

	return (
		alias
		&&
		createDeclaration({
			alias,
			...getIdentifierAndTypeWhenExport({
				assignmentExpressionLeft: left,
				defaultIdentifier: alias,
			}),
		})
	);
}

function getNameWhenIdentifier(
	node,
) {
	return (
		node.type === "Identifier"
		&&
		node.name
	);
}

function createDeclaration({
	alias,
	identifier,
	type,
}) {
	return (
		identifier
		&&
		{
			dependsUpon: alias,
			id: identifier,
			isPeerFunctionRequired: true,
			type,
		}
	);
}