// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getIdentifierPropertyOrValue from "./getIdentifierPropertyOrValue";

export default ({
	ancestors,
	item,
}) =>
	whenHasAncestors({
		ancestors,
		item,
	})
	||
	getIdentifierPropertyOrValue(item);

function whenHasAncestors({
	ancestors,
	item,
}) {
	return (
		ancestors
		&&
		ancestors.reduce(
			(items, ancestor) => (
				{
					id: getIdentifierPropertyOrValue(ancestor),
					items,
				}
			),
			getIdentifierPropertyOrValue(item),
		)
	);
}