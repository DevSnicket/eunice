// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const findItemWithIdentifierInLastAncestor = require("./findItemWithIdentifierInLastAncestor");

module.exports =
	({
		ancestors,
		dependUponItem,
		findInAncestors,
	}) => {
		const item =
			findItemWithIdentifierInLastAncestor({
				ancestors,
				identifier: dependUponItem.id,
			});

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
					})
				);
			}
		}
	};