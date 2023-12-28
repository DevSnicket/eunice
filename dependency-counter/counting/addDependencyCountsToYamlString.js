/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import {
	addDirectionAndMutualStackToDependenciesInStack,
	createStackFromYaml,
	createYamlFromStack,
} from "../../dependency-and-structure";

import {
	safeDump as formatYaml,
	safeLoad as parseYaml,
} from "js-yaml";

import countOfItem from "./countOfItem";

export default function addDependencyCountsToYamlString(
	content,
) {
	const stack =
		createStackFromYaml(
			// @ts-ignore
			parseYaml(
				content,
			),
		);

	addDirectionAndMutualStackToDependenciesInStack(stack);

	addDependencyCountsInStack(stack);

	return formatStackAsYaml(stack);
}

function addDependencyCountsInStack(
	stack,
) {
	for (const level of stack)
		for (const item of level) {
			const dependencyCount = countOfItem(item);

			if (dependencyCount)
				item.dependencyCount = dependencyCount;

			if (item.items)
				addDependencyCountsInStack(item.items);
		}
}

function formatStackAsYaml(
	stack,
) {
	return (
		formatYaml(
			createYamlFromStack(stack),
			{ lineWidth: Number.MAX_SAFE_INTEGER },
		)
		.trimRight()
	);
}