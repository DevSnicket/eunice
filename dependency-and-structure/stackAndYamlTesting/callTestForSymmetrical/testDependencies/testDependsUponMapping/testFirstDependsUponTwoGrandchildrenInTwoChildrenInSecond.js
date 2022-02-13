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
										id: "firstChildOfSecond",
										items: "firstGrandchildOfSecond",
									},
									{
										id: "secondChildOfSecond",
										items: "secondGrandchildOfSecond",
									},
								],
						},
					id:
						"first",
				}),
				createItemYaml({
					id:
						"second",
					items:
						[
							createItemYaml({
								id: "firstChildOfSecond",
								items: "firstGrandchildOfSecond",
							}),
							createItemYaml({
								id: "secondChildOfSecond",
								items: "secondGrandchildOfSecond",
							}),
						],
				}),
			];

	test(
		getName({
			stackDescription:
				"first depends upon two grandchildren in two children in second",
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
					{
						id: "second",
						items:
							[ [
								{
									id: "firstChildOfSecond",
									items: [ [ { id: "firstGrandchildOfSecond" } ] ],
								},
								{
									id: "secondChildOfSecond",
									items: [ [ { id: "secondGrandchildOfSecond" } ] ],
								},
							] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const
			[
				firstChildOfSecond,
				secondChildOfSecond,
			]
			=
			second.items[0];

		const
			[
				firstGrandchildOfSecond,
				secondGrandchildOfSecond,
			]
			=
			[
				firstChildOfSecond.items[0][0],
				secondChildOfSecond.items[0][0],
			];

		first.dependsUpon =
			[
				{
					ancestors: [ firstChildOfSecond, second ],
					item: firstGrandchildOfSecond,
					itemOrFirstAncestorItem: firstGrandchildOfSecond,
				},
				{
					ancestors: [ secondChildOfSecond, second ],
					item: secondGrandchildOfSecond,
					itemOrFirstAncestorItem: secondGrandchildOfSecond,
				},
			];

		firstGrandchildOfSecond.dependents =
			[ { item: first } ];

		secondGrandchildOfSecond.dependents =
			[ { item: first } ];
	}
}