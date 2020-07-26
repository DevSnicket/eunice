// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default initializeParentReferencesInStack;

function initializeParentReferencesInStack(
	stack,
) {
	for (const level of stack) {
		for (const item of level) {
			item.level = level;

			if (item.items) {
				item.items.parent = item;

				initializeParentReferencesInStack(item.items);
			}
		}

		level.stack = stack;
	}
}