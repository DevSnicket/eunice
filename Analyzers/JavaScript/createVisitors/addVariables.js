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
				.map(
					declaration =>
						createFromDeclarationWhenRequire(declaration)
						||
						createFromDeclarationWhenNotFunction(declaration)
				)
				.filter(
					declaration =>
						declaration
				)
			);
		}

		function createFromDeclarationWhenRequire(
			declaration
		) {
			const initalization = declaration.init;

			return (
				isRequire()
				&&
				{
					...createFromIdentifierOfDeclaration(declaration),
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

		function createFromDeclarationWhenNotFunction(
			declaration
		) {
			return (
				!isFunctionType(
					declaration.init.type
				)
				&&
				createFromIdentifierOfDeclaration(
					declaration
				)
			);
		}

		function createFromIdentifierOfDeclaration(
			declaration
		) {
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