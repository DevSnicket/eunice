module.exports =
	({
		aggregateGroupFactoriesWithOrientation,
		createGroupFactoryWhenRequired,
		dependencies,
		itemGroupWidth,
		layerGroupFactory,
	}) => {
		return (
			dependencies && (dependencies.above || dependencies.below)
			?
			createGroupFactoryWithDependencies()
			:
			layerGroupFactory
		);

		function createGroupFactoryWithDependencies() {
			return (
				aggregateGroupFactoriesWithOrientation.vertical({
					groupFactories:
						[
							...createGroupFactoriesForDependenciesInDirection({
								dependenciesInDirection: dependencies.above,
								keySuffix: "above",
							}),
							layerGroupFactory,
							...createGroupFactoriesForDependenciesInDirection({
								dependenciesInDirection: dependencies.below,
								keySuffix: "below",
							}),
						],
					spacing:
						0,
				})
			);

			function createGroupFactoriesForDependenciesInDirection({
				dependenciesInDirection,
				keySuffix,
			}) {
				const groupFactory =
					createGroupFactoryForDependenciesWhenRequired({
						aggregateGroupFactoriesHorizontal:
							aggregateGroupFactoriesWithOrientation.horizontal,
						createGroupFactoryWhenRequired,
						dependenciesInDirection,
						itemGroup:
							{
								left: layerGroupFactory.itemGroupLeft,
								width: itemGroupWidth,
							},
						keySuffix,
					});

				return groupFactory ? [ groupFactory ] : [];
			}
		}
	};


function createGroupFactoryForDependenciesWhenRequired({
	aggregateGroupFactoriesHorizontal,
	createGroupFactoryWhenRequired,
	dependenciesInDirection,
	itemGroup,
	keySuffix,
}) {
	return (
		dependenciesInDirection
		&&
		createGroupFactoryCentered(
			aggregateGroupFactoriesHorizontal({
				groupFactories:
					dependenciesInDirection
					.map(
						dependencies =>
							createGroupFactoryWhenRequired({
								arrow: dependencies.arrow,
								count: dependencies.count,
								keySuffix: `stack dependency ${dependencies.arrow.id} ${keySuffix}`,
							}),
					),
				spacing:
					4,
			}),
		)
	);

	function createGroupFactoryCentered({
		createAtPosition,
		height,
		width,
	}) {
		const leftOffsetOfCenter =
			itemGroup.left + ((itemGroup.width - width) / 2);

		return (
			{
				createAtPosition:
					({
						left,
						top,
					}) =>
						createAtPosition({
							left: left + leftOffsetOfCenter,
							top,
						}),
				height,
				width,
			});
	}
}