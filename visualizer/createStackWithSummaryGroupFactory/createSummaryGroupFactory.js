// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	arrows,
	createInlineDependencyGroups,
	dependencyCount,
	stackGroupFactory,
}) => {
	return (
		createWhenHasDependencies()
		||
		stackGroupFactory
	);

	function createWhenHasDependencies() {
		return (
			dependencyCount
			&&
			create()
		);
	}

	function create() {
		const topOffset = stackGroupFactory.height + 15;

		return (
			{
				createAtPosition,
				height:
					topOffset + arrows.right.height,
				width:
					stackGroupFactory.width,
			}
		);

		function createAtPosition({
			left,
			top,
		}) {
			return (
				[
					...stackGroupFactory.createAtPosition({
						left,
						top,
					}),
					...createInlineDependencyGroups({
						center: left + (stackGroupFactory.width / 2),
						count: dependencyCount,
						top: top + topOffset,
					}),
				]
			);
		}
	}
};