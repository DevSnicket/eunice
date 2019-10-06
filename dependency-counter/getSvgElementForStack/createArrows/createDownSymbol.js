// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createPolygon = require("./createPolygon"),
	createSymbol = require("./createSymbol");

module.exports =
	({
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
					transform: point => point,
				}),
			preserveAspectRatio:
				"xMidYMax slice",
		});