module.exports =
	({
		addDeclarationsIn,
		isVariableReferencedBy,
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
				.map(createFromDeclarationWhenInitialized)
				.filter(declaration => declaration)
			);
		}

		function createFromDeclarationWhenInitialized(
			declaration
		) {
			const initalization = declaration.init;

			return (
				initalization
				&&
				(createWhenRequire() || createWhenNotFunction())
			);

			function createWhenRequire() {
				return (
					isRequire()
					&&
					{
						...createFromDeclarationIdentifier(),
						dependsUpon: getArgument(),
					}
				);

				function isRequire() {
					return (
						initalization.type === "CallExpression"
						&&
						initalization.callee.name === "require"
					);
				}

				function getArgument() {
					return initalization.arguments[0].value;
				}
			}

			function createWhenNotFunction() {
				return (
					!isFunctionType(initalization.type)
					&&
					createFromDeclarationIdentifier()
				);
			}

			function createFromDeclarationIdentifier() {
				const variableName = declaration.id.name;

				return (
					{
						id: variableName,
						isUsedInNestedFunction: isUsedInNestedFunction(),
						type: "variable",
					}
				);

				function isUsedInNestedFunction() {
					return (
						isVariableReferencedBy({
							parent,
							variableName,
						})
					);
				}
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