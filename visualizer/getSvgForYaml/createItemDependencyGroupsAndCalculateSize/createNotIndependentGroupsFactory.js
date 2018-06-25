module.exports =
	({
		createGroupFactoryWhenRequired,
		dependencies,
		itemGroupFactory,
		left,
		withPrecision,
	}) => {
		return (
			dependencies
			?
			createGroupsFactoryWithDependencies({
				createGroupFactoryWhenRequired,
				dependencies,
				itemGroupFactory,
				left,
				topOffset: calculateTopOffset(),
				withPrecision,
			})
			:
			createGroupsFactoryWithoutDependencies({
				itemGroupFactory,
				left,
			})
		);

		function calculateTopOffset() {
			return (
				withPrecision(
					(itemGroupFactory.height - dependencies.arrow.height)
					/
					2
				)
			);
		}
	};

function createGroupsFactoryWithDependencies({
	createGroupFactoryWhenRequired,
	dependencies,
	itemGroupFactory,
	left,
	topOffset,
	withPrecision,
}) {
	const
		dependentsGroupFactory =
			createGroupFactoryWithLeftWhenRequired({
				arrow: dependencies.arrow,
				count: dependencies.dependents,
				createGroupFactoryWhenRequired,
				left,
			}),
		itemGroupLeft =
			withPrecision(
				left
				+
				(dependentsGroupFactory && dependentsGroupFactory.width)
			);

	return (
		createGroupsFactoryFromDependsUponGroupFactory(
			createDependsUponGroupFactory()
		)
	);

	function createDependsUponGroupFactory() {
		return (
			createGroupFactoryWithLeftWhenRequired({
				arrow: dependencies.arrow,
				count: dependencies.dependsUpon,
				createGroupFactoryWhenRequired,
				left: withPrecision(itemGroupLeft + itemGroupFactory.width),
			})
		);
	}

	function createGroupsFactoryFromDependsUponGroupFactory(
		dependsUponGroupFactory
	) {
		return (
			{
				createWithTop:
					createGroupsWithTop,
				height:
					itemGroupFactory.height,
				itemGroup:
					{
						left: itemGroupLeft,
						width: itemGroupFactory.width,
					},
				width:
					calculateWidth(),
			});

		function createGroupsWithTop(
			top
		) {
			return (
				[
					createDependentsGroup(dependentsGroupFactory),
					createIdentifierGroup(),
					createDependentsGroup(dependsUponGroupFactory),
				]
			);

			function createDependentsGroup(
				groupFactory
			) {
				return (
					groupFactory
					&&
					groupFactory.createWithTop(top + topOffset)
				);
			}

			function createIdentifierGroup() {
				return (
					itemGroupFactory.create({
						left: itemGroupLeft,
						top,
					})
				);
			}
		}

		function calculateWidth() {
			return (
				(dependentsGroupFactory && dependentsGroupFactory.width)
				+
				itemGroupFactory.width
				+
				(dependsUponGroupFactory && dependsUponGroupFactory.width));
		}
	}
}

function createGroupFactoryWithLeftWhenRequired({
	arrow,
	count,
	createGroupFactoryWhenRequired,
	left,
}) {
	const factory =
		createGroupFactoryWhenRequired({
			arrow,
			count,
		});

	return (
		factory
		&&
		{
			createWithTop: top => factory.create({ left, top }),
			width: factory.width,
		});
}

function createGroupsFactoryWithoutDependencies({
	itemGroupFactory,
	left,
}) {
	return (
		{
			createWithTop:
				top => [ itemGroupFactory.create({ left, top }) ],
			height:
				itemGroupFactory.height,
			itemGroup:
				{
					left,
					width: itemGroupFactory.width,
				},
			width:
				itemGroupFactory.width,
		});
}