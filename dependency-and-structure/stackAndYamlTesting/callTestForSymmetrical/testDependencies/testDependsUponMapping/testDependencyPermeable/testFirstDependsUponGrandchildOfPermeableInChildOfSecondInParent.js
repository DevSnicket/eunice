/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createItemYaml from "../../../../createItemYaml";
import createStackFromLevels from "../../../../createStackFromLevels";

export default
/** @type {import("../../../Parameter.d")} */
({
	getActual,
	getExpected,
	getName,
}) => {
	const
		stack =
			createStack(),
		yaml =
			createItemYaml({
				id:
					"parent",
				items:
					[
						createItemYaml({
							dependsUpon:
								{
									id:
										"parent",
									items:
										{
											id: "second",
											items: "grandchildOfSecond",
										},
								},
							id:
								"first",
						}),
						createItemYaml({
							id:
								"second",
							items:
								{
									dependencyPermeable: true,
									id: "childOfSecond",
									items: "grandchildOfSecond",
								},
						}),
					],
			});

	test(
		getName({
			stackDescription:
				"first depends upon grandchild of permeable in child of second in parent",
			yaml,
		}),
		() =>
			expect(
				getActual({ stack, yaml }),
			)
			.toEqual(
				getExpected({ stack, yaml }),
			),
	);
};

function createStack() {
	const stack =
		createStackFromLevels(
			[ [ {
				id:
					"parent",
				items:
					[ [
						{ id: "first" },
						{
							id:
								"second",
							items:
								[ [ {
									dependencyPermeable: true,
									id: "childOfSecond",
									items: [ [ { id: "grandchildOfSecond" } ] ],
								} ] ],
						},
					] ],
			} ] ],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const parent = stack[0][0];

		const [ first, second ] = parent.items[0];

		const child = second.items[0][0];

		const grandchild = child.items[0][0];

		first.dependsUpon =
			[ {
				ancestors: [ second, parent ],
				item: grandchild,
				itemOrFirstAncestorItem: grandchild,
			} ];

		grandchild.dependents =
			[ { item: first } ];

		return stack;
	}
}