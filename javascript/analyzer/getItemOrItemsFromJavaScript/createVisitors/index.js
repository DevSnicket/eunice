const
	addFromCall = require("./addFromCall"),
	addFunctionExpression = require("./addFunctionExpression"),
	addVariables = require("./addVariables"),
	createDeclarations = require("./createDeclarations"),
	createDependsUponIdentifiers = require("./createDependsUponIdentifiers"),
	createFileItemOrItems = require("./createFileItemOrItems"),
	createFunctionDeclaration = require("./createFunctionDeclaration"),
	createScopedVariables = require("./createScopedVariables"),
	createUndeclaredReferences = require("./createUndeclaredReferences"),
	parentFunctionsFromAncestors = require("./parentFunctionsFromAncestors"),
	stackItemsWhenMultiple = require("./stackItemsWhenMultiple");

module.exports =
	() => {
		const
			declarations = createDeclarations(),
			dependsUponIdentifiers = createDependsUponIdentifiers(),
			scopedVariables = createScopedVariables(),
			undeclaredReferences = createUndeclaredReferences();

		return (
			{
				ArrowFunctionExpression:
					visitFunctionExpression,
				CallExpression:
					visitCallExpression,
				FunctionDeclaration:
					visitFunctionDeclaration,
				FunctionExpression:
					visitFunctionExpression,
				VariableDeclaration:
					visitVariableDeclaration,
				getItemOrItems,
			}
		);

		function getItemOrItems() {
			const dependsUponProperty =
				dependsUponIdentifiers.createPropertyFor(null);

			const itemOrItems =
				createFileItemOrItems({
					dependsUponProperty,
					items:
						stackItemsWhenMultiple({
							items:
								declarations.createItemsForAndRemoveDeclarationsIn(null),
							withSingleInArray:
								!dependsUponProperty,
						}),
				});

			/* istanbul ignore next: error is only thrown when there is gap in the implementation */
			if (declarations.any())
				throw new Error("Unhandled declarations.");
			/* istanbul ignore next: error is only thrown when there is gap in the implementation */
			else if (dependsUponIdentifiers.any())
				throw new Error("Unhandled dependencies.");
			else
				return itemOrItems;
		}

		function visitFunctionExpression(
			functionExpression,
			ancestors,
		) {
			addFunctionExpression({
				addDeclarationIn:
					declarations.addDeclarationIn,
				ancestors,
				createFunctionDeclarationWithIdentifier,
				findParentFunctionFromAncestors:
					parentFunctionsFromAncestors.findIdentifiableParent,
				functionExpression,
			});
		}

		function visitCallExpression(
			callExpression,
			ancestors,
		) {
			addFromCall({
				addDependsUponIdentifierFrom:
					dependsUponIdentifiers.addIdentifierFrom,
				addUndeclaredReference:
					({ parent, reference }) =>
						undeclaredReferences.addAncestorsAndParentOfReference({
							ancestors,
							parent,
							reference,
						}),
				callExpression,
				findDeclarationAndParent:
					declarations.findDeclarationAndParent,
				findParentFunctions:
					() => parentFunctionsFromAncestors.findParents(ancestors),
				isVariableInBlockScoped:
					variable =>
						scopedVariables.isIn({
							ancestors,
							variable,
						}),
			});
		}

		function visitFunctionDeclaration(
			functionDeclaration,
			ancestors,
		) {
			declarations.addDeclarationIn({
				declaration:
					createFunctionDeclarationWithIdentifier({
						functionDeclaration,
						identifier: functionDeclaration.id.name,
					}),
				parent:
					parentFunctionsFromAncestors.findIdentifiableParent(ancestors),
			});
		}

		function createFunctionDeclarationWithIdentifier({
			functionDeclaration,
			identifier,
		}) {
			return (
				createFunctionDeclaration({
					dependsUponProperty:
						dependsUponIdentifiers.createPropertyFor(
							functionDeclaration,
						),
					functionDeclaration,
					hasUndeclaredReferenceTo: undeclaredReferences.hasReferenceTo,
					identifier,
					items:
						declarations.createItemsForAndRemoveDeclarationsIn(
							functionDeclaration,
						),
				})
			);
		}

		function visitVariableDeclaration(
			variableDeclaration,
			ancestors,
		) {
			addVariables({
				addDeclarationsIn:
					declarations.addDeclarationsIn,
				addScopedVariables:
					scopedVariables.add,
				hasUndeclaredReferenceTo:
					undeclaredReferences.hasReferenceTo,
				parent:
					ancestors[ancestors.length - 2],
				parentFunction:
					parentFunctionsFromAncestors.findIdentifiableParent(ancestors),
				variableDeclaration,
			});
		}
	};