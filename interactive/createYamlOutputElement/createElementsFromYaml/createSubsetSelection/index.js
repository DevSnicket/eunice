/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createBreadcrumbElement = require("./createBreadcrumbElement"),
	createContainerForItemElement = require("./createContainerForItemElement"),
	createIdentifierAnchor = require("./createIdentifierAnchor"),
	identifierHierarchyArgument = require("./identifierHierarchyArgument");

require("./index.css");

module.exports =
	({
		createElement,
		getHrefWithKeysAndValues,
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
						identifierHierarchy[identifierHierarchy.length - 1],
				})
			);
		}

		function getHrefWithIdentifierHierarchy(
			identifierHierarchy,
		) {
			return (
				getHrefWithKeysAndValues(
					[
						{
							key,
							value:
								identifierHierarchyArgument.format(
									identifierHierarchy,
								),
						},
					],
				)
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