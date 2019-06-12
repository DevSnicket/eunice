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
				{ item: ancestor }
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