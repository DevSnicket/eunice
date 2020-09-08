// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
// x and y are attribute names in SVG
/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
({
	arrowSize,
	arrows,
	createElement,
	orientation,
	spacing,
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
						[orientation.size.auto]:
							arrowSize[orientation.size.auto],
						[orientation.size.grow]:
							0,
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
							arrowSize.height || arrow.height,
						href:
							`#${arrow.id}`,
						key:
							arrow.id,
						width:
							arrowSize.width,
						// dimension can be either x or y
						// eslint-disable-next-line sort-keys
						[orientation.dimension.grow]:
							aggregation.size[orientation.size.grow],
					},
				)
			);
		}

		function calculateSize() {
			return (
				{
					[orientation.size.auto]:
						arrowSize[orientation.size.auto]
						||
						Math.max(
							aggregation.size[orientation.size.auto],
							arrow[orientation.size.auto],
						),
					[orientation.size.grow]:
						aggregation.size[orientation.size.grow]
						+
						arrowSize[orientation.size.grow]
						+
						spacing,
				}
			);
		}
	}
};