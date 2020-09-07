// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createWithDependencyList from "./createWithDependencyList";

const keys =
	{
		identifier: "dependency-list-identifier",
		levelDirection: "dependency-list-level",
		relationship: "dependency-list-relationship",
	};

export default {
	createForDependencyCount:
		({
			createElement,
			element,
			getHrefWithKeysAndValues,
			identifier,
			levelDirection,
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
									levelDirection,
									relationship,
								},
						}),
				},
				element,
			),
	createWithDependencyList:
		({
			areAncestorsIncluded,
			createAncestorSeparatorElement,
			createElement,
			element,
			getHrefWithIdentifierHierarchy,
			locationHash,
			resizableElementTypes,
			stack,
		}) =>
			createWithDependencyList({
				areAncestorsIncluded,
				...locationHash.getValuesOfKeys(keys),
				closeHref:
					locationHash.getWithoutKeys(keys),
				createAncestorSeparatorElement,
				createElement,
				element,
				getHrefWithIdentifierHierarchy,
				locationHash,
				resizableElementTypes,
				stack,
			}),
	keys,
};