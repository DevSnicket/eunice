module.exports =
	({
		createGroupFactoryWhenRequired,
		dependencies,
		notIndependentGroupsFactory,
		top,
		withPrecision,
	}) => {
		return (
			dependencies && (dependencies.above || dependencies.below)
			?
			createGroupsWithDependencies()
			:
			createNotIndependentGroupsAndGetSize({
				notIndependentGroupsFactory,
				top,
			})
		);

		function createGroupsWithDependencies() {
			const groupsAndHeightForDependenciesAbove =
				createGroupsAndCalculateHeightForDependenciesWhenRequired({
					createGroupFactoryWhenRequired,
					dependenciesInDirection: dependencies.above,
					itemGroup: notIndependentGroupsFactory.itemGroup,
					keySuffix: "above",
					top,
					withPrecision,
				});

			return (
				aggregateGroupsAndSizes(
					groupsAndHeightForDependenciesAbove
					?
					[
						groupsAndHeightForDependenciesAbove,
						createNotIndependentGroupsAndGetSize({
							notIndependentGroupsFactory,
							top: top + groupsAndHeightForDependenciesAbove.height,
						}),
						createGroupsAndCalculateHeightForDependenciesBelowWhenRequiredWithTopOffset(
							groupsAndHeightForDependenciesAbove.height
						),
					]
					:
					[
						createNotIndependentGroupsAndGetSize({
							notIndependentGroupsFactory,
							top,
						}),
						createGroupsAndCalculateHeightForDependenciesBelowWhenRequiredWithTopOffset(
							0
						),
					]
				)
			);

			function createGroupsAndCalculateHeightForDependenciesBelowWhenRequiredWithTopOffset(
				topOffset
			) {
				return (
					createGroupsAndCalculateHeightForDependenciesWhenRequired({
						createGroupFactoryWhenRequired,
						dependenciesInDirection: dependencies.below,
						itemGroup: notIndependentGroupsFactory.itemGroup,
						keySuffix: "below",
						top: top + notIndependentGroupsFactory.height + topOffset,
						withPrecision,
					})
				);
			}
		}
	};


function createGroupsAndCalculateHeightForDependenciesWhenRequired({
	createGroupFactoryWhenRequired,
	dependenciesInDirection,
	itemGroup,
	keySuffix,
	top,
	withPrecision,
}) {
	return (
		dependenciesInDirection
		&&
		createGroupsAndGetHeightFromFactory(
			createFactory()
		)
	);

	function createFactory() {
		return (
			dependenciesInDirection
			.reduce(
				(aggregation, dependencies) => {
					const
						factory =
							createGroupFactoryWhenRequired({
								arrow: dependencies.arrow,
								count: dependencies.count,
								keySuffix: `stack dependency ${dependencies.arrow.id} ${keySuffix}`,
							}),
						leftOffset =
							aggregation.width && aggregation.width + 4;

					return (
						{
							createGroupWithLefts:
							[
								...aggregation.createGroupWithLefts,
								left =>
									factory.create({
										left: left + leftOffset,
										top,
									}),
							],
							height:
								Math.max(aggregation.height, dependencies.arrow.height),
							width:
								leftOffset + factory.width,
						});
				},
				{ createGroupWithLefts: [], height: 0, width: 0 }
			)
		);
	}

	function createGroupsAndGetHeightFromFactory(
		factory
	) {
		const left =
			withPrecision(
				itemGroup.left
				+
				((itemGroup.width - factory.width) / 2)
			);

		return (
			{
				groups:
					factory.createGroupWithLefts.map(
						createGroupWithLeft => createGroupWithLeft(left)
					),
				height:
					factory.height,
			});
	}
}

function createNotIndependentGroupsAndGetSize({
	notIndependentGroupsFactory,
	top,
}) {
	return (
		{
			groups: notIndependentGroupsFactory.createWithTop(top),
			height: notIndependentGroupsFactory.height,
			width: notIndependentGroupsFactory.width,
		});
}

function aggregateGroupsAndSizes(
	groupsAndSizes
) {
	return (
		groupsAndSizes
		.reduce(
			(aggregation, groupAndSize) =>
				groupAndSize
				?
				{
					groups:
						[
							...aggregation.groups,
							...groupAndSize.groups,
						],
					height:
						aggregation.height + groupAndSize.height,
					width:
						groupAndSize.width ? Math.max(aggregation.width, groupAndSize.width) : aggregation.width,
				}
				:
				aggregation,
			{ groups: [], height: 0, width: 0 }
		)
	);
}