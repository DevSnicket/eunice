module.exports =
	({
		addPadding,
		createItemAndDependencyGroup,
		items,
		top,
		withPrecision,
	}) =>
		items
		.reduce(
			(aggregation, item) => {
				const left = addPadding(aggregation.right);

				const groupsAndSize =
					createItemAndDependencyGroup({
						item,
						left,
					});

				return (
					{
						bottom: Math.max(aggregation.bottom, top + groupsAndSize.height),
						groups: [ ...aggregation.groups, ...groupsAndSize.groups ],
						right: withPrecision(left + groupsAndSize.width),
					});
			},
			{
				bottom: 0,
				groups: [],
				right: 0,
			}
		);