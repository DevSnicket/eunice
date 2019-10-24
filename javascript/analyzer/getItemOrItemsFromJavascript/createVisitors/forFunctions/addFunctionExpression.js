// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getIdentifierAndTypeFromAssignmentLeftWhenExport = require("../commonjs/getIdentifierAndTypeFromAssignmentLeftWhenExport"),
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
						...getIdentifierAndType(),
					}),
				parent:
					null,
			});

			function getIdentifierAndType() {
				return (
					getIdentifierAndTypeFromAssignmentLeftWhenExport(parent.left)
					||
					{ identifier: parent.left.name }
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