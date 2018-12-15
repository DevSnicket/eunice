module.exports =
	({
		items,
		type,
	}) => {
		return (
			Array.isArray(items)
			?
			items.map(createItem)
			:
			items && createItem(items)
		);

		function createItem(
			item,
		) {
			return (
				typeof item === "string"
				?
				{
					id: item,
					type,
				}
				:
				{
					...item.id && { id: item.id },
					type,
					...item,
				}
			);
		}
	};