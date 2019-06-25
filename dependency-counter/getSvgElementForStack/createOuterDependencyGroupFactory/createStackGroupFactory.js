/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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