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