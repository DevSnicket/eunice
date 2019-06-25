/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		aggregateGroupFactoriesHorizontally,
		createGroupFactoryWhenRequired,
		dependencies,
		itemGroupFactory,
	}) => {
		return (
			dependencies
			?
			createGroupFactoryWithTopOffset(
				calculateTopOffset(),
			)
			:
			createGroupsFactoryWithoutDependencies(
				itemGroupFactory,
			)
		);

		function calculateTopOffset() {
			return (
				(itemGroupFactory.height - dependencies.arrow.height)
				/
				2
			);
		}

		function createGroupFactoryWithTopOffset(
			topOffset,
		) {
			const
				dependentsGroupFactory =
					createGroupFactoryWhenRequired({
						arrow: dependencies.arrow,
						count: dependencies.dependents,
						keys: createKeysForRelationship("dependents"),
					}),
				dependsUponGroupFactory =
					createGroupFactoryWhenRequired({
						arrow: dependencies.arrow,
						count: dependencies.dependsUpon,
						keys: createKeysForRelationship("dependsUpon"),
					});

			return (
				{
					...aggregateGroupFactoriesHorizontally({
						groupFactories:
							[
								...dependentsGroupFactory ? [ withTopOffset(dependentsGroupFactory) ] : [],
								itemGroupFactory,
								...dependsUponGroupFactory ? [ withTopOffset(dependsUponGroupFactory) ] : [],
							],
						spacing:
							0,
					}),
					itemGroupLeft:
						dependentsGroupFactory && dependentsGroupFactory.width,
				}
			);

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