const
	{
		sorting:
			{
				orderItemsByIdentifier,
				orderItemsByIndexOfType,
			},
		stacking:
			{
				createOrAddToStacksToItemsWithIdentifier,
				createOrAddToStacksUniformly,
				createOrAddToStacksUsingFileSystem,
			},
		removeSelfDependentItemsOfType,
		setIdentifierOfAnonymousToParent,
		setTypeOfRootItems,
		unstackIndependent,
	} = require("@devsnicket/eunice-processors"),
	createIdentifierSeparatorSpecific = require("./createIdentifierSeparatorSpecific");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		identifierPrefixOfRootItems,
		identifierSeparator,
	}) => {
		const
			{
				addPrefixToRoot,
				groupItems,
				removeIndexFileSuffix,
			} = createIdentifierSeparatorSpecific({
				identifierPrefixOfRootItems,
				identifierSeparator,
			});

		return (
			[
				removeIndexFileSuffix,
				addPrefixToRoot,
				setTypeOfRootToFile,
				orderItemsByIdentifier,
				groupItems,
				setIdentifierOfAnonymousToParent,
				removeSelfDependentVariables,
				orderItemsByType,
				stackBinAndTestAtTop,
				addJestMethodsToBottom,
				unstackIndependent,
				createOrAddToStacks,
			]
		);

		function createOrAddToStacks(
			items,
		) {
			return (
				createOrAddToStacksUsingFileSystem({
					directory:
						directoryToCreateOrAddToStacksFrom,
					items,
					subsetIdentifierHierarchy:
						identifierPrefixOfRootItems
						&&
						[ identifierPrefixOfRootItems ],
				})
			);
		}
	};

function setTypeOfRootToFile(
	items,
) {
	return (
		setTypeOfRootItems({
			items,
			type: "file",
		})
	);
}

function removeSelfDependentVariables(
	items,
) {
	return (
		removeSelfDependentItemsOfType({
			items,
			type: "variable",
		})
	);
}

function orderItemsByType(
	items,
) {
	return (
		orderItemsByIndexOfType({
			items,
			typesInOrder:
				// the type property wont be defined
				// eslint-disable-next-line no-undefined
				[ undefined, "parameter", "variable", "file" ],
		})
	);
}

function stackBinAndTestAtTop(
	items,
) {
	return (
		createOrAddToStacksUniformly({
			identifiersInNewStack:
				[
					[ "bin", "test" ],
					"existing",
				],
			items,
		})
	);
}

function addJestMethodsToBottom(
	items,
) {
	return (
		createOrAddToStacksToItemsWithIdentifier({
			identifierPattern:
				/^test$|test[A-Z]/,
			identifiersInNewStack:
				[
					[ "existing" ],
					[ "expect", "test" ],
				],
			items,
		})
	);
}