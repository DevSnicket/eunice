// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import sumDependencyCountOfStack from "./sumDependencyCountOfStack";

export default ({
	createInnerDependencyGroupFactory,
	stack,
	stackGroupFactory,
}) =>
	createWhenHasDependencies({
		innerDependencyGroupFactory:
			createInnerDependencyGroupFactory({
				count:
					sumDependencyCountOfStack(
						stack,
					),
				keyPrefix:
					"summary",
			}),
		stackGroupFactory,
	})
	||
	stackGroupFactory;

function createWhenHasDependencies({
	innerDependencyGroupFactory,
	stackGroupFactory,
}) {
	return (
		innerDependencyGroupFactory
		&&
		create()
	);

	function create() {
		const topOffset = stackGroupFactory.height + 28;

		return (
			{
				createAtPosition,
				height:
					topOffset + innerDependencyGroupFactory.height,
				summaryTopOffset:
					topOffset,
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
					...innerDependencyGroupFactory.createAtPosition({
						left:
							left + (stackGroupFactory.width / 2),
						top:
							top + topOffset,
					}),
				]
			);
		}
	}
}