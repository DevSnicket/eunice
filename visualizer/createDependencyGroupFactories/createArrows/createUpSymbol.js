// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createPolygon from "./createPolygon";
import createSymbol from "./createSymbol";

export default ({
	createElement,
	fill,
	id,
	withPrecision,
}) => {
	return (
		createSymbol({
			createElement,
			id,
			polygon:
				createPolygon({
					createElement,
					fill,
					transform: flipFirstAxis,
				}),
			preserveAspectRatio:
				"xMidYMin slice",
		})
	);

	function flipFirstAxis(
		point,
	) {
		return (
			[
				point[0],
				withPrecision(1 - point[1]),
			]
		);
	}
};