const
	createNotIndependentGroupsFactory = require("./createItemDependencyGroupsAndCalculateSize/createNotIndependentGroupsFactory"),
	createStackDependencyGroupsAndSize = require("./createItemDependencyGroupsAndCalculateSize/createStackDependencyGroupsAndSize");

module.exports =
	({
		createGroupFactoryWhenRequired: createGroupFactoryWhenRequired,
		dependencyCount,
		itemGroupFactory,
		left,
		top,
		withPrecision,
	}) =>
		createStackDependencyGroupsAndSize({
			createGroupFactoryWhenRequired,
			dependencies:
				dependencyCount,
			notIndependentGroupsFactory:
				createNotIndependentGroupsFactory({
					createGroupFactoryWhenRequired,
					dependencies:
					dependencyCount && dependencyCount.same,
					itemGroupFactory,
					left,
					withPrecision,
				}),
			top,
			withPrecision,
		});