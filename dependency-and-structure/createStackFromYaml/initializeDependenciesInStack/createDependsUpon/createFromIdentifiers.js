/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatmap")
.shim();

module.exports = createFromIdentifiers;

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