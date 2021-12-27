// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
items =>
	Object.assign(
		{},
		...items.map(getCustomPropertiesFromItem),
	);

function getCustomPropertiesFromItem({
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	id,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	dependsUpon,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	items,
	...restOfItem
}) {
	return restOfItem;
}