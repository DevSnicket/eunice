// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
// x and y are attribute names in SVG
/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
({
	arrows,
	createElement,
	height = null,
	spacing,
	width,
}) => {
	return (
		[ arrows.down, arrows.up, arrows.right ]
		.reduce(
			aggregate,
			{
				elements:
					getArrowSymbols(),
				size:
					{
						height,
						width: 0,
					},
			},
		)
	);

	function getArrowSymbols() {
		return (
			Object.values(arrows)
			.map(arrow => arrow.symbol)
		);
	}

	function aggregate(
		aggregation,
		arrow,
	) {
		return (
			{
				elements:
					[
						...aggregation.elements,
						createUse(),
					],
				size:
					calculateSize(),
			}
		);

		function createUse() {
			return (
				createElement(
					"use",
					{
						height:
							height || arrow.height,
						href:
							`#${arrow.id}`,
						key:
							arrow.id,
						width,
						x:
							aggregation.size.width,
					},
				)
			);
		}

		function calculateSize() {
			return (
				{
					height:
						height
						||
						Math.max(
							aggregation.size.height,
							arrow.height,
						),
					width:
						aggregation.size.width
						+
						width
						+
						spacing,
				}
			);
		}
	}
};