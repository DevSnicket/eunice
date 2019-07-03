/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		createAncestorSeparatorElement,
		createElement,
		createIdentifierHierarchyAnchor,
		subsetIdentifierHierarchy,
	}) => {
		return (
			subsetIdentifierHierarchy
			&&
			createElement(
				"div",
				null,
				...createElements(),
			)
		);

		function createElements() {
			return (
				subsetIdentifierHierarchy
				.reduce(
					(aggregation, identifier, index) =>
						isIndexOfLast(index)
						?
						aggregation
						:
						aggregate({
							aggregation,
							identifier,
						}),
					createInitialRootAggregation(),
				)
				.elements
			);
		}

		function isIndexOfLast(
			index,
		) {
			return index === subsetIdentifierHierarchy.length - 1;
		}

		function createInitialRootAggregation() {
			return (
				{
					elements:
						[
							createElement(
								"a",
								{ href: "#" },
								"root",
							),
						],
					identifierHierarchy:
						[],
				}
			);
		}

		function aggregate({
			aggregation,
			identifier,
		}) {
			const identifierHierarchy =
				[
					...aggregation.identifierHierarchy,
					identifier,
				];

			return (
				{
					elements:
						[
							...aggregation.elements,
							createAncestorSeparatorElement(),
							createIdentifierHierarchyAnchor(identifierHierarchy),
						],
					identifierHierarchy,
				}
			);
		}
	};