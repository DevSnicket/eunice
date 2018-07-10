module.exports =
	({
		dependsUpons,
		declarations,
	}) => {
		const
			dependsUponProperty =
				dependsUpons.createPropertyFor(null),
			items =
				declarations.createItemsFor(null);

		return (
			createItemWhenAnyDependsUpon()
			||
			(items && getSingleItemOrItemsCollection())
		);

		function createItemWhenAnyDependsUpon() {
			return (
				dependsUponProperty
				&&
				{
					...dependsUponProperty,
					...items && { items: getSingleItemOrItemsCollection() },
				}
			);
		}

		function getSingleItemOrItemsCollection() {
			return (
				items.length === 1
				?
				items[0]
				:
				items
			);
		}
	};