/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		getLevelOrStackForTargetIdentifier,
		targetLevelOrStack,
	}) =>
		withGetItemsOrLevelsForTargetIdentifier(
			getLevelOrStackForTargetIdentifier,
		)
		.getStackForTargetLevelOrStack(
			targetLevelOrStack,
		);

function withGetItemsOrLevelsForTargetIdentifier(
	getLevelOrStackForTargetIdentifier,
) {
	return { getStackForTargetLevelOrStack };

	function getStackForTargetLevelOrStack(
		targetLevelOrStack,
	) {
		return whenTargetOfStack() || asTargetOfLevel();

		function whenTargetOfStack() {
			return (
				isStack(targetLevelOrStack)
				&&
				targetLevelOrStack.flatMap(getStackForTargetIdentifierOrLevel)
			);
		}

		function asTargetOfLevel() {
			return whenSingle() || flattenMultiple();

			function whenSingle() {
				return (
					targetLevelOrStack.length === 1
					&&
					getLevelOrStackForTargetIdentifier(targetLevelOrStack[0])
				);
			}

			function flattenMultiple() {
				return (
					targetLevelOrStack
					.flatMap(getLevelOrStackForTargetIdentifier)
					.flat()
				);
			}
		}
	}

	function getStackForTargetIdentifierOrLevel(
		targetIdentifierOrLevel,
	) {
		return (
			ensureIsStack(
				whenTargetOfLevel()
				||
				ensureIsLevel(
					getLevelOrStackForTargetIdentifier(
						targetIdentifierOrLevel,
					),
				),
			)
		);

		function whenTargetOfLevel() {
			return (
				Array.isArray(targetIdentifierOrLevel)
				&&
				targetIdentifierOrLevel.flatMap(
					getLevelOrStackForTargetIdentifier,
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