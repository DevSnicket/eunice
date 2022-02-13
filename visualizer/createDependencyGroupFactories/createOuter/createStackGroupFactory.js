/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

import * as aggregateGroupFactoriesWithOrientation from "../../aggregateGroupFactoriesWithOrientation";
import spacing from "../spacing";

export default ({
	arrows,
	createGroupFactoryWhenRequired,
	itemGroupWidth,
	levelGroupFactory,
	outerCount,
}) => {
	return (
		aggregateGroupFactoriesWithOrientation.vertical({
			groupFactories:
				[ ...createGroupFactories() ],
			spacing:
				0,
		})
	);

	function * createGroupFactories() {
		yield* (
			createLevelDirectionGroupFactory({
				levelDirection:
					"above",
				relationshipDirections:
					{
						down: "dependents",
						up: "dependsUpon",
					},
			})
		);

		yield levelGroupFactory;

		yield* (
			createLevelDirectionGroupFactory({
				levelDirection:
					"below",
				relationshipDirections:
					{
						down: "dependsUpon",
						up: "dependents",
					},
			})
		);

		function * createLevelDirectionGroupFactory({
			levelDirection,
			relationshipDirections,
		}) {
			const dependencyCountInLevelDirection =
				outerCount[levelDirection];

			if (dependencyCountInLevelDirection)
				yield (
					createGroupFactoryCentered(
						aggregateGroupFactoriesWithOrientation.horizontal({
							groupFactories:
								[ "down", "up" ]
								.flatMap(createArrowDirectionGroupFactory),
							spacing,
						}),
					)
				);


			function createArrowDirectionGroupFactory(
				arrowDirection,
			) {
				return whenHasCount() || [];

				function whenHasCount() {
					const relationshipDirection =
						relationshipDirections[arrowDirection];

					const count =
						dependencyCountInLevelDirection[relationshipDirection];

					return (
						count
						&&
						createGroupFactoryWhenRequired({
							arrow:
								arrows[arrowDirection],
							count,
							keys:
								{
									level: levelDirection,
									relationship: relationshipDirection,
								},
						})
					);
				}
			}
		}
	}

	function createGroupFactoryCentered({
		createAtPosition,
		height,
		width,
	}) {
		const leftOffsetOfCenter =
			levelGroupFactory.itemGroupLeft + ((itemGroupWidth - width) / 2);

		return (
			{
				createAtPosition:
					({
						left,
						top,
					}) =>
						createAtPosition({
							left: left + leftOffsetOfCenter,
							top,
						}),
				height,
				width,
			});
	}
};