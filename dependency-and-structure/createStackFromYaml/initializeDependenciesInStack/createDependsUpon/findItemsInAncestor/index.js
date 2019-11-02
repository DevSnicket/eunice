/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatmap")
.shim();

const findItemInAncestors = require("./findItemInAncestors");

module.exports =
	({
		ancestor,
		dependUponItems,
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
				})
			);
		}
	};