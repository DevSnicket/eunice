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
		[
			createItemYaml({
				dependsUpon: sameIdentifier,
				id: sameIdentifier,
				otherIdentifier: "dependent",
			}),
			createItemYaml({
				id: sameIdentifier,
				otherIdentifier: "dependsUpon",
			}),
		],
});

function createStack() {
	const stack =
		createStackFromLevels(
			[ [
				{
					id: sameIdentifier,
					otherIdentifier: "dependent",
				},
				{
					id: sameIdentifier,
					otherIdentifier: "dependsUpon",
				},
			] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ dependent, dependsUpon ] =
			stack[0];

		dependent.dependsUpon =
			[ {
				item: dependsUpon,
				itemOrFirstAncestorItem: dependsUpon,
			} ];

		dependsUpon.dependents =
			[ { item: dependent } ];
	}
}