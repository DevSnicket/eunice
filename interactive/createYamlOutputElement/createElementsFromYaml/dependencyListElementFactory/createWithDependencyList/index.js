// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	findDirectionBetweenItemsInFirstMutualStack,
	findItemInStackWithIdentifierHierarchy,
	isInnerStack,
} from "@devsnicket/eunice-dependency-and-structure";

import createListElement from "./createListElement";
import { createResizableContainer } from "@devsnicket/eunice-test-harnesses";
import createSubsetOfItem from "./createSubsetOfItem";
import isDependencyRelevant from "./isDependencyRelevant";

export default ({
	closeHref,
	createAncestorSeparatorElement,
	createElement,
	createIdentifierHierarchyAnchor,
	element,
	identifier,
	level,
	locationHash,
	resizableElementTypes,
	relationship,
	stack,
	subsetIdentifierHierarchy,
}) => {
	return (
		createListInContainerWhenAny()
		||
		element
	);

	function createListInContainerWhenAny() {
		return (
			allParametersSpecified()
			&&
			createVerticalResizeWithLowerElement(
				createListElement({
					closeHref,
					createAncestorSeparatorElement,
					createElement,
					createIdentifierHierarchyAnchor,
					relationship,
					subset:
						createSubset(),
				}),
			)
		);
	}

	function allParametersSpecified() {
		return (
			identifier
			&&
			level
			&&
			relationship
		);
	}

	function createSubset() {
		const item =
			findItemInStackWithIdentifierHierarchy({
				identifierHierarchy:
					[
						...subsetIdentifierHierarchy || [],
						identifier,
					],
				stack,
			});

		return (
			createSubsetOfItem({
				isDependencyRelevant:
					dependency =>
						isDependencyRelevant({
							dependency,
							findDirectionBetweenItemsInFirstMutualStack,
							isInnerStack,
							item,
							level,
						}),
				item,
				relationship,
			})
		);
	}

	function createVerticalResizeWithLowerElement(
		lowerElement,
	) {
		return (
			lowerElement
			&&
			createResizableContainer({
				createElement,
				flexKeysAndValues:
					locationHash,
				items:
					[
						{ element },
						{
							element: lowerElement,
							flex: { key: "dependency-list-height" },
						},
					],
				orientation:
					"horizontal",
				resizableElementTypes,
			})
		);
	}
};