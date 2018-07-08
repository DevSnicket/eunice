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
			(items && getItemInStackWhenSingle())
		);

		function createItemWhenAnyDependsUpon() {
			return (
				dependsUponProperty
				&&
				{
					...dependsUponProperty,
					...items && { items },
				}
			);
		}

		function getItemInStackWhenSingle() {
			return (
				items.length === 1
				?
				items[0]
				:
				items
			);
		}
	};