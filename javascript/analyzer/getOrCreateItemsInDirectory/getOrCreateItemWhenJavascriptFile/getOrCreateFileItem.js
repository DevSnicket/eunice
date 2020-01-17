// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		identifier,
		itemOrItems,
	}) => {
		return (
			whenNoItemOrItems()
			||
			whenArray()
			||
			createFileItemFrom(itemOrItems)
		);

		function whenNoItemOrItems() {
			return (
				!itemOrItems
				&&
				createFileItemFrom()
			);
		}

		function whenArray() {
			return (
				Array.isArray(itemOrItems)
				&&
				fromArray()
			);

			function fromArray() {
				return (
					whenSingle()
					||
					createFileItemFrom({ items: itemOrItems })
				);

				function whenSingle() {
					return (
						itemOrItems.length === 1
						&&
						createFileItemFrom(
							{ items: itemOrItems[0] },
						)
					);
				}
			}
		}

		function createFileItemFrom(
			base,
		) {
			return (
				createItem({
					...base,
					identifier,
					type: "file",
				})
			);
		}
	};

function createItem({
	dependsUpon = null,
	identifier,
	items = null,
	...restOfItem
}) {
	return (
		{
			id: identifier,
			...restOfItem,
			...dependsUpon && { dependsUpon },
			...items && { items },
		}
	);
}