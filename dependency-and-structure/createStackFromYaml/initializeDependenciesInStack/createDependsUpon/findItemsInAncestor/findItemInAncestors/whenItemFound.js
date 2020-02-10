// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import findItemWithIdentifierInLastAncestor from "./findItemWithIdentifierInLastAncestor";

export default ({
	ancestors,
	dependUponItem,
	dependent,
	findInAncestors,
}) => {
	return (
		fromItemsWhenAny(
			findItemWithIdentifierInLastAncestor({
				ancestors,
				isItem,
			}),
		)
	);

	function isItem(
		item,
	) {
		return (
			item.id === dependUponItem.id
			&&
			item !== dependent
		);
	}

	function fromItemsWhenAny(
		item,
	) {
		return item && fromItems();

		function fromItems() {
			return (
				whenArray()
				||
				createDependsUponFromChildItem(dependUponItem.items)
			);

			function whenArray() {
				return (
					Array.isArray(dependUponItem.items)
					&&
					dependUponItem.items.flatMap(createDependsUponFromChildItem)
				);
			}

			function createDependsUponFromChildItem(
				childItem,
			) {
				return (
					findInAncestors({
						ancestors: [ item, ...ancestors ],
						dependUponItem: childItem,
						dependent,
					})
				);
			}
		}
	}
};