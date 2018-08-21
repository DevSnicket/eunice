const createWhenRequire = require("./createAndAddDeclarations/createWhenRequire");

module.exports =
	({
		addDeclarationsIn,
		getNamesFromIdentifierExpressionWhenObjectPattern,
		hasUndeclaredReferenceTo,
		parentFunction,
		variableDeclaration,
	}) => {
		addDeclarationsWhenAny(
			createDeclarations()
		);

		function createDeclarations() {
			return (
				variableDeclaration.declarations
				.reduce(
					(declarations, declaration) =>
						[
							...declarations,
							...createFromDeclarationIfInitialized(declaration) || [],
						],
					[]
				)
			);
		}

		function createFromDeclarationIfInitialized(
			declaration
		) {
			return (
				declaration.init
				&&
				createFromDeclaration()
			);

			function createFromDeclaration() {
				return (
					createWhenRequire({
						createVariablesFromIdentifier,
						initalization: declaration.init,
					})
					||
					createWhenNotFunction()
				);
			}

			function createWhenNotFunction() {
				return (
					!isFunctionType(
						declaration.init.type
					)
					&&
					createVariablesFromIdentifier()
				);
			}

			function createVariablesFromIdentifier() {
				return (
					createVariablesFromIsDestructuredAndNames(
						getIsDestructuredAndNamesOfIdentifier(
							declaration.id
						)
					)
				);
			}
		}

		function getIsDestructuredAndNamesOfIdentifier(
			identifier
		) {
			return (
				getWhenObjectPattern()
				||
				{
					isDestructured: false,
					names: [ identifier.name ],
				}
			);

			function getWhenObjectPattern() {
				const names = getNamesFromIdentifierExpressionWhenObjectPattern(identifier);

				return (
					names
					&&
					{
						isDestructured: true,
						names,
					}
				);
			}
		}

		function createVariablesFromIsDestructuredAndNames({
			isDestructured,
			names,
		}) {
			return (
				names
				.map(
					name => (
						{
							...isDestructured && { dependsUpon: name },
							id:
								name,
							isUsedInNestedFunction:
								hasUndeclaredReferenceTo({
									parent: parentFunction,
									reference: name,
								}),
							type:
								"variable",
						}
					)
				)
			);
		}

		function addDeclarationsWhenAny(
			declarations
		) {
			if (declarations.length)
				addDeclarationsIn({
					declarations,
					parent:
						parentFunction,
				});
		}
	};

function isFunctionType(
	type
) {
	return (
		type === "ArrowFunctionExpression"
		||
		type === "FunctionDeclaration"
		||
		type === "FunctionExpression"
	);
}