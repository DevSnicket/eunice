// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default ({
	dependsUpon,
	identifier,
	replaceDependsUponItems,
}) => {
	return (
		dependsUpon
		&&
		(whenArray() || replaceDependUpon(dependsUpon))
	);

	function whenArray() {
		return (
			Array.isArray(dependsUpon)
			&&
			dependsUpon.flatMap(replaceDependUpon)
		);
	}

	function replaceDependUpon(
		dependUpon,
	) {
		return whenHasScope() || dependUpon;

		function whenHasScope() {
			return (
				dependUpon.id === identifier
				&&
				replaceDependsUponItems(dependUpon.items)
			);
		}
	}
};