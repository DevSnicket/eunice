// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createPolygon = require("./createPolygon"),
	createSymbol = require("./createSymbol");

module.exports =
	({
		createElement,
		id,
	}) =>
		createSymbol({
			createElement,
			id,
			polygon:
				createPolygon({
					createElement,
					/* cspell:disable-next-line */
					fill: "darkred",
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