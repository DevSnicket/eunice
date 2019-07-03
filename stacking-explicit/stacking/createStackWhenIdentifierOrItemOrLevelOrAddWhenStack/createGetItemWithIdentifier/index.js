/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	identifierOrItemOrLevelOrStack => {
		return (
			whenNoValue()
			||
			whenLevelOrStack()
			||
			whenItem()
			||
			getIdentifierWhenIsIdentifier
		);

		function whenNoValue() {
			return (
				!identifierOrItemOrLevelOrStack
				&&
				// identifier parameter intentionally ignored as there are no items
				// eslint-disable-next-line no-unused-vars
				(identifier => null)
			);
		}

		function whenLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				createGetItemWithIdentifierFromLevelOrStack(identifierOrItemOrLevelOrStack)
			);
		}

		function whenItem() {
			return (
				identifierOrItemOrLevelOrStack.id
				&&
				getItemWhenHasIdentifier
			);

			function getItemWhenHasIdentifier(
				identifier,
			) {
				return (
					identifier === identifierOrItemOrLevelOrStack.id
					&&
					identifierOrItemOrLevelOrStack
				);
			}
		}

		function getIdentifierWhenIsIdentifier(
			identifier,
		) {
			return (
				identifier === identifierOrItemOrLevelOrStack
				&&
				identifierOrItemOrLevelOrStack
			);
		}
	};

function createGetItemWithIdentifierFromLevelOrStack(
	levelOrStack,
) {
	const itemsByIdentifier = new Map(generateKeyValuePairs());

	return getItemWithIdentifier;

	function * generateKeyValuePairs() {
		for (const identifierOrItemOrLevel of levelOrStack)
			if (Array.isArray(identifierOrItemOrLevel))
				for (const identifierOrItem of identifierOrItemOrLevel)
					yield getKeyValuePairForIdentifierOrItem(identifierOrItem);
			else
				yield getKeyValuePairForIdentifierOrItem(identifierOrItemOrLevel);
	}

	function getItemWithIdentifier(
		identifier,
	) {
		return itemsByIdentifier.get(identifier);
	}
}

function getKeyValuePairForIdentifierOrItem(
	identifierOrItem,
) {
	return (
		[
			identifierOrItem.id || identifierOrItem,
			identifierOrItem,
		]
	);
}