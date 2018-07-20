module.exports =
	({
		dependsUponProperty,
		items,
	}) => {
		return (
			createItemWhenAnyDependsUpon()
			||
			items
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
	};