// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createStackFromYaml } from "@devsnicket/eunice-dependency-and-structure";
import createSubsetSelection from "./createSubsetSelection";
import dependencyListElementFactory from "./dependencyListElementFactory";
import { getSvgElementForStack } from "@devsnicket/eunice-renderer";
import getTextWidth from "string-pixel-width";
import { safeLoad as parseYaml } from "js-yaml";

export default ({
	createElement,
	locationHash,
	resizableElementTypes,
	yaml,
}) => {
	const
		stack =
			yaml
			&&
			createStackFromYaml(parseYaml(yaml)),
		subsetSelection =
			createSubsetSelection({
				createElement,
				getHrefWithKeyAndValue:
					({ key, value }) =>
						locationHash.getWithKeysAndValues({
							keys:
								{
									[key]: key,
									...dependencyListElementFactory.keys,
								},
							values:
								{ [key]: value },
						}),
				getValueOfKey:
					locationHash.getValueOfKey,
			});

	return (
		createWithDependencyList(
			createBreadcrumbAndSvgElement(),
		)
	);

	function createWithDependencyList(
		element,
	) {
		return (
			dependencyListElementFactory.createWithDependencyList({
				createAncestorSeparatorElement:
					subsetSelection.createAncestorSeparatorElement,
				createElement,
				createIdentifierHierarchyAnchor:
					subsetSelection.createIdentifierHierarchyAnchor,
				element,
				locationHash,
				resizableElementTypes,
				stack,
				subsetIdentifierHierarchy:
					subsetSelection.identifierHierarchy,
			})

		);
	}

	function createBreadcrumbAndSvgElement() {
		return (
			createElement(
				"div",
				{ style: { padding: "0.5em" } },
				subsetSelection.createBreadcrumbElement(),
				getSvgElementForStack({
					createElement,
					elementContainerFactory:
						createElementContainerFactory(),
					getTextWidth,
					namespaces:
						{ xmlnsXlink: "http://www.w3.org/1999/xlink" },
					stack,
					style:
						"a{cursor:pointer}",
					subsetIdentifierHierarchy:
						subsetSelection.identifierHierarchy,
				}),
			)
		);
	}

	function createElementContainerFactory() {
		return (
			{
				createForDependencyCount: createElementContainerForDependencyCount,
				createForItem: createElementContainerForItem,
			}
		);

		function createElementContainerForDependencyCount({
			element,
			item,
			level,
			relationship,
		}) {
			return (
				dependencyListElementFactory.createForDependencyCount({
					createElement,
					element,
					getHrefWithKeysAndValues:
						locationHash.getWithKeysAndValues,
					identifier: item.id,
					level,
					relationship,
				})
			);
		}

		function createElementContainerForItem({
			element,
			item,
		}) {
			return (
				subsetSelection.createContainerForItemElement({
					element,
					item,
				})
			);
		}
	}
};