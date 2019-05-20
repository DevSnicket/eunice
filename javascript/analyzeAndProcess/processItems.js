const
	{
		groupItemsByIdentifierSeparator,
		sorting:
			{
				orderItemsByIdentifier,
				orderItemsByIndexOfType,
			},
		stacking:
			{
				createOrAddToStacksToItemsWithIdentifier,
				createOrAddToStacksUniformly,
			},
		removeRedundantParentIdentifierPrefix,
		removeSelfDependentItemsOfType,
		replaceIdentifiers,
		setIdentifierOfAnonymousToParent,
		setTypeOfRootItems,
		unstackIndependent,
	} = require("@devsnicket/eunice-processors");

module.exports =
	({
		identifierSeparator,
		items,
		rootPrefix,
	}) => {
		const
			{
				addPrefixToRoot,
				groupItems,
				removeIndexFileSuffix,
			} = createIdentifierSeparatorSpecific({
				identifierSeparator,
				rootPrefix,
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
			]
			.reduce(
				(itemsAggregation, process) =>
					process(itemsAggregation),
				items,
			)
		);
	};

function createIdentifierSeparatorSpecific({
	identifierSeparator,
	rootPrefix,
}) {
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
			rootPrefix
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
				replacement: `${rootPrefix}${identifierSeparator}$&`,
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
				replacement: rootPrefix,
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
}

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