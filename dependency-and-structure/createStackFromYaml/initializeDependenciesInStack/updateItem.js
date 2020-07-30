// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default ({
	dependsUpon,
	item,
}) =>
	withItem(item)
	.setDependsUpon(dependsUpon);

function withItem(
	item,
) {
	return { setDependsUpon };

	function setDependsUpon(
		dependsUpon,
	) {
		item.dependsUpon = dependsUpon;

		for (const { itemOrFirstAncestorItem: dependUponItem } of dependsUpon)
			if (dependUponItem)
				addDependentToDependUponItem(dependUponItem);
	}

	function addDependentToDependUponItem(
		dependUponItem,
	) {
		if (dependUponItem.dependents) {
			if (!isAlreadyAdded())
				dependUponItem.dependents.push(
					{ item },
				);
		} else
			dependUponItem.dependents = [ { item } ];

		function isAlreadyAdded() {
			return (
				dependUponItem.dependents.some(
					dependent => dependent.item === item,
				)
			);
		}
	}
}