// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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