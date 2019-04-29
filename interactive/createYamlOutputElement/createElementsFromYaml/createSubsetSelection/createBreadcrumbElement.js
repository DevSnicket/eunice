module.exports =
	({
		createElement,
		getHrefWithIdentifierHierarchy,
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
							" > ",
							createAnchor(
								identifier
								?
								{
									...getHrefProperty(),
									content: identifier,
								}
								:
								{
									...getHrefProperty(),
									content: "anonymous",
									style: { fontStyle: "italic" },
								},
							),
						],
					identifierHierarchy,
				}
			);

			function getHrefProperty() {
				return (
					{
						href:
							getHrefWithIdentifierHierarchy(
								identifierHierarchy,
							),
					}
				);
			}
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