// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { replacement: { replaceIdentifiersAndItems } } = require("@devsnicket/eunice-processors");

module.exports =
	({
		dependencyPermeableIdentifiers,
		items,
	}) => {
		return (
			whenHasIdentifiers()
			||
			items
		);

		function whenHasIdentifiers() {
			return (
				dependencyPermeableIdentifiers
				&&
				withDependencyPermeableIdentifiers(
					dependencyPermeableIdentifiers,
				)
				.setDependencyPermeable(
					items,
				)
			);
		}
	};

function withDependencyPermeableIdentifiers(
	dependencyPermeableIdentifiers,
) {
	return { setDependencyPermeable };

	function setDependencyPermeable(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			replaceIdentifiersAndItems({
				identifierOrItemOrLevelOrStack,
				replace,
			})
		);
	}

	function replace(
		{ identifierOrItem },
	) {
		return (
			whenIdentifier()
			||
			whenItem()
			||
			identifierOrItem
		);

		function whenIdentifier() {
			return (
				isDependencyPermeableIdentifier(identifierOrItem)
				&&
				{
					dependencyPermeable: true,
					id: identifierOrItem,
				}
			);
		}

		function whenItem() {
			return (
				isDependencyPermeableIdentifier(identifierOrItem.id)
				&&
				{
					...identifierOrItem,
					dependencyPermeable: true,
				}
			);
		}
	}

	function isDependencyPermeableIdentifier(
		identifier,
	) {
		return dependencyPermeableIdentifiers.includes(identifier);
	}
}