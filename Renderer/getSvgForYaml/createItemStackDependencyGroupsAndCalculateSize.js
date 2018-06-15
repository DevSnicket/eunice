const
	createNotIndependentGroupsFactory = require("./createItemStackDependencyGroupsAndCalculateSize/createNotIndependentGroupsFactory"),
	createStackDependencyGroupsAndSize = require("./createItemStackDependencyGroupsAndCalculateSize/createStackDependencyGroupsAndSize");

module.exports =
	({
		createDependencyCountGroupFactoryWhenRequired: createCountGroupFactoryWhenRequired,
		identifierGroupFactory,
		left,
		stackDependencies,
		top,
		withPrecision,
	}) =>
		createStackDependencyGroupsAndSize({
			createCountGroupFactoryWhenRequired,
			dependencies:
				stackDependencies,
			notIndependentGroupsFactory:
				createNotIndependentGroupsFactory({
					createCountGroupFactoryWhenRequired,
					dependencies:
						stackDependencies && stackDependencies.same,
					identifierGroupFactory,
					left,
					withPrecision,
				}),
			top,
			withPrecision,
		});