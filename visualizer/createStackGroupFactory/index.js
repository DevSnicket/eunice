/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

import * as aggregateGroupFactoriesWithOrientation from "../aggregateGroupFactoriesWithOrientation";
import createItemGroupFactory from "./createItemGroupFactory";

export default (/** @type {import("./Parameter.d")} */{
	createTextGroup,
	dependencyGroupFactories,
	elementContainerFactory,
	font,
	stack,
}) => {
	const spacing = 15;

	return (
		aggregateGroupFactoriesWithOrientation.vertical({
			groupFactories:
				stack.map(createLevelGroupFactory),
			spacing,
		})
	);

	function createLevelGroupFactory(
		level,
	) {
		return (
			aggregateGroupFactoriesWithOrientation.horizontal({
				groupFactories:
					level.map(createGroupFactoryForItem),
				spacing,
			})
		);
	}

	function createGroupFactoryForItem(
		item,
	) {
		return (
			dependencyGroupFactories.createOuterFromItem({
				contentGroupFactory:
					createItemGroupFactoryWithDependsUponCounts(),
				item,
			})
		);

		function createItemGroupFactoryWithDependsUponCounts() {
			return (
				createItemGroupFactory({
					createTextGroup:
						getCreateTextGroupWhenInContainer()
						||
						createTextGroup,
					font,
					identifier:
						item.id,
					innerDependencyGroupFactory:
						createInnerDependencyGroupFactory(),
				})
			);

			function getCreateTextGroupWhenInContainer() {
				return (
					elementContainerFactory
					&&
					elementContainerFactory.createForItem
					&&
					createInContainer
				);

				function createInContainer(
					parameters,
				) {
					return (
						elementContainerFactory.createForItem({
							element: createTextGroup(parameters),
							item,
						})
					);
				}
			}

			function createInnerDependencyGroupFactory() {
				return (
					whenHasCount()
					||
					asEmpty()
				);

				function whenHasCount() {
					return (
						dependencyGroupFactories.createInnerFromItem({
							item,
							keyPrefix:
								`${item.id} `,
						})
					);
				}

				function asEmpty() {
					return {
						createAtPosition:
							() => null,
						height:
							0,
						width:
							0,
					};
				}
			}
		}
	}
};