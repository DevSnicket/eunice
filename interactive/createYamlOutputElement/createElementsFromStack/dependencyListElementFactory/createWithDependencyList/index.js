// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createIsDependencyOfItemRelevant from "./createIsDependencyOfItemRelevant";
import createListElement from "./createListElement";
import { createResizableContainer } from "@devsnicket/eunice-test-harnesses";
import createSubset from "./createSubset";
import { findItemInStackWithIdentifierHierarchy } from "@devsnicket/eunice-dependency-and-structure";

export default ({
	areAncestorsIncluded,
	closeHref,
	createAncestorSeparatorElement,
	createElement,
	element,
	getHrefWithIdentifierHierarchy,
	identifier,
	levelDirection,
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
			levelDirection
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
						createSubsetOfItem({
							isDependencyOfItemRelevant:
								createIsDependencyOfItemRelevant({
									areAncestorsIncluded,
									levelDirection,
								}),
							item:
								findItemOrGetParent(),
						}),
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

	function createSubsetOfItem({
		isDependencyOfItemRelevant,
		item,
	}) {
		return (
			createSubset({
				isDependencyRelevant:
					dependency =>
						isDependencyOfItemRelevant({
							dependency,
							item,
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