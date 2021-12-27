// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	ancestors,
	parent,
}) =>
	parent.type === "VariableDeclarator"
	&&
	getVariableDeclaratorParentType(ancestors) === "ExportNamedDeclaration"
	&&
	{
		identifier: parent.id.name,
		parent: null,
		type: "export",
	};

function getVariableDeclaratorParentType(
	ancestors,
) {
	return ancestors[ancestors.length - 4].type;
}