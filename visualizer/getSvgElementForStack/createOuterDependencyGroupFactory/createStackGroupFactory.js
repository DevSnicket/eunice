// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		aggregateGroupFactoriesWithOrientation,
		createGroupFactoryWhenRequired,
		dependencies,
		itemGroupWidth,
		levelGroupFactory,
	}) => {
		return (
			dependencies && (dependencies.above || dependencies.below)
			?
			createGroupFactoryWithDependencies()
			:
			levelGroupFactory
		);

		function createGroupFactoryWithDependencies() {
			return (
				aggregateGroupFactoriesWithOrientation.vertical({
					groupFactories:
						[
							...createGroupFactoriesForDependenciesInDirection(
								dependencies.above,
							),
							levelGroupFactory,
							...createGroupFactoriesForDependenciesInDirection(
								dependencies.below,
							),
						],
					spacing:
						0,
				})
			);

			function createGroupFactoriesForDependenciesInDirection(
				dependenciesInDirection,
			) {
				const groupFactory =
					createGroupFactoryForDependenciesWhenRequired({
						aggregateGroupFactoriesHorizontal:
							aggregateGroupFactoriesWithOrientation.horizontal,
						createGroupFactoryWhenRequired,
						dependenciesInDirection,
						itemGroup:
							{
								left: levelGroupFactory.itemGroupLeft,
								width: itemGroupWidth,
							},
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
								arrow:
									dependencies.arrow,
								count:
									dependencies.count,
								keys:
									{
										level:
											dependencies.level,
										relationship:
											dependencies.relationship,
									},
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