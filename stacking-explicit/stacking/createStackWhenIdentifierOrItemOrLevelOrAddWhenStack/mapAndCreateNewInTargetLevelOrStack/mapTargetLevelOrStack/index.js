/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

const getStackOrSingleLevelOrSingleItem = require("../../getStackOrSingleLevelOrSingleItem");

module.exports =
	({
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
					.flatMap(getLevelOrStackForTargetIdentifierOrItem)
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
					getLevelOrStackForTargetIdentifierOrItem,
				)
			);
		}
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