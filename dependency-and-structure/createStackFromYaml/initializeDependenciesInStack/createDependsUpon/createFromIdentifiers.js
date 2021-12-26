// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default createFromIdentifiers;

function createFromIdentifiers({
	id,
	items,
}) {
	return (
		createWhenItems()
		||
		[ { item: id } ]
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
				items.flatMap(createFromItem)
			);
		}

		function createFromItem(
			item,
		) {
			return whenString() || withSubItems();

			function whenString() {
				return (
					typeof item === "string"
					&&
					[ {
						ancestors: [ id ],
						item,
					} ]
				);
			}

			function withSubItems() {
				return (
					createFromIdentifiers(item)
					.flatMap(
						subItem => (
							{
								ancestors: [ ...subItem.ancestors, id ],
								item: subItem.item,
							}
						),
					)
				);
			}
		}
	}
}