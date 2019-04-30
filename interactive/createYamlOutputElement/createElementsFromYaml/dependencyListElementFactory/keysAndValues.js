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
		Object.keys(keys)
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