module.exports =
	({
		addDeclarationsIn,
		isFunctionType,
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
				.filter(declaration => !isFunctionType(declaration.init.type))
				.map(declaration => createVariableDeclaration(declaration.id.name))
			);
		}

		function createVariableDeclaration(
			id
		) {
			return (
				{
					id,
					isUsedInNestedFunction: isUsedInNestedFunction(),
					isVariable: true,
				}
			);

			function isUsedInNestedFunction() {
				return (
					isVariableReferencedBy({
						parent,
						variableName: id,
					})
				);
			}
		}
	};