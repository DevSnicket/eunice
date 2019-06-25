/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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