require("array.prototype.flat")
.shim();

module.exports =
	({
		dependUpon,
		parent,
	}) =>
		parent
		?
		withParent(parent)
		.createDependsUponFromIdentifiers(dependUpon.items)
		:
		createDependUponWhenParentNotFound(
			dependUpon,
		);

function withParent(
	parent,
) {
	return { createDependsUponFromIdentifiers };

	function createDependsUponFromIdentifiers(
		identifiers,
	) {
		return (
			whenAnyIdentifiersAndChildren()
			||
			createDependsUponWithItemsAndParent({
				items: identifiers,
				parent,
			})
		);

		function whenAnyIdentifiersAndChildren() {
			return (
				identifiers
				&&
				parent.items
				&&
				(whenIdentifiersArray() || createDependUponFromIdentifier(identifiers))
			);

			function whenIdentifiersArray() {
				return (
					Array.isArray(identifiers)
					&&
					identifiers.map(createDependUponFromIdentifier)
				);
			}
		}
	}

	function createDependUponFromIdentifier(
		identifier,
	) {
		return (
			{
				item: findItem() || identifier,
				parent,
			}
		);

		function findItem() {
			return (
				parent.items
				.flat()
				.find(item => item.id === identifier)
			);
		}
	}
}

function createDependUponWhenParentNotFound(
	dependUpon,
) {
	return (
		createDependsUponWithItemsAndParent({
			items: dependUpon.items,
			parent: dependUpon.id,
		})
	);
}

function createDependsUponWithItemsAndParent({
	items,
	parent,
}) {
	return (
		createWhenItems()
		||
		[ { item: parent } ]
	);

	function createWhenItems() {
		return (
			items
			&&
			(whenArray() || createFromItem(items))
		);

		function whenArray() {
			return (
				Array.isArray(items)
				&&
				items.map(createFromItem)
			);
		}

		function createFromItem(
			item,
		) {
			return (
				{
					item,
					parent,
				}
			);
		}
	}
}