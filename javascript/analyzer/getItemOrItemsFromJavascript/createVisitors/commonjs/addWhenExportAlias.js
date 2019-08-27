// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getIdentifierWhenExport = require("./getIdentifierWhenExport"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors");

module.exports =
	({
		addDeclarationIn,
		ancestors,
		assignmentExpression,
	}) => {
		addDeclarationWhenFile(
			createDeclarationWhenAssignmentExpressionOfExport(
				assignmentExpression,
			),
		);

		function addDeclarationWhenFile(
			declaration,
		) {
			if (declaration && !findBlockOrIdentifiableParent(ancestors))
				addDeclarationIn({
					declaration,
					parent: null,
				});
		}
	};

function createDeclarationWhenAssignmentExpressionOfExport({
	left,
	right,
}) {
	const alias = getNameWhenIdentifier(right);

	return (
		alias
		&&
		createDeclarationWhenAlias({
			alias,
			identifier:
				getIdentifierWhenExport({
					assignmentExpressionLeft: left,
					defaultIdentifier: null,
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

function createDeclarationWhenAlias({
	alias,
	identifier,
}) {
	return (
		identifier
		&&
		alias !== identifier
		&&
		{
			dependsUpon: alias,
			id: identifier,
			isPeerFunctionRequired: true,
		}
	);
}