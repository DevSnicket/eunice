// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createPolygon from "./createPolygon";
import createSymbol from "./createSymbol";

export default ({
	createElement,
	fill,
	id,
}) =>
	createSymbol({
		createElement,
		id,
		polygon:
			createPolygon({
				createElement,
				fill,
				transform: swapAxis,
			}),
		preserveAspectRatio:
			"xMaxYMid slice",
	});

function swapAxis(
	point,
) {
	return [ point[1], point[0] ];
}