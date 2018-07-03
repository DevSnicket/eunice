module.exports =
	({
		addPadding,
		createItemGroupsContainer,
		stack,
	}) =>
		stack
		.reduce(
			(aggregation, items) => {
				const container =
					createItemGroupsContainer({
						items,
						top: addPadding(aggregation.bottom),
					});

				return (
					{
						bottom: container.bottom,
						elements: [ ...aggregation.elements, ...container.groups ],
						right: Math.max(aggregation.right, container.right),
					});
			},
			{ bottom: 0, elements: [], right: 0 }
		);