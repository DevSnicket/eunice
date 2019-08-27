// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	addFunctionExpression = require("./addFunctionExpression"),
	createDeclarationForFunction = require("./createDeclarationForFunction"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors"),
	getParentFromAncestors = require("../getParentFromAncestors");

module.exports =
	({
		createDependsUponPropertyForParent,
		declarations,
		hasUndeclaredReferenceTo,
	}) => {
		return (
			{
				ArrowFunctionExpression: visitFunctionExpression,
				FunctionDeclaration: visitFunctionDeclaration,
				FunctionExpression: visitFunctionExpression,
			}
		);

		function visitFunctionDeclaration(
			functionDeclaration,
			ancestors,
		) {
			declarations.addDeclarationIn({
				declaration:
					createDeclarationForFunctionWithDependsUponAndItems({
						functionDeclarationOrExpression:
							functionDeclaration,
						identifier:
							functionDeclaration.id
							&&
							functionDeclaration.id.name,
						type:
							isExport() && "export",
					}),
				parent:
					findBlockOrIdentifiableParent(ancestors),
			});

			function isExport() {
				const parentType = getParentFromAncestors(ancestors).type;

				return (
					parentType === "ExportDefaultDeclaration"
					||
					parentType === "ExportNamedDeclaration"
				);
			}
		}

		function visitFunctionExpression(
			functionExpression,
			ancestors,
		) {
			addFunctionExpression({
				addDeclarationIn:
					declarations.addDeclarationIn,
				ancestors,
				createDeclarationForFunction:
					createDeclarationForFunctionWithDependsUponAndItems,
				findParentFunctionFromAncestors:
					findBlockOrIdentifiableParent,
				functionExpression,
			});
		}

		function createDeclarationForFunctionWithDependsUponAndItems({
			functionDeclarationOrExpression,
			identifier,
			type,
		}) {
			return (
				createDeclarationForFunction({
					dependsUponProperty:
						createDependsUponPropertyForParent(
							{ parent: functionDeclarationOrExpression },
						),
					functionDeclarationOrExpression,
					hasUndeclaredReferenceTo,
					identifier,
					items:
						declarations.createItemsForAndRemoveDeclarationsIn(
							functionDeclarationOrExpression,
						),
					type,
				})
			);
		}
	};