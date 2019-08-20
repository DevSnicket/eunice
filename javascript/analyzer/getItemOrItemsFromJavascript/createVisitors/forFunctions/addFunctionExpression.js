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
				findParentAndAdd({
					identifier: null,
					type: "export",
				});
				break;
			case "MethodDefinition":
				addMethod();
				break;
			case "VariableDeclarator":
				addVariableDeclarator();
				break;
			default:
				addWhenBlock();
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

		function addWhenBlock() {
			if (functionExpression.body.type === "BlockStatement")
				findParentAndAdd({
					identifier:
						functionExpression.id
						&&
						functionExpression.id.name,
					type:
						null,
				});
		}

		function addVariableDeclarator() {
			findParentAndAdd({
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

		function findParentAndAdd({
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

		function addMethod() {
			if (parent.kind !== "constructor")
				addDeclarationIn({
					declaration:
						createDeclarationForFunction({
							functionDeclarationOrExpression:
								functionExpression,
							identifier:
								parent.key.name,
							type:
								"method",
						}),
					parent:
						getClass(),
				});

			function getClass() {
				return ancestors[ancestors.length - 4];
			}
		}
	};