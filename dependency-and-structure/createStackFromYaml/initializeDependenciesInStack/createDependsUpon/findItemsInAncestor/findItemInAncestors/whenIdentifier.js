// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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
					ancestors,
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