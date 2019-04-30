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
				createElement,
				element,
				getValueOfKey,
				resizableElementTypes,
				stack,
				subsetIdentifierHierarchy,
			}) =>
				createWithDependencyList({
					...keysAndValues.getObjectFromGetValueOfKey(getValueOfKey),
					createElement,
					element,
					resizableElementTypes,
					stack,
					subsetIdentifierHierarchy,
				}),
	};