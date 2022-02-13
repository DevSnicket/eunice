/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export function horizontal({
	groupFactories,
	spacing,
}) {
	return (
		aggregateGroupFactories({
			groupFactories,
			properties:
				{
					align: verticalProperties,
					offset: horizontalProperties,
				},
			spacing,
		})
	);
}

export function vertical({
	groupFactories,
	spacing,
}) {
	return (
		aggregateGroupFactories({
			groupFactories,
			properties:
				{
					align: horizontalProperties,
					offset: verticalProperties,
				},
			spacing,
		})
	);
}

const horizontalProperties =
	{
		position: "left",
		size: "width",
	};

const verticalProperties =
	{
		position: "top",
		size: "height",
	};

function aggregateGroupFactories({
	groupFactories,
	properties,
	spacing,
}) {
	return (
		groupFactories
		.reduce(
			aggregate,
			{
				createAtPosition: () => [],
				height: 0,
				width: 0,
			},
		)
	);

	function aggregate(
		aggregation,
		groupFactory,
		index,
	) {
		const offset =
			aggregation[properties.offset.size]
			+
			(index && spacing);

		return (
			{
				createAtPosition:
					position =>
						[
							...aggregation.createAtPosition(position),
							groupFactory.createAtPosition({
								[properties.align.position]:
									position[properties.align.position],
								[properties.offset.position]:
									position[properties.offset.position] + offset,
							}),
						],
				[properties.align.size]:
					Math.max(
						aggregation[properties.align.size],
						groupFactory[properties.align.size],
					),
				[properties.offset.size]:
					groupFactory[properties.offset.size]
					+
					offset,
			}
		);
	}
}