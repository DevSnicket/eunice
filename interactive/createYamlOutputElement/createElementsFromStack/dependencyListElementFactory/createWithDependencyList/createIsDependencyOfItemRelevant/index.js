// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createIsStackRelevantFromAreAncestorsIncluded from "./createIsStackRelevantFromAreAncestorsIncluded";

export default ({
	areAncestorsIncluded,
	levelDirection,
}) =>
	createIsDependencyRelevant({
		isStackRelevant:
			createIsStackRelevantFromAreAncestorsIncluded(
				areAncestorsIncluded,
			),
		levelDirection,
	});

function createIsDependencyRelevant({
	isStackRelevant,
	levelDirection,
}) {
	return isDependencyOfItemRelevant;

	function isDependencyOfItemRelevant({
		dependency,
		item,
	}) {
		return (
			item !== dependency.item
			&&
			dependency.direction === levelDirection
			&&
			isStackRelevant({
				source:
					item.level.stack,
				target:
					dependency.mutualStack,
			})
		);
	}
}