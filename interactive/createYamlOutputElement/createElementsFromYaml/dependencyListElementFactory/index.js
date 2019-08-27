// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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
				createIdentifierHierarchyAnchor,
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
					createIdentifierHierarchyAnchor,
					element,
					resizableElementTypes,
					stack,
					subsetIdentifierHierarchy,
				}),
	};