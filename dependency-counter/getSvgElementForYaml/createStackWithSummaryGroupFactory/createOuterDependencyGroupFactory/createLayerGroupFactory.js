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
				calculateTopOffset()
			)
			:
			createGroupsFactoryWithoutDependencies(
				itemGroupFactory
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
			topOffset
		) {
			const
				dependentsGroupFactory =
					createGroupFactoryWhenRequired({
						arrow: dependencies.arrow,
						count: dependencies.dependents,
						keySuffix: prefixKeySuffix("dependents"),
					}),
				dependsUponGroupFactory =
					createGroupFactoryWhenRequired({
						arrow: dependencies.arrow,
						count: dependencies.dependsUpon,
						keySuffix: prefixKeySuffix("depends upon"),
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

			function prefixKeySuffix(
				keySuffix
			) {
				return `not independent ${keySuffix}`;
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
	itemGroupFactory
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