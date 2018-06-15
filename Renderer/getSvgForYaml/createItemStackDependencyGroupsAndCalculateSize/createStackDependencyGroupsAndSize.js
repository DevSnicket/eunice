module.exports =
	({
		createCountGroupFactoryWhenRequired,
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
			}));

		function createGroupsWithDependencies() {
			const groupsAndHeightForDependenciesAbove =
				createGroupsAndCalculateHeightForDependenciesWhenRequired({
					createCountGroupFactoryWhenRequired,
					dependenciesInDirection: dependencies.above,
					identifierGroup: notIndependentGroupsFactory.identifierGroup,
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
						createGroupsAndCalculateHeightForDependenciesWhenRequired({
							createCountGroupFactoryWhenRequired,
							dependenciesInDirection: dependencies.below,
							identifierGroup: notIndependentGroupsFactory.identifierGroup,
							top: top + groupsAndHeightForDependenciesAbove.height + notIndependentGroupsFactory.height,
							withPrecision,
						}),
					]
					:
					[
						createNotIndependentGroupsAndGetSize({
							notIndependentGroupsFactory,
							top,
						}),
						createGroupsAndCalculateHeightForDependenciesWhenRequired({
							createCountGroupFactoryWhenRequired,
							dependenciesInDirection: dependencies.below,
							identifierGroup: notIndependentGroupsFactory.identifierGroup,
							top: top + notIndependentGroupsFactory.height,
							withPrecision,
						}),
					]
				));
		}
	};


function createGroupsAndCalculateHeightForDependenciesWhenRequired({
	createCountGroupFactoryWhenRequired,
	dependenciesInDirection,
	identifierGroup,
	top,
	withPrecision,
}) {
	return (
		dependenciesInDirection
		&&
		createGroupsAndGetHeightFromFactory(
			createFactory()
		));

	function createFactory() {
		return (
			dependenciesInDirection
			.reduce(
				(aggregation, dependencies) => {
					const
						factory =
							createCountGroupFactoryWhenRequired({
								arrow: dependencies.arrow,
								count: dependencies.count,
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
			));
	}

	function createGroupsAndGetHeightFromFactory(
		factory
	) {
		const left =
			withPrecision(
				identifierGroup.left
				+
				((identifierGroup.width - factory.width) / 2)
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
		));
}