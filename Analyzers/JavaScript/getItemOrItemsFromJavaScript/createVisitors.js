const
	addFromCall = require("./createVisitors/addFromCall"),
	addFunctionExpression = require("./createVisitors/addFunctionExpression"),
	addVariables = require("./createVisitors/addVariables"),
	createBlockScopedVariables = require("./createVisitors/createBlockScopedVariables"),
	createDeclarations = require("./createVisitors/createDeclarations"),
	createDependsUpons = require("./createVisitors/createDependsUpons"),
	createFileItems = require("./createVisitors/createFileItems"),
	createFunctionDeclaration = require("./createVisitors/createFunctionDeclaration"),
	createUndeclaredReferences = require("./createVisitors/createUndeclaredReferences"),
	getItemWhenSingleOrStackItemsWhenMultiple = require("./createVisitors/getItemWhenSingleOrStackItemsWhenMultiple"),
	parentFunctionsFromAncestors = require("./createVisitors/parentFunctionsFromAncestors");

module.exports =
	() => {
		const
			blockScopedVariables = createBlockScopedVariables(),
			declarations = createDeclarations(),
			dependsUpons = createDependsUpons(),
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
			const items =
				createFileItems({
					dependsUponProperty:
						dependsUpons.createPropertyFor(null),
					items:
						getItemWhenSingleOrStackItemsWhenMultiple(
							declarations.createItemsForAndRemoveDeclarationsIn(null)
						),
				});

			/* istanbul ignore next: error is only thrown when there is gap in the implementation */
			if (declarations.any())
				throw new Error("Unhandled declarations.");
			/* istanbul ignore next: error is only thrown when there is gap in the implementation */
			else if (dependsUpons.any())
				throw new Error("Unhandled dependencies.");
			else
				return items;
		}

		function visitFunctionExpression(
			functionExpression,
			ancestors
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
			ancestors
		) {
			addFromCall({
				addDependsUponIdentifierFrom:
					dependsUpons.addIdentifierFrom,
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
						blockScopedVariables.isIn({
							ancestors,
							variable,
						}),
			});
		}

		function visitFunctionDeclaration(
			functionDeclaration,
			ancestors
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
						dependsUpons.createPropertyFor(
							functionDeclaration
						),
					functionDeclaration,
					hasUndeclaredReferenceTo: undeclaredReferences.hasReferenceTo,
					identifier,
					items:
						declarations.createItemsForAndRemoveDeclarationsIn(
							functionDeclaration
						),
				})
			);
		}

		function visitVariableDeclaration(
			variableDeclaration,
			ancestors
		) {
			addVariables({
				addBlockScopedVariables:
					blockScopedVariables.add,
				addDeclarationsIn:
					declarations.addDeclarationsIn,
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