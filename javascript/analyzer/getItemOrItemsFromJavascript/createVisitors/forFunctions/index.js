// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDeclarationForFunction = require("./createDeclarationForFunction"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors"),
	getIdentifierAndParentAndTypeForFunctionExpression = require("./getIdentifierAndParentAndTypeForFunctionExpression"),
	getIdentifierAndParentAndTypeForFunctionExpressionParentWhenCommonjsExport = require("../commonjs/getIdentifierAndParentAndTypeForFunctionExpressionParentWhenExport"),
	getIdentifierAndParentAndTypeForFunctionExpressionWhenModuleExport = require("../forModules/getIdentifierAndParentAndTypeForFunctionExpressionWhenExport"),
	getParentFromAncestors = require("../getParentFromAncestors"),
	getTypeWhenModuleExportDeclarationType = require("../forModules/getTypeWhenExportDeclarationType");

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
							getTypeWhenModuleExportDeclarationType(
								getParentFromAncestors(
									ancestors,
								).type,
							),
					}),
				parent:
					findBlockOrIdentifiableParent(ancestors),
			});
		}

		function visitFunctionExpression(
			functionExpression,
			ancestors,
		) {
			addIdentifierAndParentAndType(
				getIdentifierAndParentAndType(),
			);

			function getIdentifierAndParentAndType() {
				// Most getIdentifierAndParentAndTypeForFunctionExpression functions need the parent.
				const parent = getParentFromAncestors(ancestors);

				return (
					getIdentifierAndParentAndTypeForFunctionExpressionParentWhenCommonjsExport(
						parent,
					)
					||
					getIdentifierAndParentAndTypeForFunctionExpressionWhenModuleExport({
						ancestors,
						parent,
					})
					||
					getIdentifierAndParentAndTypeForFunctionExpression({
						ancestors,
						functionExpression,
						parent,
					})
				);
			}

			function addIdentifierAndParentAndType(
				identifierAndParentAndType,
			) {
				if (identifierAndParentAndType)
					declarations.addDeclarationIn({
						declaration:
							createDeclarationForFunctionWithDependsUponAndItems({
								functionDeclarationOrExpression:
									functionExpression,
								identifier:
									identifierAndParentAndType.identifier,
								type:
									identifierAndParentAndType.type,
							}),
						parent:
							identifierAndParentAndType.parent || null,
					});
			}
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