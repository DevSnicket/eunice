require("array.prototype.flatmap")
.shim();

const
	createAndAddDeclarations = require("./createAndAddDeclarations"),
	getNamesFromIdentifierExpressionWhenObjectPattern = require("./getNamesFromIdentifierExpressionWhenObjectPattern");

module.exports =
	({
		addDeclarationsIn,
		addScopedVariables,
		hasUndeclaredReferenceTo,
		parent,
		parentFunction,
		variableDeclaration,
	}) => {
		if (isScoped())
			getAndAddScopedVariables();
		else
			createAndAddDeclarations({
				addDeclarationsIn,
				getNamesFromIdentifierExpressionWhenObjectPattern,
				hasUndeclaredReferenceTo,
				parentFunction,
				variableDeclaration,
			});

		function isScoped() {
			return (
				parentFunction
				&&
				parentFunction.body !== parent
			);
		}

		function getAndAddScopedVariables() {
			addScopedVariables({
				scope:
					parent,
				variables:
					variableDeclaration.declarations.flatMap(
						declaration =>
							getNamesFromIdentifierExpressionWhenObjectPattern(declaration.id)
							||
							[ declaration.id.name ],
					),
			});
		}
	};