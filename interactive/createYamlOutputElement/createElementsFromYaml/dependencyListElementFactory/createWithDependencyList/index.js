/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createListElement = require("./createListElement"),
	createSubsetOfItem = require("./createSubsetOfItem"),
	createVerticalResize = require("./createVerticalResize"),
	{
		findDirectionBetweenItemsInFirstMutualStack,
		findItemInStackWithIdentifierHierarchy,
		isInnerStack,
	} = require("@devsnicket/eunice-dependency-and-structure"),
	isDependencyRelevant = require("./isDependencyRelevant");

module.exports =
	({
		createAncestorSeparatorElement,
		createElement,
		createIdentifierHierarchyAnchor,
		element,
		identifier,
		level,
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
						createAncestorSeparatorElement,
						createElement,
						createIdentifierHierarchyAnchor,
						relationship,
						subset: createSubset(),
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
				createVerticalResize({
					createElement,
					elements:
						{
							lower: lowerElement,
							upper: element,
						},
					resizableElementTypes,
				})
			);
		}
	};