// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		ancestors,
		isIdentifiableAssignmentExpressionLeft,
	}) => {
		let child = null;

		for (let index = ancestors.length - 2; index; index--) {
			const parent = ancestors[index];

			if (isChildIdentifiableByParent(parent))
				return child;
			else if (isSelfIdentifiableType(parent.type))
				return parent;

			child = parent;
		}

		return null;

		function isChildIdentifiableByParent(
			parent,
		) {
			return (
				withIsIdentifiableAssignmentExpressionLeft(
					isIdentifiableAssignmentExpressionLeft,
				)
				.isChildIdentifiableByParent({
					child,
					parent,
				})
			);
		}
	};

function isSelfIdentifiableType(
	type,
) {
	return (
		[
			"ClassProperty",
			"FunctionDeclaration",
		]
		.includes(type)
	);
}

function withIsIdentifiableAssignmentExpressionLeft(
	isIdentifiableAssignmentExpressionLeft,
) {
	return { isChildIdentifiableByParent };

	function isChildIdentifiableByParent({
		child,
		parent,
	}) {
		return (
			child
			&&
			isFunctionExpressionType(child.type)
			&&
			(child.body.type === "BlockStatement" || isIdentifiableParent(parent))
		);
	}

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
				isIdentifiableAssignmentExpressionLeft(left)
			);
		}
	}
}

function isFunctionExpressionType(
	type,
) {
	return (
		[
			"ArrowFunctionExpression",
			"FunctionExpression",
		]
		.includes(
			type,
		)
	);
}