const createUrlSearchParamsFromLocationHash = require("./createUrlSearchParamsFromLocationHash");

module.exports =
	{
		getValue:
			({ key, locationHash }) =>
				createUrlSearchParamsFromLocationHash(
					locationHash,
				)
				.get(
					key,
				),
		getWithKeysAndValues:
			({ keysAndValues, locationHash }) =>
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
		urlSearchParams.set(
			key,
			value,
		);

	return (
		addHashPrefix(
			urlSearchParams.toString(),
		)
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