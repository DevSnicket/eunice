// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createLevelGroupFactory = require("./createLevelGroupFactory"),
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
			levelGroupFactory:
				createLevelGroupFactory({
					aggregateGroupFactoriesHorizontally:
						aggregateGroupFactoriesWithOrientation.horizontal,
					createGroupFactoryWhenRequired,
					dependencies:
						dependencyCount && dependencyCount.same,
					itemGroupFactory,
				}),
		});