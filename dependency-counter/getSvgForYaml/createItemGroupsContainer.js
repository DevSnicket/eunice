module.exports =
	({
		addPadding,
		createDependencyGroupsAndCalculateSize,
		createTextGroup,
		font,
		items,
		top,
		withPrecision,
	}) =>
		items
		.reduce(
			(aggregation, item) => {
				const left = addPadding(aggregation.right);

				const groupsAndSize =
					createDependencyGroupsAndCalculateSize({
						identifierGroupFactory:
							createIdentifierGroupFactory({
								createTextGroup,
								font,
								identifier: item.id,
							}),
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

function createIdentifierGroupFactory({
	createTextGroup,
	font,
	identifier,
}) {
	const
		height = 40,
		width = font.measure(identifier) + 20;

	return (
		{
			create:
				({
					left,
					top,
				}) =>
					createTextGroup({
						attributes: null,
						className: "item",
						elementName: "rect",
						height,
						left,
						paddingRight: 0,
						text: identifier,
						top,
						width,
					}),
			height,
			width,
		});
}