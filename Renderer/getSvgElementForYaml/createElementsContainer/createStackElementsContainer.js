module.exports =
	({
		createItemGroupsContainer,
		stack,
		top,
		withPrecision,
	}) => {
		return (
			stack
			.reduce(
				aggregate,
				{ bottom: top, elements: [], right: 0 }
			)
		);

		function aggregate(
			aggregation,
			items,
			index
		) {
			const container =
				createItemGroupsContainer({
					items,
					top: getTop(),
				});

			return (
				{
					bottom: container.bottom,
					elements: [ ...aggregation.elements, ...container.groups ],
					right: Math.max(aggregation.right, container.right),
				});

			function getTop() {
				return (
					withPrecision(
						aggregation.bottom
						+
						(index ? 15 : 0)
					)
				);
			}
		}
	};