const createUrlSearchParamsFromLocationHash = require("./createUrlSearchParamsFromLocationHash");

module.exports =
	{
		getValue:
			({
				key,
				locationHash,
			}) =>
				createUrlSearchParamsFromLocationHash(
					locationHash,
				)
				.get(
					key,
				),
		getWithKeysAndValues:
			({
				keysAndValues,
				locationHash,
			}) =>
				getWithKeysAndValues({
					keysAndValues,
					urlSearchParams:
						createUrlSearchParamsFromLocationHash(
							locationHash,
						),
				}),
	};

function getWithKeysAndValues({
	keysAndValues,
	urlSearchParams,
}) {
	for (const { key, value } of keysAndValues)
		setWhenHasValueOrDelete({
			key,
			urlSearchParams,
			value,
		});

	return (
		addHashPrefix(
			urlSearchParams.toString(),
		)
	);
}

function setWhenHasValueOrDelete({
	key,
	urlSearchParams,
	value,
}) {
	if (value)
		urlSearchParams.set(
			key,
			value,
		);
	else
		urlSearchParams.delete(
			key,
		);
}

function addHashPrefix(
	value,
) {
	return (
		value
		&&
		`#${value}`
	);
}