/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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