// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createLevelGroupFactory from "./createLevelGroupFactory";
import createStackGroupFactory from "./createStackGroupFactory";

export default ({
	arrows,
	createTextGroup,
	elementContainerFactory,
	font,
	item,
	itemGroupFactory,
}) => {
	return (
		whenHasDependencyCountOfOuter()
		||
		itemGroupFactory
	);

	function whenHasDependencyCountOfOuter() {
		return (
			item.dependencyCount
			&&
			item.dependencyCount.outer
			&&
			createStackGroupFactory({
				arrows,
				createGroupFactoryWhenRequired,
				dependencyCountOuter:
					item.dependencyCount.outer,
				itemGroupWidth:
					itemGroupFactory.width,
				levelGroupFactory:
					createLevelGroupFactory({
						arrow:
							arrows.right,
						createGroupFactoryWhenRequired,
						dependencyCountOuterSame:
							item.dependencyCount.outer
							&&
							item.dependencyCount.outer.same,
						itemGroupFactory,
					}),
			})
		);
	}

	function createGroupFactoryWhenRequired({
		arrow,
		count,
		keys,
	}) {
		return (
			createDependencyGroupFactoryWhenRequired({
				arrow,
				count,
				createTextGroup:
					getCreateTextGroupWhenInContainer()
					||
					createTextGroup,
				font,
				key:
					`${item.id} dependency count outer ${keys.relationship} ${keys.structure}`,
			})
		);

		function getCreateTextGroupWhenInContainer() {
			return (
				elementContainerFactory
				&&
				elementContainerFactory.createForDependencyCount
				&&
				createInContainer
			);

			function createInContainer(
				parameters,
			) {
				return (
					elementContainerFactory.createForDependencyCount({
						element: createTextGroup(parameters),
						item,
						level: keys.level,
						relationship: keys.relationship,
					})
				);
			}
		}
	}
};