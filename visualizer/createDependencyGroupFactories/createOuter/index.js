/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createLevelGroupFactory from "./createLevelGroupFactory";
import createStackGroupFactory from "./createStackGroupFactory";

export default ({
	arrows,
	contentGroupFactory,
	outerCount,
	createTextGroup,
	elementContainerFactory,
	font,
	item,
}) => {
	return (
		whenHasDependencyCountOfOuter()
		||
		contentGroupFactory
	);

	function whenHasDependencyCountOfOuter() {
		return (
			outerCount
			&&
			createStackGroupFactory({
				arrows,
				createGroupFactoryWhenRequired,
				itemGroupWidth:
					contentGroupFactory.width,
				levelGroupFactory:
					createLevelGroupFactory({
						arrow:
						arrows.right,
						contentGroupFactory,
						createGroupFactoryWhenRequired,
						outerSameCount:
							outerCount
							&&
							outerCount.same,
					}),
				outerCount,
			})
		);
	}

	function createGroupFactoryWhenRequired({
		arrow,
		count,
		keys,
	}) {
		return (
			createDependencyGroupFactoryWhenRequired({
				arrow,
				count,
				createTextGroup:
					getCreateTextGroupWhenInContainer()
					||
					createTextGroup,
				font,
				key:
					`${item.id} dependency count outer ${keys.relationship} ${keys.structure}`,
			})
		);

		function getCreateTextGroupWhenInContainer() {
			return (
				elementContainerFactory
				&&
				elementContainerFactory.createForDependencyCount
				&&
				createInContainer
			);

			function createInContainer(
				parameters,
			) {
				return (
					elementContainerFactory.createForDependencyCount({
						element:
							createTextGroup(parameters),
						item,
						level:
							keys.level,
						relationship:
							keys.relationship,
					})
				);
			}
		}
	}
};