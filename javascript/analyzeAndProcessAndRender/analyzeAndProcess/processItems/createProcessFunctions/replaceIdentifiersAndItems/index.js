/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import replaceIdentifiersAndItemsAndLevelsAndStacks from "../../../../../../stacking-explicit/replaceIdentifiersAndItemsAndLevelsAndStacks";

export default ({
	identifierOrItemOrLevelOrStack,
	replace,
}) =>
	replaceIdentifiersAndItemsAndLevelsAndStacks({
		identifierOrItemOrLevelOrStack,
		replace:
			withReplaceIdentifierOrItem(replace)
			.replaceIdentifierOrItemOrLevelOrStack,
	});

function withReplaceIdentifierOrItem(
	replaceIdentifierOrItem,
) {
	return { replaceIdentifierOrItemOrLevelOrStack };

	function replaceIdentifierOrItemOrLevelOrStack({
		ancestors,
		identifierOrItemOrLevelOrStack,
	}) {
		return identifierOrItemOrLevelOrStack && replaceValue();

		function replaceValue() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				?
				getLevelOrStackOrSingleItem(
					mapFilter(
						identifierOrItemOrLevelOrStack,
						withAncestors(ancestors).replaceIdentifierOrItemOrLevel,
					),
				)
				:
				replaceIdentifierOrItem({
					ancestors,
					identifierOrItem: identifierOrItemOrLevelOrStack,
				})
			);
		}
	}

	function withAncestors(
		ancestors,
	) {
		return { replaceIdentifierOrItemOrLevel };

		function replaceIdentifierOrItemOrLevel(
			identifierOrItemOrLevel,
		) {
			return (
				Array.isArray(identifierOrItemOrLevel)
				?
				replaceLevel(identifierOrItemOrLevel)
				:
				replaceIdentifierOrItem({
					ancestors,
					identifierOrItem:
						identifierOrItemOrLevel,
				})
			);
		}

		function replaceLevel(
			level,
		) {
			return (
				mapFilter(
					level,
					identifierOrItem =>
						replaceIdentifierOrItem({
							ancestors,
							identifierOrItem,
						}),
				)
			);
		}
	}
}

function mapFilter(
	array,
	selector,
) {
	return (
		getWhenNotEmpty(
			array
			.map(selector)
			.filter(item => item),
		)
	);
}

function getWhenNotEmpty(
	array,
) {
	return whenEmpty() || null;

	function whenEmpty() {
		return array.length && array;
	}
}

function getLevelOrStackOrSingleItem(
	array,
) {
	return whenSingle() || array;

	function whenSingle() {
		return (
			array
			&&
			array.length === 1
			&&
			getLevelOrStackOrSingleItem(array[0])
		);
	}
}