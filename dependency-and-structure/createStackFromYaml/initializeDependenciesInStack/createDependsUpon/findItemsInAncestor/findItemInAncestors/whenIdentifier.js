/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const findItemWithIdentifierInLastAncestor = require("./findItemWithIdentifierInLastAncestor");

module.exports =
	({
		ancestors,
		dependUponItem,
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
					identifier: dependUponItem,
				});

			return (
				item
				&&
				{
					ancestor:
						ancestors[ancestors.length - 1],
					item,
					itemOrFirstAncestorItem:
						item,
				}
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