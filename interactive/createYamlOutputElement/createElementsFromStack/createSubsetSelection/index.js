// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "./index.css";

import createBreadcrumbElement from "./createBreadcrumbElement";
import createContainerForItemElement from "./createContainerForItemElement";
import createIdentifierAnchor from "./createIdentifierAnchor";
import identifierHierarchyArgument from "./identifierHierarchyArgument";

export default ({
	createElement,
	getHrefWithKeyAndValue,
	getValueOfKey,
}) => {
	const subsetIdentifierHierarchy =
		splitIdentifierHierarchy(
			getValueOfKey(key),
		);

	return (
		{
			createAncestorSeparatorElement,
			createBreadcrumbElement:
				() =>
					createBreadcrumbElement({
						createAncestorSeparatorElement,
						createElement,
						createIdentifierHierarchyAnchor,
						subsetIdentifierHierarchy,
					}),
			createContainerForItemElement:
				({
					element,
					item,
				}) =>
					createContainerForItemElement({
						createElement,
						element,
						getHrefWithIdentifierHierarchy,
						item,
						subsetIdentifierHierarchy,
					}),
			getHrefWithIdentifierHierarchy,
			identifierHierarchy:
				subsetIdentifierHierarchy,
		}
	);

	function createAncestorSeparatorElement() {
		return (
			createElement(
				"span",
				{ className: "ancestor-separator" },
				"\u2013",
			)
		);
	}

	function createIdentifierHierarchyAnchor(
		identifierHierarchy,
	) {
		return (
			createIdentifierAnchor({
				createElement,
				href:
					getHrefWithIdentifierHierarchy(identifierHierarchy),
				identifier:
					getIdentifier(),
			})
		);

		function getIdentifier() {
			return (
				whenRoot()
				||
				identifierHierarchy[identifierHierarchy.length - 1]
			);

			function whenRoot() {
				return (
					!identifierHierarchy.length
					&&
					"root"
				);
			}
		}
	}

	function getHrefWithIdentifierHierarchy(
		identifierHierarchy,
	) {
		return (
			getHrefWithKeyAndValue({
				key,
				value:
					identifierHierarchyArgument.format(
						identifierHierarchy,
					),
			})
		);
	}
};

function splitIdentifierHierarchy(
	identifierHierarchy,
) {
	return (
		identifierHierarchy
		&&
		identifierHierarchyArgument.parse(identifierHierarchy)
	);
}

const key = "subset-item";