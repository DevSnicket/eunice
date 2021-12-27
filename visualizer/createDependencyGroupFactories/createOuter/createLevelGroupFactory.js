// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { horizontal as aggregateGroupFactoriesHorizontally } from "../../aggregateGroupFactoriesWithOrientation";

export default ({
	arrow,
	contentGroupFactory,
	createGroupFactoryWhenRequired,
	outerSameCount,
}) => {
	return (
		whenHasDependencyCount()
		||
		createGroupsFactoryWithoutDependencies(
			contentGroupFactory,
		)
	);

	function whenHasDependencyCount() {
		return (
			outerSameCount
			&&
			createGroupFactoryWithTopOffset(
				calculateTopOffset(),
			)
		);
	}

	function calculateTopOffset() {
		return (
			(contentGroupFactory.height - arrow.height)
			/
			2
		);
	}

	function createGroupFactoryWithTopOffset(
		topOffset,
	) {
		const
			dependentsGroupFactory = createGroupFactoryForRelationship("dependents"),
			dependsUponGroupFactory = createGroupFactoryForRelationship("dependsUpon");

		return (
			(dependentsGroupFactory || dependsUponGroupFactory)
			&&
			{
				...aggregateGroupFactoriesHorizontally({
					groupFactories: [ ...getGroupFactories() ],
					spacing: 0,
				}),
				itemGroupLeft:
					dependentsGroupFactory && dependentsGroupFactory.width,
			}
		);

		function createGroupFactoryForRelationship(
			relationship,
		) {
			const groupFactory =
				createGroupFactoryWhenRequired({
					arrow,
					count: outerSameCount[relationship],
					keys: createKeysForRelationship(relationship),
				});

			return (
				groupFactory
				&&
				withTopOffset(groupFactory)
			);
		}

		function createKeysForRelationship(
			relationship,
		) {
			return (
				{
					level: "same",
					relationship,
				}
			);
		}

		function withTopOffset({
			createAtPosition,
			height,
			width,
		}) {
			return (
				{
					createAtPosition:
						({
							left,
							top,
						}) =>
							createAtPosition({
								left,
								top: top + topOffset,
							}),
					height,
					width,
				}
			);
		}

		function * getGroupFactories() {
			if (dependentsGroupFactory)
				yield dependentsGroupFactory;

			yield contentGroupFactory;

			if (dependsUponGroupFactory)
				yield dependsUponGroupFactory;
		}
	}
};

function createGroupsFactoryWithoutDependencies(
	itemGroupFactory,
) {
	return (
		{
			createAtPosition:
				position => [ itemGroupFactory.createAtPosition(position) ],
			height:
				itemGroupFactory.height,
			itemGroupLeft:
				0,
			width:
				itemGroupFactory.width,
		});
}