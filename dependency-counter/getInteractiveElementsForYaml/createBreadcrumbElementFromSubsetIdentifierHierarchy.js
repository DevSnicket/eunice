module.exports =
	({
		createElement,
		subsetIdentifierHierarchy,
	}) => {
		return (
			subsetIdentifierHierarchy
			&&
			createElement(
				"div",
				null,
				createElements(),
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
							createAnchor({
								content: "root",
								href: "#",
							}),
						],
					hrefBase:
						"#",
				}
			);
		}

		function aggregate({
			aggregation,
			identifier,
		}) {
			const href = aggregation.hrefBase + encodeURIComponent(identifier);

			return (
				{
					elements:
						[
							...aggregation.elements,
							" > ",
							createAnchor(
								identifier
								?
								{
									content: identifier,
									href,
								}
								:
								{
									content: "anonymous",
									href,
									style: { fontStyle: "italic" },
								},
							),
						],
					hrefBase:
						`${href}/`,
				}
			);
		}

		function createAnchor({
			content,
			href,
			style = null,
		}) {
			return (
				createElement(
					"a",
					{
						href,
						key: href,
						...style && { style },
					},
					content,
				)
			);
		}
	};