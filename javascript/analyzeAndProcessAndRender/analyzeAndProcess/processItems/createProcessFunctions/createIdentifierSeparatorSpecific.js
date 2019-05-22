const
	{
		groupItemsByIdentifierSeparator,
		removeRedundantParentIdentifierPrefix,
		replaceIdentifiers,
	} = require("@devsnicket/eunice-processors");

module.exports =
	({
		identifierPrefixOfRootItems,
		identifierSeparator,
	}) => {
		return { addPrefixToRoot, groupItems, removeIndexFileSuffix };

		function removeIndexFileSuffix(
			items,
		) {
			return (
				replaceIdentifiers({
					items,
					pattern:
						new RegExp(`${identifierSeparator}index$|^index$`),
					replacement:
						"",
					rootOnly:
						false,
				})
			);
		}

		function addPrefixToRoot(
			items,
		) {
			return (
				identifierPrefixOfRootItems
				?
				addPrefixToRootAnonymous(
					addPrefixToRootIdentifiable(
						items,
					),
				)
				:
				items
			);
		}

		function addPrefixToRootIdentifiable(
			items,
		) {
			return (
				replaceIdentifiers({
					items,
					pattern: /.+/,
					replacement: `${identifierPrefixOfRootItems}${identifierSeparator}$&`,
					rootOnly: true,
				})
			);
		}

		function addPrefixToRootAnonymous(
			items,
		) {
			return (
				replaceIdentifiers({
					items,
					pattern: /^$/,
					replacement: identifierPrefixOfRootItems,
					rootOnly: true,
				})
			);
		}

		function groupItems(
			items,
		) {
			return (
				removeRedundantParentIdentifierPrefix({
					identifierSeparator,
					items:
						groupItemsByIdentifierSeparator({
							identifierSeparator,
							items,
						}),
				})
			);
		}
	};