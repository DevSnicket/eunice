// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

module.exports =
	nodes =>
		nodes.flatMap(
			node =>
				getNamesWhenExport(node)
				||
				[],
		);

function getNamesWhenExport({
	declaration,
	specifiers,
	type,
}) {
	return (
		type === "ExportNamedDeclaration"
		&&
		(whenHasDeclaration() || whenHasSpecifiers())
	);

	function whenHasDeclaration() {
		return declaration && getNamesFromDeclaration(declaration);
	}

	function whenHasSpecifiers() {
		return (
			specifiers
			&&
			specifiers.map(({ exported }) => exported.name)
		);
	}
}

function getNamesFromDeclaration({
	declarations,
	id,
	type,
}) {
	return whenVariable() || whenHasIdentifier();

	function whenVariable() {
		return (
			type === "VariableDeclaration"
			&&
			declarations.flatMap(getNamesFromVariableDeclaration)
		);
	}

	function whenHasIdentifier() {
		return id && id.name;
	}
}

function getNamesFromVariableDeclaration(
	{ id: { name, properties } },
) {
	return (
		(name && [ name ])
		||
		whenHasProperties()
	);

	function whenHasProperties() {
		return (
			properties
			&&
			properties.map(({ key }) => key.name)
		);
	}
}