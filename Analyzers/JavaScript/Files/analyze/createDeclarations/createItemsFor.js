module.exports =
	({
		declarationsByParents,
		parent,
	}) => {
		const declarations = declarationsByParents.get(parent);

		declarationsByParents.delete(parent);

		return createItems();

		function createItems() {
			return (
				declarations
				&&
				getItemsWhenAnyAndInStackWhenMultiple(
					declarations
					.map(createItemFromDeclarationWhenRequired)
					.filter(item => item)
				)
			);
		}
	};

function createItemFromDeclarationWhenRequired(
	declaration
) {
	return createWhenFunction() || createWhenVariable();

	function createWhenFunction() {
		return (
			declaration.isFunction
			&&
			(createFunctionWhenStructured() || declaration.id)
		);
	}

	function createFunctionWhenStructured() {
		return (
			(declaration.dependsUpon || declaration.items)
			&&
			{
				id: declaration.id,
				...declaration.dependsUpon && { dependsUpon: declaration.dependsUpon },
				...declaration.items && { items: declaration.items },
			}
		);
	}

	function createWhenVariable() {
		return (
			declaration.isVariable
			&&
			declaration.isUsedInNestedFunction
			&&
			{ id: declaration.id }
		);
	}
}

function getItemsWhenAnyAndInStackWhenMultiple(
	items
) {
	return (
		items.length
		&&
		getItemsInStackWhenMultiple()
	);

	function getItemsInStackWhenMultiple() {
		return (
			items.length > 1
			?
			items.map(item => [ item ])
			:
			items
		);
	}
}