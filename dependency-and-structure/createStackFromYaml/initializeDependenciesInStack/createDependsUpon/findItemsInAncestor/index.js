// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flatmap")
.shim();

const findItemInAncestors = require("./findItemInAncestors");

module.exports =
	({
		ancestor,
		dependUponItems,
		dependent,
	}) => {
		return (
			createWhenNone()
			||
			findWhenArray()
			||
			findItem(dependUponItems)
		);

		function createWhenNone() {
			return (
				!dependUponItems
				&&
				{
					item: ancestor,
					itemOrFirstAncestorItem: ancestor,
				}
			);
		}

		function findWhenArray() {
			return (
				Array.isArray(dependUponItems)
				&&
				dependUponItems.flatMap(findItem)
			);
		}

		function findItem(
			dependUponItem,
		) {
			return (
				findItemInAncestors({
					ancestors: [ ancestor ],
					dependUponItem,
					dependent,
				})
			);
		}
	};