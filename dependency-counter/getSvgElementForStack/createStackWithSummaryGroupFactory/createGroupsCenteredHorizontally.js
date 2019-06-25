/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		center,
		groupFactories,
		spacing,
		top,
	}) => {
		return (
			groupFactories
			&&
			groupFactories
			.reduce(
				(aggregation, groupFactory) => (
					{
						groups:
							[
								...aggregation.groups,
								groupFactory.createAtPosition({ left: aggregation.left, top }),
							],
						left:
							aggregation.left + groupFactory.width + spacing,
					}
				),
				{ groups: [], left: calculateLeft() },
			)
			.groups
		);

		function calculateLeft() {
			return center - (sumWidth() / 2);
		}

		function sumWidth() {
			return (
				groupFactories.reduce(
					(sum, groupFactory) => sum + groupFactory.width,
					0,
				)
			);
		}
	};