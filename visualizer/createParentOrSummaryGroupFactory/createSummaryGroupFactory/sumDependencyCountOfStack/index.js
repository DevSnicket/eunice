// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getDependsUponOfParent from "./getDependsUponOfParent";
import { sumDirections } from "@devsnicket/eunice-dependency-counter";

export default
stack =>
	getCountWhenHasMultiple(
		stack
		.flat(2)
		.reduce(
			(
				{ count, hasMultiple },
				item,
			) => {
				const itemCount =
					sumCountOfItem(item);

				return (
					{
						count:
							sumDirections(
								count,
								itemCount,
							),
						hasMultiple:
							hasMultiple
							||
							(count && itemCount),
					}
				);
			},
			{},
		),
	);

function sumCountOfItem(
	{ dependencyCount },
) {
	return (
		dependencyCount
		&&
		sumDescendantsAndParentDependsUpon(dependencyCount)
	);
}

function sumDescendantsAndParentDependsUpon({
	descendants,
	parent,
}) {
	return (
		sumDirections(
			descendants,
			parent && getDependsUponOfParent(parent),
		)
	);
}

function getCountWhenHasMultiple({
	count,
	hasMultiple,
}) {
	return (
		hasMultiple
		&&
		count
	);
}