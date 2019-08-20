/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
				isIdentifiableType(current.type),
		}
	);

	function getFunctionExpressionAndIsBlock() {
		return (
			previous
			&&
			isFunctionExpressionType(previous.type)
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

function isFunctionExpressionType(
	type,
) {
	return (
		type === "ArrowFunctionExpression"
		||
		type === "FunctionExpression"
	);
}

function isIdentifiableType(
	type,
) {
	return (
		type === "AssignmentExpression"
		||
		type === "ExportDefaultDeclaration"
		||
		type === "MethodDefinition"
		||
		type === "VariableDeclarator"
	);
}