/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createItemYaml from "../../../../stackAndYamlTesting/createItemYaml";
import createStackAndGetUpperAndLower from "./createStackAndGetUpperAndLower";
import testCreateStackFromYaml from "../../testCreateStackFromYaml";

testCreateStackFromYaml({
	stack:
		createStack(),
	yaml:
		[
			[
				createItemYaml({
					dependsUpon: "lower",
					id: "upper",
				}),
			],
			[ "lower" ],
		],
});

function createStack() {
	const { lower, stack, upper } = createStackAndGetUpperAndLower();

	upper.dependsUpon =
		[ {
			item: lower,
			itemOrFirstAncestorItem: lower,
		} ];

	lower.dependents =
		[ { item: upper } ];

	return stack;
}