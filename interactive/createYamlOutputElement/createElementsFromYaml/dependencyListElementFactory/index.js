// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createWithDependencyList = require("./createWithDependencyList");


const keys =
	{
		identifier: "dependency-list-identifier",
		level: "dependency-list-level",
		relationship: "dependency-list-relationship",
	};

module.exports =
	{
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
				getValuesOfKeys,
				resizableElementTypes,
				stack,
				subsetIdentifierHierarchy,
			}) =>
				createWithDependencyList({
					...getValuesOfKeys(keys),
					createAncestorSeparatorElement,
					createElement,
					createIdentifierHierarchyAnchor,
					element,
					resizableElementTypes,
					stack,
					subsetIdentifierHierarchy,
				}),
		keys,
	};