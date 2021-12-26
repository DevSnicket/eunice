// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import findItemWithIdentifierInLastAncestor from "./findItemWithIdentifierInLastAncestor";

export default ({
	ancestors,
	dependUponItem,
	dependent,
}) => {
	return (
		typeof dependUponItem === "string"
		&&
		[ whenItemFound() || withAncestors() ]
	);

	function whenItemFound() {
		const item =
			findItemWithIdentifierInLastAncestor({
				ancestors,
				isItem,
			});

		return (
			item
			&&
			{
				ancestors,
				item,
				itemOrFirstAncestorItem:
					item,
			}
		);
	}

	function isItem(
		item,
	) {
		return (
			item.id === dependUponItem
			&&
			item !== dependent
		);
	}

	function withAncestors() {
		return (
			{
				ancestors,
				item:
					dependUponItem,
				itemOrFirstAncestorItem:
					ancestors[0],
			}
		);
	}
};