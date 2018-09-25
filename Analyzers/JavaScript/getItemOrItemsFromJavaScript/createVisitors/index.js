const
	addFromCall = require("./addFromCall"),
	addFunctionExpression = require("./addFunctionExpression"),
	addVariables = require("./addVariables"),
	createDeclarations = require("./createDeclarations"),
	createDependsUpons = require("./createDependsUpons"),
	createFileItems = require("./createFileItems"),
	createFunctionDeclaration = require("./createFunctionDeclaration"),
	createScopedVariables = require("./createScopedVariables"),
	createUndeclaredReferences = require("./createUndeclaredReferences"),
	getItemWhenSingleOrStackItemsWhenMultiple = require("./getItemWhenSingleOrStackItemsWhenMultiple"),
	parentFunctionsFromAncestors = require("./parentFunctionsFromAncestors");

module.exports =
	() => {
		const
			declarations = createDeclarations(),
			dependsUpons = createDependsUpons(),
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
			const items =
				createFileItems({
					dependsUponProperty:
						dependsUpons.createPropertyFor(null),
					items:
						getItemWhenSingleOrStackItemsWhenMultiple(
							declarations.createItemsForAndRemoveDeclarationsIn(null),
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
						dependsUpons.createPropertyFor(
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