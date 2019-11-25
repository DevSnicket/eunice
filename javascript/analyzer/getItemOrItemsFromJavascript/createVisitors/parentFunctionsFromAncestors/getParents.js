// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	function * getParents(
		ancestors,
	) {
		let previous = null;

		for (let index = ancestors.length - 2; index; index--) {
			const current = ancestors[index];

			yield getParentFromCurrentAndPrevious({ current, previous });

			previous = current;
		}
	};

function getParentFromCurrentAndPrevious({
	current,
	previous,
}) {
	return (
		{
			functionDeclaration:
				current.type === "FunctionDeclaration"
				&&
				current,
			...getFunctionExpressionAndIsBlock(),
			isIdentifiable:
				identifiableTypes.includes(current.type),
		}
	);

	function getFunctionExpressionAndIsBlock() {
		return (
			previous
			&&
			functionExpressionTypes.includes(previous.type)
			&&
			{
				functionExpression:
					previous,
				isBlock:
					previous.body.type === "BlockStatement",
			}
		);
	}
}

const
	functionExpressionTypes =
		[
			"ArrowFunctionExpression",
			"FunctionExpression",
		],
	identifiableTypes =
		[
			"AssignmentExpression",
			"ClassProperty",
			"ExportDefaultDeclaration",
			"MethodDefinition",
			"VariableDeclarator",
		];