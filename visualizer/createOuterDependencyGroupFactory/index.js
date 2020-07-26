// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createLevelGroupFactory from "./createLevelGroupFactory";
import createStackGroupFactory from "./createStackGroupFactory";

export default ({
	arrows,
	createGroupFactoryWhenRequired,
	dependencyCount,
	itemGroupFactory,
}) => {
	return (
		whenHasDependencyCountOfOuter()
		||
		itemGroupFactory
	);

	function whenHasDependencyCountOfOuter() {
		return (
			dependencyCount
			&&
			dependencyCount.outer
			&&
			createStackGroupFactory({
				arrows,
				createGroupFactoryWhenRequired,
				dependencyCountOuter:
					dependencyCount.outer,
				itemGroupWidth:
					itemGroupFactory.width,
				levelGroupFactory:
					createLevelGroupFactory({
						arrow:
							arrows.right,
						createGroupFactoryWhenRequired,
						dependencyCountOuterSame:
							dependencyCount.outer
							&&
							dependencyCount.outer.same,
						itemGroupFactory,
					}),
			})
		);
	}
};