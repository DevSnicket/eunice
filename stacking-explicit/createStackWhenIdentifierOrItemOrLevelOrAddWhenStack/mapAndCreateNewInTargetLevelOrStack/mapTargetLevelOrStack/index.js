/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";

import getStackOrSingleLevelOrSingleItem from "../../getStackOrSingleLevelOrSingleItem";

export default ({
	getLevelOrStackForTargetIdentifierOrItem,
	targetLevelOrStack,
}) =>
	withGetLevelOrStackForTargetIdentifierOrItem(
		getLevelOrStackForTargetIdentifierOrItem,
	)
	.mapTargetLevelOrStack(
		targetLevelOrStack,
	);

function withGetLevelOrStackForTargetIdentifierOrItem(
	getLevelOrStackForTargetIdentifierOrItem,
) {
	return { mapTargetLevelOrStack };

	function mapTargetLevelOrStack(
		targetLevelOrStack,
	) {
		return (
			simplifyStructureWhenLevelOrStack(
				whenTargetOfStack() || asTargetOfLevel(),
			)
		);

		function whenTargetOfStack() {
			return (
				isStack(targetLevelOrStack)
				&&
				targetLevelOrStack.flatMap(getStackForTargetIdentifierOrLevel)
			);
		}

		function asTargetOfLevel() {
			return (
				targetLevelOrStack.length === 1
				?
				getSingle()
				:
				flattenMultiple()
			);

			function getSingle() {
				return (
					getLevelOrStackForTargetIdentifierOrItem(
						targetLevelOrStack[0],
					)
				);
			}

			function flattenMultiple() {
				return (
					targetLevelOrStack
					.flatMap(getEmptyLevelOrStackForTargetIdentifierOrItem)
					.flat()
				);
			}
		}
	}

	function getStackForTargetIdentifierOrLevel(
		targetIdentifierOrItemOrLevel,
	) {
		return (
			ensureIsStack(
				whenTargetOfLevel()
				||
				ensureIsLevel(
					getLevelOrStackForTargetIdentifierOrItem(
						targetIdentifierOrItemOrLevel,
					),
				),
			)
		);

		function whenTargetOfLevel() {
			return (
				Array.isArray(targetIdentifierOrItemOrLevel)
				&&
				targetIdentifierOrItemOrLevel.flatMap(
					getEmptyLevelOrStackForTargetIdentifierOrItem,
				)
			);
		}
	}

	function getEmptyLevelOrStackForTargetIdentifierOrItem(
		targetIdentifierOrItem,
	) {
		return (
			getLevelOrStackForTargetIdentifierOrItem(
				targetIdentifierOrItem,
			)
			||
			[]
		);
	}
}

function ensureIsStack(
	levelOrStack,
) {
	return (
		whenEmptyOrStack()
		||
		[ levelOrStack ]
	);

	function whenEmptyOrStack() {
		return isEmptyOrStack() && levelOrStack;

		function isEmptyOrStack() {
			return (
				!levelOrStack.length
				||
				isStack(levelOrStack)
			);
		}
	}
}

function ensureIsLevel(
	itemOrLevel,
) {
	return whenLevel() || [ itemOrLevel ];

	function whenLevel() {
		return (
			Array.isArray(itemOrLevel)
			&&
			itemOrLevel
		);
	}
}

function isStack(
	levelOrStack,
) {
	return levelOrStack.some(Array.isArray);
}

function simplifyStructureWhenLevelOrStack(
	identifierOrItemOrLevelOrStack,
) {
	return (
		Array.isArray(identifierOrItemOrLevelOrStack)
		?
		whenLevelOrStack()
		:
		identifierOrItemOrLevelOrStack
	);

	function whenLevelOrStack() {
		return (
			identifierOrItemOrLevelOrStack.length
			?
			getStackOrSingleLevelOrSingleItem(identifierOrItemOrLevelOrStack)
			:
			null
		);
	}
}