// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import countDependenciesOfItem from "@devsnicket/eunice-dependency-counter";

export default
stack => {
	if (stack.parent)
		inItem(stack.parent);

	for (const level of stack)
		for (const item of level)
			inItem(item);
};

function inItem(
	item,
) {
	if (!item.dependencyCount)
		item.dependencyCount = countDependenciesOfItem(item);
}