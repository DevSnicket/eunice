/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		dependsUpon,
		item,
	}) => {
		item.dependsUpon = dependsUpon;

		addDependent({
			dependsUponItems:
				dependsUpon.flatMap(
					({ itemOrFirstAncestorItem }) =>
						itemOrFirstAncestorItem
						||
						[],
				),
			item,
		});
	};

function addDependent({
	dependsUponItems,
	item,
}) {
	for (const dependsUponItem of dependsUponItems)
		if (dependsUponItem.dependents) {
			if (!dependsUponItem.dependents.includes(item))
				dependsUponItem.dependents.push(item);
		} else
			dependsUponItem.dependents = [ item ];
}