// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default createParent;

function createParent() {
	const
		childItems = new Map(),
		identifiers = new Set();

	return (
		{
			add,
			getItems,
			getOrCreateItem,
		}
	);

	function add(
		identifier,
	) {
		return identifiers.add(identifier);
	}

	function getOrCreateItem(
		identifier,
	) {
		return getWhenExists() || create();

		function getWhenExists() {
			return childItems.get(identifier);
		}

		function create() {
			const item = createParent();

			childItems.set(identifier, item);

			return item;
		}
	}

	function getItems() {
		return (
			getSingleOrArrayWhenMultiple(
				[
					...identifiers,
					...getChildItems(),
				],
			)
		);

		function * getChildItems() {
			for (const [ id, childItem ] of childItems)
				yield (
					{
						id,
						items: childItem.getItems(),
					}
				);
		}
	}
}

function getSingleOrArrayWhenMultiple(
	items,
) {
	return (
		whenSingle()
		||
		items
	);

	function whenSingle() {
		return (
			items.length === 1
			&&
			items[0]
		);
	}
}