require("array.prototype.flatmap")
.shim();

const
	createFromIdentifiers = require("./createFromIdentifiers"),
	findItemsInAncestor = require("./findItemsInAncestor");

module.exports =
	({
		ancestor,
		dependUpon,
	}) => {
		return (
			findItemsWhenHasAncestor()
			||
			createFromIdentifiers(dependUpon)
		);

		function findItemsWhenHasAncestor() {
			return (
				ancestor
				&&
				findItemsInAncestor({
					ancestor,
					dependUponItems: dependUpon.items,
				})
			);
		}
	};