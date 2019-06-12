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