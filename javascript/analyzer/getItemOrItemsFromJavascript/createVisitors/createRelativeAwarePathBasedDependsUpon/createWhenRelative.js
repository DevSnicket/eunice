/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import path from "path";

export default ({
	items,
	sourceDirectoryRelativePath,
	targetPathSegments,
}) => {
	return (
		isRelativePathSegment(targetPathSegments[0])
		&&
		(whenAnyPathSegments() || whenIsParent())
	);

	function whenAnyPathSegments() {
		return (
			targetPathSegments.length > 1
			&&
			targetPathSegments
			.reduceRight(
				(itemsInHierarchy, pathSegment) =>
					getOrCreateParentDependsUpon({
						items:
							itemsInHierarchy,
						pathSegment,
					}),
				items,
			)
		);
	}

	function whenIsParent() {
		return (
			sourceDirectoryRelativePath
			&&
			getOrCreateParentDependsUpon({
				items,
				pathSegment:
					path.basename(sourceDirectoryRelativePath),
			})
		);
	}
};

function getOrCreateParentDependsUpon({
	pathSegment,
	items,
}) {
	return (
		whenRelativeSegment()
		||
		whenHasItems()
		||
		pathSegment
	);

	function whenRelativeSegment() {
		return (
			isRelativePathSegment(pathSegment)
			&&
			items
		);
	}

	function whenHasItems() {
		return (
			items
			&&
			{
				id: pathSegment,
				items,
			}
		);
	}
}

function isRelativePathSegment(
	pathSegment,
) {
	return pathSegment === ".";
}