// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default ({
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