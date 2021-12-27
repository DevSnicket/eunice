// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default
parent =>
	createWhenHasProperties(
		createProperties(
			parent,
		),
	);

function createProperties(
	parent,
) {
	return (
		[ "above", "below", "same" ]
		.flatMap(createPropertyForDirection)
	);

	function createPropertyForDirection(
		direction,
	) {
		return whenHasDirection() || [];

		function whenHasDirection() {
			const directionValue = parent[direction];

			return (
				directionValue
				&&
				whenHasDependsUpon(directionValue)
			);
		}

		function whenHasDependsUpon(
			{ dependsUpon },
		) {
			return (
				dependsUpon
				&&
				{ [direction]: dependsUpon }
			);
		}
	}
}

function createWhenHasProperties(
	properties,
) {
	return (
		properties.length
		&&
		Object.assign({}, ...properties)
	);
}