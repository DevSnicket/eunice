// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "./index.css";

import createDependencyElementFactory from "./createDependencyElementFactory";
import getItemIdentifierHierarchy from "./getItemIdentifierHierarchy";

export default ({
	closeHref,
	createAncestorSeparatorElement,
	createElement,
	getHrefWithIdentifierHierarchy,
	relationship,
	subset,
}) => {
	return (
		subset
		&&
		createElement(
			"div",
			{ className: `dependency-list ${relationship}` },
			[
				createElement(
					"a",
					{
						href: closeHref,
						id: "close",
						key: "close",
					},
					"\u00D7",
				),
				createElement(
					"div",
					{ key: "body" },
					createChildElements(),
				),
			],
		)
	);

	function createChildElements() {
		return (
			withElementFactory({
				createDependencyElements:
					createDependencyElementFactory({
						createAncestorSeparatorElement,
						createItemInIdentifierHierarchyElement,
					}).createElements,
				createElement,
				createItemInIdentifierHierarchyElement,
			})
			.createElementsForSubset(subset)
		);
	}

	function createItemInIdentifierHierarchyElement({
		identifierHierarchy,
		item: { id, items },
	}) {
		return whenHasItems() || id;

		function whenHasItems() {
			return (
				items
				&&
				createElement(
					"a",
					{
						href: getHrefWithIdentifierHierarchy(identifierHierarchy),
						key: id,
					},
					id,
				)
			);
		}
	}
};

function withElementFactory({
	createDependencyElements,
	createElement,
	createItemInIdentifierHierarchyElement,
}) {
	return { createElementsForSubset };

	function createElementsForSubset(
		subset,
	) {
		return (
			[
				createItemInIdentifierHierarchyElement({
					identifierHierarchy:
						getItemIdentifierHierarchy(
							subset.item,
						),
					item:
						subset.item,
				}),
				createDependenciesElement(
					subset.dependencies,
				),
				createChildItemsElement(
					subset.items,
				),
			]
		);
	}

	function createDependenciesElement(
		dependencies,
	) {
		return (
			dependencies
			&&
			createElement(
				"ul",
				{
					className: "item-dependencies",
					key: "item-dependencies",
				},
				dependencies.map(
					dependency =>
						createElement(
							"li",
							getKeyPropertyForItem(dependency),
							...createDependencyElements(dependency),
						),
				),
			)
		);
	}

	function createChildItemsElement(
		items,
	) {
		return (
			items
			&&
			createElement(
				"ul",
				{
					className: "child-items",
					key: "child-items",
				},
				items
				.sort(compareItemIdentifiers)
				.map(createChildItemElement),
			)
		);
	}

	function createChildItemElement(
		childItem,
	) {
		return (
			createElement(
				"li",
				getKeyPropertyForItem(childItem.item),
				createElementsForSubset(childItem),
			)
		);
	}

	function getKeyPropertyForItem(
		item,
	) {
		return { key: getKey() };

		function getKey() {
			return (
				getItemIdentifierHierarchy(item)
				.join("/")
			);
		}
	}
}

function compareItemIdentifiers(
	left,
	right,
) {
	return (
		getItemIdentifierForCompare(left)
		.localeCompare(
			getItemIdentifierForCompare(right),
		)
	);
}

function getItemIdentifierForCompare(
	{ item: { id } },
) {
	return id || "";
}