/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
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