// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createBreadcrumbElement = require("./createBreadcrumbElement"),
	createContainerForItemElement = require("./createContainerForItemElement"),
	createIdentifierAnchor = require("./createIdentifierAnchor"),
	identifierHierarchyArgument = require("./identifierHierarchyArgument");

require("./index.css");

module.exports =
	({
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
				createIdentifierHierarchyAnchor,
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