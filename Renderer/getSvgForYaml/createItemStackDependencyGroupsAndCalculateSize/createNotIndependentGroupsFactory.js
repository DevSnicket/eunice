module.exports =
	({
		createCountGroupFactoryWhenRequired,
		dependencies,
		identifierGroupFactory,
		left,
		withPrecision,
	}) => {
		return (
			dependencies
			?
			createGroupsFactoryWithDependencies({
				createCountGroupFactoryWhenRequired,
				dependencies,
				identifierGroupFactory,
				left,
				topOffset: calculateTopOffset(),
				withPrecision,
			})
			:
			createGroupsFactoryWithoutDependencies({
				identifierGroupFactory,
				left,
			}));

		function calculateTopOffset() {
			return (
				withPrecision(
					(identifierGroupFactory.height - dependencies.arrow.height)
					/
					2
				));
		}
	};

function createGroupsFactoryWithDependencies({
	createCountGroupFactoryWhenRequired,
	dependencies,
	identifierGroupFactory,
	left,
	topOffset,
	withPrecision,
}) {
	const
		dependentsGroupFactory =
			createGroupFactoryWithLeftWhenRequired({
				arrow: dependencies.arrow,
				count: dependencies.dependents,
				createCountGroupFactoryWhenRequired,
				left,
			}),
		identifierGroupLeft =
			withPrecision(
				left
				+
				(dependentsGroupFactory && dependentsGroupFactory.width)
			);

	return (
		createGroupsFactoryFromDependsUponGroupFactory(
			createDependsUponGroupFactory()
		));

	function createDependsUponGroupFactory() {
		return (
			createGroupFactoryWithLeftWhenRequired({
				arrow: dependencies.arrow,
				count: dependencies.dependsUpon,
				createCountGroupFactoryWhenRequired,
				left: withPrecision(identifierGroupLeft + identifierGroupFactory.width),
			}));
	}

	function createGroupsFactoryFromDependsUponGroupFactory(
		dependsUponGroupFactory
	) {
		return (
			{
				createWithTop:
					createGroupsWithTop,
				height:
					identifierGroupFactory.height,
				identifierGroup:
					{
						left: identifierGroupLeft,
						width: identifierGroupFactory.width,
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
				]);

			function createDependentsGroup(
				groupFactory
			) {
				return (
					groupFactory
					&&
					groupFactory.createWithTop(top + topOffset));
			}

			function createIdentifierGroup() {
				return (
					identifierGroupFactory.create({
						left: identifierGroupLeft,
						top,
					}));
			}
		}

		function calculateWidth() {
			return (
				(dependentsGroupFactory && dependentsGroupFactory.width)
				+
				identifierGroupFactory.width
				+
				(dependsUponGroupFactory && dependsUponGroupFactory.width));
		}
	}
}

function createGroupFactoryWithLeftWhenRequired({
	arrow,
	count,
	createCountGroupFactoryWhenRequired,
	left,
}) {
	const factory =
		createCountGroupFactoryWhenRequired({
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
	identifierGroupFactory,
	left,
}) {
	return (
		{
			createWithTop:
				top => [ identifierGroupFactory.create({ left, top }) ],
			height:
				identifierGroupFactory.height,
			identifierGroup:
				{
					left,
					width: identifierGroupFactory.width,
				},
			width:
				identifierGroupFactory.width,
		});
}