/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import {
	createOrAddToStacksOfParentMatch,
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack,
} from "../../../../../stacking-explicit";

import { safeLoad as parseYaml } from "js-yaml";
import { readFileSync } from "fs";
import replaceIdentifiersAndItemsAndLevelsAndStacks from "../../../../../stacking-explicit/replaceIdentifiersAndItemsAndLevelsAndStacks";

export default ({
	filePath,
	identifierOrItemOrLevelOrStack,
	key,
	pattern,
}) => {
	return whenSpecified() || identifierOrItemOrLevelOrStack;

	function whenSpecified() {
		return (
			filePath
			&&
			withTargetLevelOrStack(
				readTargetYaml(),
			)
			.modifyStacks({
				identifierOrItemOrLevelOrStack,
				key,
				pattern,
			})
		);
	}

	function readTargetYaml() {
		return (
			parseYaml(
				readFileSync(
					filePath,
					"utf-8",
				),
			)
		);
	}
};

function withTargetLevelOrStack(
	targetLevelOrStack,
) {
	const addNewInTarget = false;

	return { modifyStacks };

	function modifyStacks({
		identifierOrItemOrLevelOrStack,
		key,
		pattern,
	}) {
		return whenHasKeyAndPattern() || uniformly();

		function whenHasKeyAndPattern() {
			return (
				key && pattern
				&&
				createOrAddToStacksOfParentMatch({
					addNewInTarget,
					identifierOrItemOrLevelOrStack,
					keysAndPatterns:
						[ {
							key,
							pattern,
						} ],
					targetLevelOrStack,
				})
			);
		}

		function uniformly() {
			return (
				replaceIdentifiersAndItemsAndLevelsAndStacks({
					identifierOrItemOrLevelOrStack,
					replace: modifyStack,
				})
			);
		}
	}

	function modifyStack(
		{ identifierOrItemOrLevelOrStack },
	) {
		return (
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				addNewInTarget,
				identifierOrItemOrLevelOrStack,
				targetLevelOrStack,
			})
		);
	}
}