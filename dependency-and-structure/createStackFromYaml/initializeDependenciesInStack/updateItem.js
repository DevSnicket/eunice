// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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