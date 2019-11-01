/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	({
		getValueForKey,
		keys,
	}) =>
		aggregateObjects(
			Object.entries(keys)
			.map(
				withGetValueForKey(
					getValueForKey,
				)
				.createObjectForPropertyAndKey,
			),
		);

function withGetValueForKey(
	getValueForKey,
) {
	return { createObjectForPropertyAndKey };

	function createObjectForPropertyAndKey([
		property,
		key,
	]) {
		return { [property]: getValueForKey(key) };
	}
}

function aggregateObjects(
	objects,
) {
	return (
		Object.assign(
			{},
			...objects,
		)
	);
}