/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	{
		horizontal:
			({
				groupFactories,
				spacing,
			}) =>
				aggregateGroupFactories({
					groupFactories,
					properties:
						{
							align: verticalProperties,
							offset: horizontalProperties,
						},
					spacing,
				}),
		vertical:
			({
				groupFactories,
				spacing,
			}) =>
				aggregateGroupFactories({
					groupFactories,
					properties:
						{
							align: horizontalProperties,
							offset: verticalProperties,
						},
					spacing,
				}),
	};

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