/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { horizontal as aggregateGroupFactoriesHorizontally } from "../../aggregateGroupFactoriesWithOrientation";

export default ({
	arrow,
	contentGroupFactory,
	createGroupFactoryWhenRequired,
	outerSameCount,
}) => {
	return (
		whenHasDependencyCount()
		||
		createGroupsFactoryWithoutDependencies(
			contentGroupFactory,
		)
	);

	function whenHasDependencyCount() {
		return (
			outerSameCount
			&&
			createGroupFactoryWithTopOffset(
				calculateTopOffset(),
			)
		);
	}

	function calculateTopOffset() {
		return (
			(contentGroupFactory.height - arrow.height)
			/
			2
		);
	}

	function createGroupFactoryWithTopOffset(
		topOffset,
	) {
		const
			dependentsGroupFactory = createGroupFactoryForRelationship("dependents"),
			dependsUponGroupFactory = createGroupFactoryForRelationship("dependsUpon");

		return (
			(dependentsGroupFactory || dependsUponGroupFactory)
			&&
			{
				...aggregateGroupFactoriesHorizontally({
					groupFactories: [ ...getGroupFactories() ],
					spacing: 0,
				}),
				itemGroupLeft:
					dependentsGroupFactory && dependentsGroupFactory.width,
			}
		);

		function createGroupFactoryForRelationship(
			relationship,
		) {
			const groupFactory =
				createGroupFactoryWhenRequired({
					arrow,
					count: outerSameCount[relationship],
					keys: createKeysForRelationship(relationship),
				});

			return (
				groupFactory
				&&
				withTopOffset(groupFactory)
			);
		}

		function createKeysForRelationship(
			relationship,
		) {
			return (
				{
					level: "same",
					relationship,
				}
			);
		}

		function withTopOffset({
			createAtPosition,
			height,
			width,
		}) {
			return (
				{
					createAtPosition:
						({
							left,
							top,
						}) =>
							createAtPosition({
								left,
								top: top + topOffset,
							}),
					height,
					width,
				}
			);
		}

		function * getGroupFactories() {
			if (dependentsGroupFactory)
				yield dependentsGroupFactory;

			yield contentGroupFactory;

			if (dependsUponGroupFactory)
				yield dependsUponGroupFactory;
		}
	}
};

function createGroupsFactoryWithoutDependencies(
	itemGroupFactory,
) {
	return (
		{
			createAtPosition:
				position => [ itemGroupFactory.createAtPosition(position) ],
			height:
				itemGroupFactory.height,
			itemGroupLeft:
				0,
			width:
				itemGroupFactory.width,
		});
}