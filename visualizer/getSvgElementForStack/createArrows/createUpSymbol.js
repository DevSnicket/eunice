// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createPolygon = require("./createPolygon"),
	createSymbol = require("./createSymbol");

module.exports =
	({
		createElement,
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
						/* cspell:disable-next-line */
						fill: "darkred",
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