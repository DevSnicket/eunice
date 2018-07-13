module.exports =
	({
		identifier,
		items,
		name,
	}) => {
		return (
			(!items && identifier)
			||
			getOrCreateWhenItem()
			||
			createWithItems()
		);

		function getOrCreateWhenItem() {
			return (
				items.length === 1
				&&
				getOrCreateFromItem({
					identifier,
					item: items[0],
					name,
				})
			);
		}

		function createWithItems() {
			return (
				{
					id: identifier,
					items,
				}
			);
		}
	};

function getOrCreateFromItem({
	identifier,
	item,
	name,
}) {
	return (
		(item === name && identifier)
		||
		(isString() && createParentWithIdentifier())
		||
		(isAnonymousOrSameName() && cloneWithIdentifier())
	);

	function isString() {
		return typeof item === "string";
	}

	function createParentWithIdentifier() {
		return (
			{
				id: identifier,
				items: item,
			}
		);
	}

	function isAnonymousOrSameName() {
		return !item.id || item.id === name;
	}

	function cloneWithIdentifier() {
		const clone = { id: identifier };

		for (const key of Object.keys(item))
			if (key !== "id")
				clone[key] = item[key];

		return clone;
	}
}