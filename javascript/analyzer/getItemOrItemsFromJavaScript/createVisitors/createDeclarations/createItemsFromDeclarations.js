module.exports =
	declarations =>
		declarations
		&&
		declarations
		.map(createItemFromDeclarationWhenRequired)
		.filter(item => item);

function createItemFromDeclarationWhenRequired(
	declaration,
) {
	return createWhenFunction() || createWhenVariableUsedInNestedFunction();

	function createWhenFunction() {
		return (
			declaration.isFunction
			&&
			(createWhenStructured() || declaration.id || {})
		);

		function createWhenStructured() {
			return (
				(declaration.dependsUpon || declaration.items)
				&&
				{
					...declaration.id && { id: declaration.id },
					...getDependsUponProperty(declaration.dependsUpon),
					...declaration.items && { items: declaration.items },
				}
			);
		}

		function getDependsUponProperty(
			dependsUpon,
		) {
			return dependsUpon && { dependsUpon };
		}
	}

	function createWhenVariableUsedInNestedFunction() {
		return (
			declaration.type === "variable"
			&&
			declaration.isUsedInNestedFunction
			&&
			{
				id: declaration.id,
				type: declaration.type,
				...declaration.dependsUpon && { dependsUpon: declaration.dependsUpon },
			}
		);
	}
}