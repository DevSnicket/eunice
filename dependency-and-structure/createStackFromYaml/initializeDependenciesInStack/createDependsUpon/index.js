// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import createFromIdentifiers from "./createFromIdentifiers";
import findItemsInAncestor from "./findItemsInAncestor";

export default ({
	ancestor,
	dependUpon,
	dependent,
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
				dependent,
			})
		);
	}
};