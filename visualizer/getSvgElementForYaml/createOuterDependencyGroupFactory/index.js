const
	createLayerGroupFactory = require("./createLayerGroupFactory"),
	createStackGroupFactory = require("./createStackGroupFactory");

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