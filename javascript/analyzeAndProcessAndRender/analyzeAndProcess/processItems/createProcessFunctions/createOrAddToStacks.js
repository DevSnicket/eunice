const { createOrAddToStacksUsingFileSystem } = require("@devsnicket/eunice-processors").stacking;

module.exports =
	({
		directory,
		items,
		rootItemIdentifier,
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
				whenHasRootItem()
				||
				whenSingleAnonymous()
			);

			function whenHasRootItem() {
				return (
					rootItemIdentifier
					&&
					[ rootItemIdentifier ]
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