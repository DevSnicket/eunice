/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	getIdentifierWhenCommonjsExport = require("../commonjs/getIdentifierWhenExport"),
	getParentFromAncestors = require("../getParentFromAncestors");

module.exports =
	({
		addDeclarationIn,
		ancestors,
		createDeclarationForFunction,
		findParentFunctionFromAncestors,
		functionExpression,
	}) => {
		const parent = getParentFromAncestors(ancestors);

		switch (parent.type) {
			case "AssignmentExpression":
				addAssignment();
				break;
			case "ExportDefaultDeclaration":
				addVariable({
					identifier: null,
					type: "export",
				});
				break;
			case "VariableDeclarator":
				addVariableDeclarator();
				break;
			default:
		}

		function addAssignment() {
			addDeclarationIn({
				declaration:
					createDeclarationForFunction({
						functionDeclarationOrExpression:
							functionExpression,
						identifier:
							getIdentifier(),
						type:
							null,
					}),
				parent:
					null,
			});

			function getIdentifier() {
				return (
					getIdentifierWhenCommonjsExport({
						assignmentExpressionLeft: parent.left,
						defaultIdentifier: functionExpression.id,
					})
					||
					parent.left.name
				);
			}
		}

		function addVariableDeclarator() {
			addVariable({
				identifier:
					parent.id.name,
				type:
					getTypeWhenExport(),
			});

			function getTypeWhenExport() {
				return (
					getParentType() === "ExportNamedDeclaration"
					&&
					"export"
				);

				function getParentType() {
					return ancestors[ancestors.length - 4].type;
				}
			}
		}

		function addVariable({
			identifier,
			type,
		}) {
			addDeclarationIn({
				declaration:
					createDeclarationForFunction({
						functionDeclarationOrExpression:
							functionExpression,
						identifier,
						type,
					}),
				parent:
					findParentFunctionFromAncestors(
						ancestors,
					),
			});
		}
	};