// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getIdentifierFromAssignmentExpressionLeft = require("./getIdentifierFromAssignmentExpressionLeft"),
	isCommonjsModuleExportProperty = require("./commonjs/isModuleExportProperty");

module.exports =
	ancestors => {
		let child = null;

		for (let index = ancestors.length - 2; index; index--) {
			const parent = ancestors[index];

			if (isChildIdentifiableByParent({ child, parent }))
				return child;
			else if (selfIdentifiableTypes.includes(parent.type))
				return parent;

			child = parent;
		}

		return null;
	};

const selfIdentifiableTypes = [ "ClassProperty", "FunctionDeclaration" ];

function isChildIdentifiableByParent({
	child,
	parent,
}) {
	return (
		child
		&&
		functionExpressionTypes.includes(child.type)
		&&
		(child.body.type === "BlockStatement" || isIdentifiableParent(parent))
	);
}

const
	functionExpressionTypes =
		[
			"ArrowFunctionExpression",
			"FunctionExpression",
		];

function isIdentifiableParent({
	left,
	type,
}) {
	return (
		[
			"ClassProperty",
			"ExportDefaultDeclaration",
			"MethodDefinition",
			"VariableDeclarator",
		]
		.includes(type)
		||
		whenIdentifiableAssignment()
	);

	function whenIdentifiableAssignment() {
		return (
			type === "AssignmentExpression"
			&&
			isLeftIdentifiable()
		);

		function isLeftIdentifiable() {
			return (
				getIdentifierFromAssignmentExpressionLeft(left)
				||
				isCommonjsModuleExportProperty(left)
			);
		}
	}
}