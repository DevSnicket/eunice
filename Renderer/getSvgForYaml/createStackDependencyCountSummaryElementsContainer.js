module.exports =
	({
		arrows,
		createDependencyCountGroupFactoryWhenRequired,
		counts,
		stackElementsContainer,
	}) => {
		return (
			counts.length
			?
			create()
			:
			stackElementsContainer);

		function create() {
			const top = stackElementsContainer.bottom + 10;

			return (
				createContainer({
					arrowRight:
						arrows.right,
					elements:
						createGroupsWhenRequired({
							groupFactories:
								createDependencyCountGroupFactories({
									arrows,
									countsByDirection:
										getCountsByDirection({
											arrowDown: arrows.down,
											counts,
										}),
									createDependencyCountGroupFactoryWhenRequired,
								}),
							stackElementsWidth: stackElementsContainer.right,
							top,
						}),
					stackElementsContainer,
					top,
				})
			);
		}
	};

function getCountsByDirection({
	arrowDown,
	counts,
}) {
	return (
		counts.reduce(
			(aggregation, count) => {
				const downAndUpCounts =
					getDownAndUpCounts({
						arrowDown,
						counts: count.below,
					});

				return (
					{
						down:
							aggregation.down
							+
							downAndUpCounts.down,
						same:
							aggregation.same
							+
							count.same.dependsUpon,
						up:
							aggregation.up
							+
							downAndUpCounts.up,
					}
				);
			},
			{ down: 0, same: 0, up: 0 }
		)
	);
}

function getDownAndUpCounts({
	arrowDown,
	counts,
}) {
	return (
		counts
		?
		counts.reduce(
			(aggregation, count) =>
				count.arrow == arrowDown
				?
				{ down: aggregation.down + 1, up: aggregation.up }
				:
				{ down: aggregation.down, up: aggregation.up + 1 },
			{ down: 0, up: 0 }
		)
		:
		{ down: 0, up: 0 }
	);
}

function createDependencyCountGroupFactories({
	arrows,
	createDependencyCountGroupFactoryWhenRequired,
	countsByDirection,
}) {
	return (
		[
			createDependencyCountGroupFactoryWhenRequired({
				arrow: arrows.down,
				count: countsByDirection.down,
			}),
			createDependencyCountGroupFactoryWhenRequired({
				arrow: arrows.up,
				count: countsByDirection.up,
			}),
			createDependencyCountGroupFactoryWhenRequired({
				arrow: arrows.right,
				count: countsByDirection.same,
			}),
		]
		.filter(groupFactory => groupFactory));
}

function createGroupsWhenRequired({
	groupFactories,
	stackElementsWidth,
	top,
}) {
	return (
		groupFactories
		&&
		groupFactories
		.reduce(
			(aggregation, groupFactory) => (
				{
					groups:
						[
							...aggregation.groups,
							groupFactory.create({ left: aggregation.left, top }),
						],
					left:
						aggregation.left + groupFactory.width + 4,
				}
			),
			{ groups: [], left: calculateLeft() }
		)
		.groups
	);

	function calculateLeft() {
		return (
			(stackElementsWidth - sumWidth())
			/
			2
		);
	}

	function sumWidth() {
		return (
			groupFactories.reduce(
				(sum, groupFactory) => sum + groupFactory.width,
				0
			)
		);
	}
}

function createContainer({
	arrowRight,
	elements,
	stackElementsContainer,
	top,
}) {
	return (
		elements && elements.length
		?
		{
			bottom:
				top + arrowRight.height,
			elements:
				[
					...stackElementsContainer.elements,
					...elements,
				],
			right:
				stackElementsContainer.right,
		}
		:
		stackElementsContainer
	);
}