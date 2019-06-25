/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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