/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createItemYaml from "../../../createItemYaml";
import createStackFromLevels from "../../../createStackFromLevels";

export default
/** @type {import("../../Parameter.d")} */
({
	getActual,
	getExpected,
	getName,
}) => {
	const
		stack =
			createStack(),
		yaml =
			[
				createItemYaml({
					dependsUpon:
						{
							id:
								"second",
							items:
								[
									{
										id: "missingChild1",
										items: "missingGrandchild1",
									},
									{
										id: "missingChild2",
										items: "missingGrandchild2",
									},
								],
						},
					id:
						"first",
				}),
				"second",
			];

	test(
		getName({
			stackDescription:
				"first depends upon two missing grandchildren in two missing children in second",
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
			[
				[
					{ id: "first" },
					{ id: "second" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		first.dependsUpon =
			[
				{
					ancestors: [ "missingChild1", second ],
					item: "missingGrandchild1",
					itemOrFirstAncestorItem: second,
				},
				{
					ancestors: [ "missingChild2", second ],
					item: "missingGrandchild2",
					itemOrFirstAncestorItem: second,
				},
			];

		second.dependents =
			[ { item: first } ];
	}
}