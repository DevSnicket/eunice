require("array.prototype.flat")
.shim();

module.exports =
	({
		dependsUpon,
		dependsUponItem,
	}) =>
		dependsUponItem
		?
		findItemsWhenAny({
			identifiers: dependsUpon.items,
			items: dependsUponItem.items,
		})
		||
		[ dependsUponItem ]
		:
		[ dependsUpon.id ];

function findItemsWhenAny({
	identifiers,
	items,
}) {
	return (
		identifiers
		&&
		items
		&&
		(findItemsWhenArray() || findItemWithIdentifier(identifiers))
	);

	function findItemsWhenArray() {
		return (
			Array.isArray(identifiers)
			&&
			identifiers
			.map(findItemWithIdentifier)
			.filter(item => item)
		);
	}

	function findItemWithIdentifier(
		identifier
	) {
		return (
			items
			.flat()
			.find(item => item.id === identifier)
		);
	}
}