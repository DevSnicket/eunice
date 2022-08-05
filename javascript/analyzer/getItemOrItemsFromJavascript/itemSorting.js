/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import groupBy from "lodash/groupBy";

export function moveVariablesThenParametersThenImportsToBottom(
	items,
) {
	return (
		items
		&&
		items.length
		&&
		sortItemsFromTypeGroups(
			groupBy(items, getRelevantTypeOf),
		)
	);

	function getRelevantTypeOf(
		{ type },
	) {
		return whenSpecified() || "other";

		function whenSpecified() {
			return (
				[ "import", "parameter", "variable" ].includes(type)
				&&
				type
			);
		}
	}

	/** @param {import("lodash").Dictionary<any[]>} parameter */
	function sortItemsFromTypeGroups({
		import: _import,
		other,
		parameter,
		variable,
	}) {
		return (
			[
				...other || [],
				...variable || [],
				...parameter || [],
				..._import || [],
			]
		);
	}
}

export function reverse(
	items,
) {
	return items && items.reverse();
}