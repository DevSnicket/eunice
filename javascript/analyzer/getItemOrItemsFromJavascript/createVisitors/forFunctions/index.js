// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDeclarationForFunction from "./createDeclarationForFunction";
import getIdentifierAndParentAndTypeForFunctionExpression from "./getIdentifierAndParentAndTypeForFunctionExpression";
import getIdentifierAndParentAndTypeForFunctionExpressionParentWhenCommonjsExport from "../commonjs/getIdentifierAndParentAndTypeForFunctionExpressionParentWhenExport";
import getIdentifierAndParentAndTypeForFunctionExpressionWhenModuleExport from "../forModules/getIdentifierAndParentAndTypeForFunctionExpressionWhenExport";
import getParentFromAncestors from "../getParentFromAncestors";
import getTypeWhenModuleExportDeclarationType from "../forModules/getTypeWhenExportDeclarationType";

export default ({
	createDependsUponProperty,
	declarations,
	findBlockOrIdentifiableParentInAncestors,
	hasUndeclaredReferenceTo,
	sortItems,
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
				findBlockOrIdentifiableParentInAncestors(ancestors),
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
					findBlockOrIdentifiableParentInAncestors,
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
					createDependsUponProperty(
						{ parent: functionDeclarationOrExpression },
					),
				functionDeclarationOrExpression,
				hasUndeclaredReferenceTo,
				identifier,
				items:
					declarations.createItemsForAndRemoveDeclarationsIn(
						functionDeclarationOrExpression,
					),
				sortItems,
				type,
			})
		);
	}
};