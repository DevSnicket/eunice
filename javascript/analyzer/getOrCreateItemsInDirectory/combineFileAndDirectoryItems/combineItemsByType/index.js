/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import combineCustomProperties from "./combineCustomProperties";
import combineDependsUpon from "./combineDependsUpon";
import combineItems from "./combineItems";
import groupBy from "lodash/groupBy";

export default
items =>
	combineItemsGroupedByType(
		groupBy(
			items,
			({ type }) => type,
		),
	);

/** @param {import("lodash").Dictionary<any[]>} parameter */
function combineItemsGroupedByType({
	file: files,
	directory: directories,
	...unexpectedTypeGroups
}) {
	throwWhenAnyUnexpectedTypes(
		Object.keys(unexpectedTypeGroups),
	);

	return (
		{
			...combineCustomProperties([
				...directories,
				...files,
			]),
			...combineDependsUpon([
				...files,
				...directories,
			]),
			...combineItems({
				directories,
				files,
			}),
		}
	);
}

function throwWhenAnyUnexpectedTypes(
	types,
) {
	if (types.length)
		throw Error(`Unexpected types of ${formatTypes()}.`);

	function formatTypes() {
		return (
			types
			.map(type => `"${type}"`)
			.join(", ")
		);
	}
}