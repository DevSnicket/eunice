/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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