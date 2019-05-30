const { createOrAddToStacksUsingFileSystem } = require("@devsnicket/eunice-processors").stacking;

module.exports =
	({
		directory,
		identifierPrefixOfRootItems,
		items,
	}) => {
		return (
			createOrAddToStacksUsingFileSystem({
				directory,
				items,
				subsetIdentifierHierarchy:
					createSubsetIdentifierHierarchy(),
			})
		);

		function createSubsetIdentifierHierarchy() {
			return (
				whenPrefixed()
				||
				whenSingleAnonymous()
			);

			function whenPrefixed() {
				return (
					identifierPrefixOfRootItems
					&&
					[ identifierPrefixOfRootItems ]
				);
			}

			function whenSingleAnonymous() {
				return (
					!Array.isArray(items)
					&&
					!items.id
					&&
					// the items id property wont be defined
					// eslint-disable-next-line no-undefined
					[ undefined ]
				);
			}
		}
	};