const
	createLayerGroupFactory = require("./createOuterDependencyGroupFactory/createLayerGroupFactory"),
	createStackGroupFactory = require("./createOuterDependencyGroupFactory/createStackGroupFactory");

module.exports =
	({
		aggregateGroupFactoriesWithOrientation,
		createGroupFactoryWhenRequired,
		dependencyCount,
		itemGroupFactory,
	}) =>
		createStackGroupFactory({
			aggregateGroupFactoriesWithOrientation,
			createGroupFactoryWhenRequired,
			dependencies:
				dependencyCount,
			itemGroupWidth:
				itemGroupFactory.width,
			layerGroupFactory:
				createLayerGroupFactory({
					aggregateGroupFactoriesHorizontally:
						aggregateGroupFactoriesWithOrientation.horizontal,
					createGroupFactoryWhenRequired,
					dependencies:
						dependencyCount && dependencyCount.same,
					itemGroupFactory,
				}),
		});