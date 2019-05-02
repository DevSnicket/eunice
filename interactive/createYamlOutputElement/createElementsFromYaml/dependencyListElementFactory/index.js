const
	createWithDependencyList = require("./createWithDependencyList"),
	keysAndValues = require("./keysAndValues");

module.exports =
	{
		clearFromKeysAndValues:
			keysAndValues.clearFromKeysAndValues,
		createForDependencyCount:
			({
				createElement,
				element,
				getHrefKeysAndValues,
				identifier,
				level,
				relationship,
			}) =>
				createElement(
					"a",
					{
						xlinkHref:
							getHrefKeysAndValues(
								keysAndValues.getKeysAndValuesFromObject({
									identifier,
									level,
									relationship,
								}),
							),
					},
					element,
				),
		createWithDependencyList:
			({
				createAncestorSeparatorElement,
				createElement,
				createItemAnchor,
				element,
				getValueOfKey,
				resizableElementTypes,
				stack,
				subsetIdentifierHierarchy,
			}) =>
				createWithDependencyList({
					...keysAndValues.getObjectFromGetValueOfKey(getValueOfKey),
					createAncestorSeparatorElement,
					createElement,
					createItemAnchor,
					element,
					resizableElementTypes,
					stack,
					subsetIdentifierHierarchy,
				}),
	};