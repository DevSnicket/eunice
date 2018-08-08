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
						content: "root",
						href: "#",
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
		const content =
			identifier
			||
			createAnonymousElement();

		return (
			aggregation.index === count - 1
			?
			content
			:
			createAnchor({
				content,
				href,
			})
		);
	}
}

function createAnonymousElement() {
	return (
		createElement(
			"span",
			{ style: { fontStyle: "italic" } },
			"anonymous"
		)
	);
}

function createAnchor({
	content,
	href,
}) {
	return (
		createElement(
			"a",
			{
				href,
				key: href,
			},
			content
		)
	);
}