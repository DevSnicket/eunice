// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createWithDependencyList from "./createWithDependencyList";

const keys =
	{
		identifier: "dependency-list-identifier",
		level: "dependency-list-level",
		relationship: "dependency-list-relationship",
	};

export default {
	createForDependencyCount:
		({
			createElement,
			element,
			getHrefWithKeysAndValues,
			identifier,
			level,
			relationship,
		}) =>
			createElement(
				"a",
				{
					xlinkHref:
						getHrefWithKeysAndValues({
							keys,
							values:
								{
									identifier,
									level,
									relationship,
								},
						}),
				},
				element,
			),
	createWithDependencyList:
		({
			createAncestorSeparatorElement,
			createElement,
			createIdentifierHierarchyAnchor,
			element,
			locationHash,
			resizableElementTypes,
			stack,
			subsetIdentifierHierarchy,
		}) =>
			createWithDependencyList({
				...locationHash.getValuesOfKeys(keys),
				closeHref:
					locationHash.getWithoutKeys(keys),
				createAncestorSeparatorElement,
				createElement,
				createIdentifierHierarchyAnchor,
				element,
				locationHash,
				resizableElementTypes,
				stack,
				subsetIdentifierHierarchy,
			}),
	keys,
};