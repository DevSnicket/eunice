/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import spacing from "../spacing";

export default
groupFactories => {
	return {
		createAtPosition,
		...calculateSize(),
	};

	function calculateSize() {
		return (
			groupFactories.reduce(
				(
					size,
					groupFactory,
				) => (
					{
						height:
							Math.max(
								size.height,
								groupFactory.height,
							),
						width:
							size.width
							+
							(size.width && spacing)
							+
							groupFactory.width,
					}
				),
				{ height: 0, width: 0 },
			)
		);
	}

	function createAtPosition({
		left,
		top,
	}) {
		return (
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
			return left - (sumWidth() / 2);
		}

		function sumWidth() {
			return (
				groupFactories.reduce(
					(sum, groupFactory) => sum + groupFactory.width,
					0,
				)
			);
		}
	}
};