// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createLevelGroupFactory from "./createLevelGroupFactory";
import createStackGroupFactory from "./createStackGroupFactory";

export default ({
	arrows,
	contentGroupFactory,
	outerCount,
	createTextGroup,
	elementContainerFactory,
	font,
	item,
}) => {
	return (
		whenHasDependencyCountOfOuter()
		||
		contentGroupFactory
	);

	function whenHasDependencyCountOfOuter() {
		return (
			outerCount
			&&
			createStackGroupFactory({
				arrows,
				createGroupFactoryWhenRequired,
				itemGroupWidth:
					contentGroupFactory.width,
				levelGroupFactory:
					createLevelGroupFactory({
						arrow:
						arrows.right,
						contentGroupFactory,
						createGroupFactoryWhenRequired,
						outerSameCount:
							outerCount
							&&
							outerCount.same,
					}),
				outerCount,
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
						element:
							createTextGroup(parameters),
						item,
						level:
							keys.level,
						relationship:
							keys.relationship,
					})
				);
			}
		}
	}
};