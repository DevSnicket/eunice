const
	addFromCall = require("./createVisitors/addFromCall"),
	addFunctionExpression = require("./createVisitors/addFunctionExpression"),
	addVariables = require("./createVisitors/addVariables"),
	createDeclarations = require("./createVisitors/createDeclarations"),
	createDependsUpons = require("./createVisitors/createDependsUpons"),
	createFileItems = require("./createVisitors/createFileItems"),
	createUndeclaredVariableReferences = require("./createVisitors/createUndeclaredVariableReferences"),
	parentFunctionsFromAncestors = require("./createVisitors/parentFunctionsFromAncestors");

module.exports =
	() => {
		const
			declarations = createDeclarations(),
			dependsUpons = createDependsUpons(),
			undeclaredVariableReferences = createUndeclaredVariableReferences();

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
				getItems,
			}
		);

		function getItems() {
			const items =
				createFileItems({
					declarations,
					dependsUpons,
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
				createFunctionDeclaration,
				findParentFunctionFromAncestors: parentFunctionsFromAncestors.findIdentifiableParent,
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
				addUndeclaredVariableNameReference:
					variableName =>
						undeclaredVariableReferences.addAncestorsFor({
							ancestors,
							variableName,
						}),
				callExpression,
				findDeclarationAndParent:
					declarations.findDeclarationAndParent,
				findParentFunctions:
					() => parentFunctionsFromAncestors.findParents(ancestors),
			});
		}

		function visitFunctionDeclaration(
			functionDeclaration,
			ancestors
		) {
			declarations.addDeclarationIn({
				declaration:
					createFunctionDeclaration({
						identifier:
							functionDeclaration.id.name,
						node:
							functionDeclaration,
					}),
				parent:
					parentFunctionsFromAncestors.findIdentifiableParent(ancestors),
			});
		}

		function createFunctionDeclaration({
			identifier,
			node,
		}) {
			const items =
				declarations.createItemsFor(node);

			return (
				{
					id: identifier,
					isFunction: true,
					...dependsUpons.createPropertyFor(node),
					...items && { items },
				}
			);
		}

		function visitVariableDeclaration(
			variableDeclaration,
			ancestors
		) {
			addVariables({
				addDeclarationsIn:
					declarations.addDeclarationsIn,
				isVariableReferencedBy:
					undeclaredVariableReferences.hasReferenceTo,
				parent:
					parentFunctionsFromAncestors.findIdentifiableParent(ancestors),
				variableDeclaration,
			});
		}
	};