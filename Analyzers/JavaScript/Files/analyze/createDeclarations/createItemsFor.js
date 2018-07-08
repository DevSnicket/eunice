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
			(createWhenStructured() || declaration.id)
		);

		function createWhenStructured() {
			return (
				(declaration.dependsUpon || declaration.items)
				&&
				{
					id: declaration.id,
					...getDependsUponProperty(declaration.dependsUpon),
					...getItemsProperty(declaration.items),
				}
			);
		}

		function getDependsUponProperty(
			dependsUpon
		) {
			return dependsUpon && { dependsUpon };
		}

		function getItemsProperty(
			items
		) {
			return (
				items
				&&
				{ items: getSingleOrCollection() }
			);

			function getSingleOrCollection() {
				return (
					items.length === 1
					?
					items[0]
					:
					items
				);
			}
		}
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