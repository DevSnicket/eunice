// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{
		createLinearHierarchyFromIdentifierSeparator,
		groupItemsByIdentifierSeparator,
		removeRedundantParentIdentifierPrefix,
		replacement: { replaceIdentifiers },
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
				createLinearHierarchyFromIdentifierSeparator({
					identifierSeparator,
					items:
						removeRedundantParentIdentifierPrefix({
							identifierSeparator,
							items:
								groupItemsByIdentifierSeparator({
									identifierSeparator,
									items,
								}),
						}),
				})
			);
		}
	};