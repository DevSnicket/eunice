// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	findItemInStackWithIdentifierHierarchy,
	isInnerStack,
} from "@devsnicket/eunice-dependency-and-structure";

import createListElement from "./createListElement";
import { createResizableContainer } from "@devsnicket/eunice-test-harnesses";
import createSubset from "./createSubset";
import isDependencyRelevant from "./isDependencyRelevant";

export default ({
	closeHref,
	createAncestorSeparatorElement,
	createElement,
	element,
	getHrefWithIdentifierHierarchy,
	identifier,
	level,
	locationHash,
	resizableElementTypes,
	relationship,
	stack,
}) => {
	return (
		createListInContainerWhenAny()
		||
		element
	);

	function createListInContainerWhenAny() {
		return (
			level
			&&
			relationship
			&&
			createVerticalResizeWithLowerElement(
				createListElement({
					closeHref,
					createAncestorSeparatorElement,
					createElement,
					getHrefWithIdentifierHierarchy,
					relationship,
					subset:
						createSubsetOfItem(
							findItemOrGetParent(),
						),
				}),
			)
		);
	}

	function findItemOrGetParent() {
		return (
			whenIdentifierSpecified()
			||
			stack.parent
		);

		function whenIdentifierSpecified() {
			return (
				identifier
				&&
				findItemInStackWithIdentifierHierarchy({
					identifierHierarchy: [ identifier ],
					stack,
				})
			);
		}
	}

	function createSubsetOfItem(
		item,
	) {
		return (
			createSubset({
				isDependencyRelevant:
					dependency =>
						isDependencyRelevant({
							dependency,
							isInnerStack,
							item,
							levelDirection: level,
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