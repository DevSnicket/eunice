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
					aggregate,
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
		}
	);
}

function aggregate(
	aggregation,
	identifier
) {
	const href = aggregation.hrefBase + encodeURIComponent(identifier);

	return (
		{
			elements:
				[
					...aggregation.elements,
					" > ",
					createAnchor({
						href,
						identifier,
					}),
				],
			hrefBase:
				`${href}/`,
		}
	);
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