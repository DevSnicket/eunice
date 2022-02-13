/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import initial from "lodash/initial";
import last from "lodash/last";
import path from "path";

const parentSegment = "..";

export default ({
	items,
	sourceDirectoryRelativePath,
	targetPathSegments,
}) =>
	targetPathSegments
	.reduceRight(
		getOrCreateAbsoluteOrParentRelativeDependsUpon,
		{
			ancestorDirectoryNames:
				getAncestorNamesFromDirectoryPath(
					sourceDirectoryRelativePath,
				),
			items,
		},
	)
	.items;

function getAncestorNamesFromDirectoryPath(
	directoryPath,
) {
	return (
		directoryPath
		&&
		initial(
			directoryPath
			.split(path.sep),
		)
	);
}

function getOrCreateAbsoluteOrParentRelativeDependsUpon(
	{
		ancestorDirectoryNames,
		items,
		isInParentDirectory,
	},
	pathSegment,
	pathSegmentIndex,
) {
	return (
		whenParentDirectory()
		||
		asChild()
	);

	function whenParentDirectory() {
		return (
			pathSegment === parentSegment
			&&
			{
				...createAncestorDirectoryNamesAndItems(),
				isInParentDirectory: true,
			}
		);

		function createAncestorDirectoryNamesAndItems() {
			return (
				whenNamedParent()
				||
				{ items: createDependsUponWithIdentifier(pathSegment) }
			);

			function whenNamedParent() {
				return (
					hasNamesForAncestors()
					&&
					asNamedParent()
				);

				function hasNamesForAncestors() {
					return (
						ancestorDirectoryNames
						&&
						pathSegmentIndex < ancestorDirectoryNames.length
					);
				}

				function asNamedParent() {
					return (
						{
							ancestorDirectoryNames:
								initial(ancestorDirectoryNames),
							items:
								getDependsUponWhenBaseAncestor()
								||
								items,
						}
					);

					function getDependsUponWhenBaseAncestor() {
						return (
							pathSegmentIndex === 0
							&&
							createDependsUponWithIdentifier(
								last(ancestorDirectoryNames),
							)
						);
					}
				}
			}
		}
	}

	function asChild() {
		if (isInParentDirectory)
			throw Error(`Paths where a child "${pathSegment}" is specified before a parent "${parentSegment}" are not supported.`);
		else
			return (
				{
					ancestorDirectoryNames,
					items:
						createDependsUponWithIdentifier(
							pathSegment,
						),
				}
			);
	}

	function createDependsUponWithIdentifier(
		identifier,
	) {
		return (
			whenHasItems()
			||
			identifier
		);

		function whenHasItems() {
			return (
				items
				&&
				{
					id: identifier,
					items,
				}
			);
		}
	}
}