// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	{
		clearFromKeysAndValues,
		getKeysAndValuesFromObject,
		getObjectFromGetValueOfKey,
	};

function clearFromKeysAndValues(
	keysAndValues,
) {
	return (
		[
			...keysAndValues,
			...getKeysAndNoValues(),
		]
	);
}

function getKeysAndNoValues() {
	return (
		Object.values(keys)
		.map(key => ({ key }))
	);
}

function getObjectFromGetValueOfKey(
	getValueOfKey,
) {
	return (
		{
			identifier: getValueOfKey(keys.item),
			level: getValueOfKey(keys.level),
			relationship: getValueOfKey(keys.relationship),
		}
	);
}

function getKeysAndValuesFromObject({
	identifier,
	level,
	relationship,
}) {
	return (
		[
			{
				key: keys.item,
				value: identifier,
			},
			{
				key: keys.level,
				value: level,
			},
			{
				key: keys.relationship,
				value: relationship,
			},
		]
	);
}

const keys =
	{
		item: "dependency-list-item",
		level: "dependency-list-level",
		relationship: "dependency-list-relationship",
	};