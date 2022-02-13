/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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