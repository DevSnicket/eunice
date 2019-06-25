/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
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