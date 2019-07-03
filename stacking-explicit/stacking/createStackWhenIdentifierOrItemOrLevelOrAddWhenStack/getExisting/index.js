/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flat")
.shim();

const
	filterIdentifierOrItemOrLevelOrStack = require("./filterIdentifierOrItemOrLevelOrStack"),
	getStackOrSingleLevelOrSingleItem = require("../getStackOrSingleLevelOrSingleItem");

module.exports =
	({
		identifierOrItemOrLevelOrStack,
		targetLevelOrStack,
	}) =>
		identifierOrItemOrLevelOrStack
		&&
		getStackOrSingleLevelOrSingleItem(
			filterIdentifierOrItemOrLevelOrStack({
				identifierOrItemOrLevelOrStack,
				identifierOrItemPredicate:
					withTargetIdentifiers(
						new Set(targetLevelOrStack.flat(2)),
					)
					.isIdentifierOrItemIncluded,
			}),
		);

function withTargetIdentifiers(
	targetIdentifiers,
) {
	return { isIdentifierOrItemIncluded };

	function isIdentifierOrItemIncluded(
		identifierOrItem,
	) {
		return (
			isIdentifierNotInTarget(
				identifierOrItem.id
				||
				identifierOrItem,
			)
		);
	}

	function isIdentifierNotInTarget(
		identifier,
	) {
		return (
			identifier === "existing"
			||
			!targetIdentifiers.has(identifier)
		);
	}
}