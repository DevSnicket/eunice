// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import * as aggregateGroupFactoriesWithOrientation from "../../aggregateGroupFactoriesWithOrientation";
import spacing from "../spacing";

export default ({
	arrows,
	createGroupFactoryWhenRequired,
	itemGroupWidth,
	levelGroupFactory,
	outerCount,
}) => {
	return (
		aggregateGroupFactoriesWithOrientation.vertical({
			groupFactories:
				[ ...createGroupFactories() ],
			spacing:
				0,
		})
	);

	function * createGroupFactories() {
		yield* (
			createLevelDirectionGroupFactory({
				levelDirection:
					"above",
				relationshipDirections:
					{
						down: "dependents",
						up: "dependsUpon",
					},
			})
		);

		yield levelGroupFactory;

		yield* (
			createLevelDirectionGroupFactory({
				levelDirection:
					"below",
				relationshipDirections:
					{
						down: "dependsUpon",
						up: "dependents",
					},
			})
		);

		function * createLevelDirectionGroupFactory({
			levelDirection,
			relationshipDirections,
		}) {
			const dependencyCountInLevelDirection =
				outerCount[levelDirection];

			if (dependencyCountInLevelDirection)
				yield (
					createGroupFactoryCentered(
						aggregateGroupFactoriesWithOrientation.horizontal({
							groupFactories:
								[ "down", "up" ]
								.flatMap(createArrowDirectionGroupFactory),
							spacing,
						}),
					)
				);


			function createArrowDirectionGroupFactory(
				arrowDirection,
			) {
				return whenHasCount() || [];

				function whenHasCount() {
					const relationshipDirection =
						relationshipDirections[arrowDirection];

					const count =
						dependencyCountInLevelDirection[relationshipDirection];

					return (
						count
						&&
						createGroupFactoryWhenRequired({
							arrow:
								arrows[arrowDirection],
							count,
							keys:
								{
									level: levelDirection,
									relationship: relationshipDirection,
								},
						})
					);
				}
			}
		}
	}

	function createGroupFactoryCentered({
		createAtPosition,
		height,
		width,
	}) {
		const leftOffsetOfCenter =
			levelGroupFactory.itemGroupLeft + ((itemGroupWidth - width) / 2);

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
};