const
	{
		groupItemsByIdentifierSeparator,
		removeRedundantParentIdentifierPrefix,
		replaceIdentifiers,
	} = require("@devsnicket/eunice-processors");

module.exports =
	identifierSeparator => {
		return { groupItems, removeIndexFileSuffix };

		function removeIndexFileSuffix(
			items,
		) {
			return (
				replaceIdentifiers({
					items,
					pattern:
						new RegExp(`${getIdentifierSeparatorEscaped()}index$|^index$`),
					replacement:
						"",
					rootOnly:
						false,
				})
			);

			function getIdentifierSeparatorEscaped() {
				return identifierSeparator.replace("\\", "\\\\");
			}
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