// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
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
			{ className: "breadcrumbs" },
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
						createIdentifierHierarchyAnchor([]),
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