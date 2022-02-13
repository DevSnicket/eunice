/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackFromLevels from "../../../../stackAndYamlTesting/createStackFromLevels";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

const sameIdentifier = "same";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		createItemYaml({
			id: "parent",
			items:
				[
					createItemYaml({
						dependsUpon: { id: "parent", items: sameIdentifier },
						id: sameIdentifier,
					}),
				],
		}),
});

function createStack() {
	const stack =
		createStackFromLevels(
			[ [ {
				id: "parent",
				items: [ [ { id: sameIdentifier } ] ],
			} ] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const parent = stack[0][0];

		const dependent = parent.items[0][0];

		dependent.dependsUpon =
			[ {
				ancestors: [ parent ],
				item: sameIdentifier,
				itemOrFirstAncestorItem: parent,
			} ];

		parent.dependents =
			[ { item: dependent } ];
	}
}