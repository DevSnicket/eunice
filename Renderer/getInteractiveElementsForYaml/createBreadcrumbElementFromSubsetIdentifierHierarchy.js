const { createElement } = require("react");

module.exports =
	subsetIdentifierHierarchy => {
		return (
			subsetIdentifierHierarchy
			&&
			createElement(
				"div",
				null,
				createElements()
			)
		);

		function createElements() {
			return (
				subsetIdentifierHierarchy
				.reduce(
					(aggregation, identifier) =>
						aggregate({
							aggregation,
							count: subsetIdentifierHierarchy.length,
							identifier,
						}),
					createInitialRootAggregation()
				)
				.elements
			);
		}
	};

function createInitialRootAggregation() {
	return (
		{
			elements:
				[
					createAnchor({
						href: "#",
						identifier: "root",
					}),
				],
			hrefBase:
				"#",
			index:
				0,
		}
	);
}

function aggregate({
	aggregation,
	count,
	identifier,
}) {
	const href = aggregation.hrefBase + encodeURIComponent(identifier);

	return (
		{
			elements:
				[
					...aggregation.elements,
					" > ",
					createAnchorOrGetIdentifierWhenLast(),
				],
			hrefBase:
				`${href}/`,
			index:
				aggregation.index + 1,
		}
	);

	function createAnchorOrGetIdentifierWhenLast() {
		return (
			aggregation.index === count - 1
			?
			identifier
			:
			createAnchor({
				href,
				identifier,
			})
		);
	}
}

function createAnchor({
	href,
	identifier,
}) {
	return (
		createElement(
			"a",
			{
				href,
				key: href,
			},
			identifier
		)
	);
}