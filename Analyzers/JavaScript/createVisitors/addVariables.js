const
	createWhenRequire = require("./addVariables/createWhenRequire"),
	getIdentifiersAndIsDestructuredFromExpression = require("./addVariables/getIdentifiersAndIsDestructuredFromExpression");

module.exports =
	({
		addDeclarationsIn,
		hasUndeclaredReferenceTo,
		parent,
		variableDeclaration,
	}) => {
		const variableDeclarations = createVariableDeclarations();

		if (variableDeclarations.length)
			addDeclarationsIn({
				declarations: variableDeclarations,
				parent,
			});

		function createVariableDeclarations() {
			return (
				variableDeclaration.declarations
				.reduce(
					(declarations, declaration) =>
						[
							...declarations,
							...createFromDeclarationWhenInitialized(declaration) || [],
						],
					[]
				)
			);
		}

		function createFromDeclarationWhenInitialized(
			declaration
		) {
			const initalization = declaration.init;

			return (
				initalization
				&&
				createFromDeclaration()
			);

			function createFromDeclaration() {
				return (
					createWhenRequire({
						createVariablesFromIdentifier,
						initalization,
					})
					||
					createWhenNotFunction()
				);
			}

			function createWhenNotFunction() {
				return (
					!isFunctionType(initalization.type)
					&&
					createVariablesFromIdentifier()
				);
			}

			function createVariablesFromIdentifier() {
				const { identifiers, isDestructured } =
					getIdentifiersAndIsDestructuredFromExpression(
						declaration.id
					);

				return (
					identifiers
					.map(
						identifier => (
							{
								...isDestructured && { dependsUpon: identifier },
								id:
									identifier,
								isUsedInNestedFunction:
									hasUndeclaredReferenceTo({
										parent,
										reference: identifier,
									}),
								type:
									"variable",
							}
						)
					)
				);
			}
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