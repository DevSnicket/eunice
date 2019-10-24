// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getIdentifierAndTypeFromAssignmentLeftWhenExport = require("./getIdentifierAndTypeFromAssignmentLeftWhenExport"),
	hasTypeOfFunction = require("../hasTypeOfFunction");

module.exports =
	({
		left,
		right,
	}) =>
		!hasTypeOfFunction(right)
		&&
		createDeclaration({
			alias: getNameWhenIdentifier(right),
			...getIdentifierAndTypeFromAssignmentLeftWhenExport(left),
		});

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
		{
			dependsUpon: alias,
			id: identifier,
			isPeerFunctionRequired: true,
			type,
		}
	);
}