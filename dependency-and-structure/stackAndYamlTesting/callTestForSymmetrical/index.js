/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createFirstAndSecondLevel from "./createFirstAndSecondLevel";
import createItemYaml from "../createItemYaml";
import createParentChildLevels from "../createParentChildLevels";
import createStackFromLevels from "../createStackFromLevels";
import createUpperAndLowerStack from "../createUpperAndLowerStack";
import formatStackForDescription from "../formatStackForDescription";
import testDependencies from "./testDependencies";

export default
/** @type {import("./Parameter.d")} */
stackAndYamlTest => {
	describe(
		"symmetrical",
		() => {
			createSimpleLevelsTestCases()
			.forEach(testSideWithSimpleLevels);

			testDependencies(stackAndYamlTest);
		},
	);

	function testSideWithSimpleLevels({
		levels,
		yaml,
	}) {
		const stack = createStackFromLevels(levels);

		test(
			stackAndYamlTest.getName({
				stackDescription: formatStackForDescription(stack),
				yaml,
			}),
			() =>
				expect(stackAndYamlTest.getActual({ stack, yaml }))
				.toEqual(stackAndYamlTest.getExpected({ stack, yaml })),
		);
	}
};

function createSimpleLevelsTestCases() {
	return (
		[
			{
				levels: [ [ {} ] ],
				yaml: {},
			},
			{
				levels:
					[ [ { id: "item" } ] ],
				yaml:
					"item",
			},
			{
				levels:
					[
						[
							{
								id: "item",
								otherProperty: "otherValue",
							},
						],
					],
				yaml:
					{
						id: "item",
						otherProperty: "otherValue",
					},
			},
			{
				levels:
					[ createFirstAndSecondLevel() ],
				yaml:
					[ "first", "second" ],
			},
			{
				levels:
					createUpperAndLowerStack(),
				yaml:
					[ [ "upper" ], [ "lower" ] ],
			},
			{
				levels:
					[
						[
							{ items: [ [ { id: "item" } ] ] },
						],
					],
				yaml:
					{ items: "item" },
			},
			{
				levels:
					createParentChildLevels(),
				yaml:
					{
						id: "parent",
						items: "child",
					},
			},
			{
				levels:
					[
						[
							{
								dependsUpon: [ { item: "missing" } ],
								id: "item",
							},
						],
					],
				yaml:
					createItemYaml({
						dependsUpon: "missing",
						id: "item",
					}),
			},
			{
				levels:
					[
						[
							{
								dependsUpon:
									[
										{ item: "missing1" },
										{ item: "missing2" },
									],
								id:
									"item",
							},
						],
					],
				yaml:
					createItemYaml({
						dependsUpon: [ "missing1", "missing2" ],
						id: "item",
					}),
			},
		]
	);
}